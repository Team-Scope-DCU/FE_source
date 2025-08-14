import { useState } from "react";
import { API } from "@/lib/api";

export default function Signup(){
  const [f, setF] = useState({ email:"", password:"", nickname:"" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = e => setF({ ...f, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!f.email || !f.password || !f.nickname) return alert("모든 항목을 입력하세요.");
    setLoading(true);
    try {
      await API.signup(f);
      alert("회원가입 완료. 로그인해 주세요.");
      // TODO: redirect
    } catch (e) {
      alert("회원가입 실패: " + (e?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth">
      <div className="card auth-card">
        <h1 className="auth-title">회원가입</h1>
        <form onSubmit={submit} className="form">
          <label className="field">
            <div className="field-label">이메일</div>
            <input className="input" name="email" type="email" placeholder="you@example.com" value={f.email} onChange={onChange}/>
          </label>

          <label className="field">
            <div className="field-label">닉네임</div>
            <input className="input" name="nickname" placeholder="별명" value={f.nickname} onChange={onChange}/>
          </label>

          <label className="field">
            <div className="field-label">비밀번호</div>
            <div className="input-with-btn">
              <input className="input" name="password" type={show ? "text" : "password"} placeholder="8자 이상" value={f.password} onChange={onChange}/>
              <button type="button" className="btn ghost small" onClick={() => setShow(s=>!s)}>{show ? "숨기기" : "보기"}</button>
            </div>
            <div className="hint">영문/숫자 조합 8자 이상 권장</div>
          </label>

          <div className="actions">
            <button className="btn primary" disabled={loading}>{loading ? "처리 중..." : "가입하기"}</button>
          </div>
        </form>
      </div>
    </main>
  );
}
