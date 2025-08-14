import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "@/constants/categories";

export default function CategoryGrid() {
  const nav = useNavigate();
  return (
    <div className="cat-grid container">
      {CATEGORIES.map((c) => (
        <button key={c.id} className="cat" onClick={() => nav(`/board/${c.id}`)}>
          <div className="cat-icon">{c.icon}</div>
          <div className="cat-label">{c.label}</div>
        </button>
      ))}
    </div>
  );
}
