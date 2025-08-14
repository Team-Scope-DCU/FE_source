// Centralized category list for pet SCOPE
// NOTE: legacy 'etc' is normalized to 'free' (자유게시판)
export const CATEGORIES = [
  { id: "dog",      label: "강아지",       icon: "🐶" },
  { id: "cat",      label: "고양이",       icon: "🐱" },
  { id: "health",   label: "건강/질병",    icon: "🩺" },
  { id: "training", label: "훈련/행동교정", icon: "🎯" },
  { id: "adopt",    label: "분양/입양",    icon: "🏠" },
  { id: "products", label: "용품/사료",    icon: "🛒" },
  { id: "lost",     label: "실종/보호",    icon: "🔍" },
  { id: "grooming", label: "미용/관리",    icon: "✂️" },
  { id: "tips",     label: "꿀팁/정보",    icon: "💡" },
  { id: "free",     label: "자유게시판",   icon: "💬" },
];

export const normalizeCatId = (id) => (id === "etc" ? "free" : id);
export const categoryById = (id) => CATEGORIES.find(c => c.id === normalizeCatId(id)) || null;
