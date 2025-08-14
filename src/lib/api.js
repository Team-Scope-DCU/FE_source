// Simple API helper. Configure Vite proxy to route /api to your backend during dev.
const BASE_URL = "";

async function req(path, options = {}) {
  const res = await fetch(BASE_URL + path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Request failed");
  }
  const ct = res.headers.get("content-type") || "";
  if (res.status === 204) return null;
  return ct.includes("application/json") ? res.json() : res.text();
}

export const API = {
  // Boards
  listPosts: (cat, params = {}) => {
    const q = new URLSearchParams(params).toString();
    return req(`/api/boards/${cat}${q ? "?" + q : ""}`);
  },
  getPost: (id) => req(`/api/posts/${id}`),
  createPost: (cat, body) => req(`/api/boards/${cat}`, { method: "POST", body: JSON.stringify(body) }),

  // Auth
  signup: (body) => req(`/api/auth/signup`, { method: "POST", body: JSON.stringify(body) }),
  login:  (body) => req(`/api/auth/login`,  { method: "POST", body: JSON.stringify(body) }),
  logout: () => req(`/api/auth/logout`, { method: "POST" }),

  // Business
  businessSignup: (body) => req(`/api/business/signup`, { method: "POST", body: JSON.stringify(body) }),
};
