import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid"; // 필요 없으면 이 라인과 JSX에서 제거

// API 없을 때 보여줄 기본 목록
const FALLBACK_BEST = [
  { id: 1, title: "저희 강아지 귀여워요", href: "#" },
  { id: 2, title: "저희집 고양이 봐주세요", href: "#" },
  { id: 3, title: "일주일째 설사가 계속됩니다", href: "#" },
  { id: 4, title: "고구마 금지령", href: "#" },
  { id: 5, title: "나 합숙탈래", href: "#" },
];

export default function Home() {
  const [best, setBest] = useState(FALLBACK_BEST);

  // 나중에 실제 API가 생기면 여기 주소만 바꿔서 연동
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/community/best?limit=5");
        if (res.ok) {
          const data = await res.json();
          // data는 [{id, title, href}] 형태로 가정
          if (Array.isArray(data) && data.length) setBest(data.slice(0, 5));
        }
      } catch {
        // 실패하면 FALLBACK 유지
      }
    })();
  }, []);

  return (
    <main className="home">
      {/* 컨셉 이미지 넣을 거면 hero에 배경 추가하거나 아래 <img> 주석 해제 */}
      <section className="hero container">
        <h1 className="title">오늘의 반려 생활, 같이 봐요</h1>
        <SearchBar />
        {/* <img src="/your-visual.png" alt="컨셉 이미지" style={{marginTop:16, maxWidth:720, width:"100%", borderRadius:12}} /> */}
      </section>

      {/* 카테고리 그리드를 계속 쓸 거면 두고, 안 쓸 거면 통째로 제거 */}
      <CategoryGrid />

      {/* 자유게시판 베스트글 5 */}
      <section className="container" style={{ marginTop: 32, marginBottom: 24 }}>
        <p className="muted">인기 게시물을 확인해보세요</p>
        <h3 style={{ marginTop: 6, marginBottom: 10, fontSize: 20, fontWeight: 800 }}>
          반려인들이 주목하는 글 TOP 5
        </h3>

        <ol style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          overflow: "hidden",
          background: "#fff"
        }}>
          {best.map((post, i) => (
            <li key={post.id} style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              borderTop: i === 0 ? "none" : "1px solid #f1f5f9"
            }}>
              <span style={{ width: 20, textAlign: "right", color: "#6366f1", fontWeight: 700 }}>
                {i + 1}
              </span>
              <a href={post.href} style={{ flex: 1, color: "#111827" }}>
                {post.title}
              </a>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
