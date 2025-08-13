const cats = [
  { id: "all", label: "전체보기", icon: "📋" },
  { id: "dog", label: "강아지", icon: "🐶" },
  { id: "cat", label: "고양이", icon: "🐱" },
  { id: "health", label: "건강/질병", icon: "🩺" },
  { id: "training", label: "훈련/행동교정", icon: "🎯" },
  { id: "adopt", label: "분양/입양", icon: "🏠" },
  { id: "products", label: "용품/사료", icon: "🛒" },
  { id: "lost", label: "실종/보호", icon: "🔍" },
  { id: "grooming", label: "미용/관리", icon: "✂️" },
  { id: "etc", label: "기타", icon: "💬" },
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
