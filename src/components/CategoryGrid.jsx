const cats = [
  { id: "all", label: "전체보기", icon: "⬛" },
  { id: "move", label: "이사/청소", icon: "🚚" },
  { id: "install", label: "설치/수리", icon: "🛠️" },
  { id: "interior", label: "인테리어", icon: "🛋️" },
  { id: "outside", label: "외주", icon: "💼" },
  { id: "event", label: "이벤트/뷰티", icon: "🎉" },
  { id: "job", label: "취업/직무", icon: "🎓" },
  { id: "tutor", label: "과외", icon: "📘" },
  { id: "hobby", label: "취미/자기개발", icon: "🏀" },
  { id: "car", label: "자동차", icon: "🚗" },
  { id: "finance", label: "법률/금융", icon: "📦" },
  { id: "etc", label: "기타", icon: "👕" },
];

export default function CategoryGrid() {
  return (
    <div className="cat-grid container">
      {cats.map(c => (
        <button key={c.id} className="cat">
          <div className="cat-icon">{c.icon}</div>
          <div className="cat-label">{c.label}</div>
        </button>
      ))}
    </div>
  );
}
