import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "@/constants/categories";

export default function BoardHome() {
  const nav = useNavigate();
  return (
    <main className="container page">
      <h2>게시판</h2>
      <p className="muted">카테고리를 선택해 글을 둘러보세요.</p>
      <div className="cat-grid" style={{ marginTop: 12 }}>
        {CATEGORIES.map((c) => (
          <button key={c.id} className="cat" onClick={() => nav(`/board/${c.id}`)}>
            <div className="cat-icon">{c.icon}</div>
            <div className="cat-label">{c.label}</div>
          </button>
        ))}
      </div>
    </main>
  );
}
