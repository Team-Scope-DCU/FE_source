import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { categoryById, normalizeCatId } from "@/constants/categories";
import { API } from "@/lib/api";

export default function BoardList() {
  const { cat: rawCat } = useParams();
  const cat = normalizeCatId(rawCat);
  const info = categoryById(cat);
  const nav = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("latest"); // latest | views
  const [q, setQ] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    API.listPosts(cat, { sort, q, page: 1, size: 20 })
      .then(data => { if (alive) setRows(Array.isArray(data) ? data : []); })
      .catch(e => { if (alive) setError(e.message || "불러오기 실패"); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [cat, sort, q]);

  if (!info) {
    return (
      <main className="container page">
        <h3>없는 카테고리예요.</h3>
        <button className="btn" onClick={() => nav("/board")}>카테고리로 돌아가기</button>
      </main>
    );
  }

  return (
    <main className="container page">
      {/* 헤더 */}
      <header className="board-head">
        <div className="bread">
          <Link to="/board" className="link">게시판</Link> · <span>{info.label}</span>
        </div>
        <h1 className="board-title">{info.icon} {info.label}</h1>
      </header>

      {/* 툴바: 검색 + 정렬 + 글쓰기 */}
      <div className="toolbar">
        <div className="searchbar">
          <input
            className="input"
            placeholder="제목으로 검색"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>

        <div className="seg">
          <button className={`seg-btn ${sort === "latest" ? "on" : ""}`} onClick={() => setSort("latest")}>최신순</button>
          <button className={`seg-btn ${sort === "views" ? "on" : ""}`} onClick={() => setSort("views")}>조회순</button>
        </div>

        <div className="actions">
          <button className="btn primary" onClick={() => nav(`/board/${cat}/write`)}>글 작성</button>
        </div>
      </div>

      {/* 목록 */}
      {loading && <div className="muted" style={{marginTop:12}}>불러오는 중...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        rows.length ? (
          <ul className="post-list">
            {rows.map(p => (
              <li key={p.id} className="post-row">
                <Link to={`/board/${cat}/${p.id}`} className="post-title">{p.title}</Link>
                <div className="post-meta">
                  <span>{p.author || "익명"}</span>
                  <span>{(p.createdAt || "").slice(0,10)}</span>
                  <span>조회 {p.views ?? 0}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">아직 글이 없어요.</div>
        )
      )}
    </main>
  );
}
