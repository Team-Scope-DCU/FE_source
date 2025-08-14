import { useState } from "react";
import { API } from "@/lib/api";

export default function Login(){
  const [f, setF] = useState({ email:"", password:"" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = e => setF({ ...f, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.login(f);
      // TODO: redirect
      alert("로그인 성공");
    } catch (e) {
      alert("로그인 실패: " + (e?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth">
      <div className="card auth-card">
        <h1 className="auth-title">로그인</h1>
        <form onSubmit={submit} className="form">
          <label className="field">
            <div className="field-label">이메일</div>
            <input className="input" name="email" type="email" placeholder="you@example.com" value={f.email} onChange={onChange}/>
          </label>

          <label className="field">
            <div className="field-label">비밀번호</div>
            <div className="input-with-btn">
              <input className="input" name="password" type={show ? "text" : "password"} placeholder="비밀번호" value={f.password} onChange={onChange}/>
              <button type="button" className="btn ghost small" onClick={() => setShow(s=>!s)}>{show ? "숨기기" : "보기"}</button>
            </div>
          </label>

          <div className="actions">
            <button className="btn primary" disabled={loading}>{loading ? "로그인 중..." : "로그인"}</button>
          </div>
        </form>
      </div>
    </main>
  );
}
