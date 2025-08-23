// src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "@/lib/api";

export default function Login() {
  const nav = useNavigate();
  const [f, setF] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!f.username || !f.password) return alert("아이디와 비밀번호를 입력하세요.");

    setLoading(true);
    try {
      // 서버가 username 기반 로그인을 받도록 백엔드에서 처리해 주세요.
      await API.login({ username: f.username, password: f.password });
      alert("로그인 성공");
      nav("/");
    } catch (err) {
      alert("로그인 실패: " + (err?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth">
      <div className="card auth-card">
        <h1 className="auth-title">로그인</h1>
        <form onSubmit={submit} className="form" noValidate>
          {/* 아이디 */}
          <label className="field">
            <div className="field-label">아이디</div>
            <input
              className="input"
              name="username"
              placeholder="아이디를 입력하세요"
              value={f.username}
              onChange={onChange}
              autoComplete="username"
            />
          </label>

          {/* 비밀번호 */}
          <label className="field">
            <div className="field-label">비밀번호</div>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="비밀번호"
              value={f.password}
              onChange={onChange}
              autoComplete="current-password"
            />
          </label>

          <div className="actions">
            <button className="btn primary" disabled={loading}>
              {loading ? "처리 중..." : "로그인"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
