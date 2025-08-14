import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";
import { categoryById, normalizeCatId } from "@/constants/categories";

export default function PostDetail() {
  const { cat: rawCat, id } = useParams();
  const cat = normalizeCatId(rawCat);
  const info = categoryById(cat);
  const [post, setPost]   = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    API.getPost(id)
      .then((data) => { if (alive) setPost(data); })
      .catch((e)  => { if (alive) setError(e.message || "불러오기 실패"); })
      .finally(()   => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [id]);

  if (!info) return <div className="container page">잘못된 카테고리</div>;
  if (loading) return <div className="container page">불러오는 중...</div>;
  if (error || !post) return <div className="container page">글을 찾을 수 없어요.</div>;

  return (
    <main className="container page">
      <div className="muted">
        <Link to="/board" className="link">게시판</Link> · <Link to={`/board/${cat}`} className="link">{info.label}</Link>
      </div>
      <h2 style={{marginTop:6}}>{post.title}</h2>
      <div className="muted" style={{marginBottom:16}}>{post.author || "익명"} · {(post.createdAt || "").slice(0,10)}</div>
      <div style={{whiteSpace:"pre-wrap"}}>{post.content}</div>
    </main>
  );
}
