import { useState } from "react";
import { API } from "@/lib/api";

export default function BusinessSignup(){
  const [f, setF] = useState({ company:"", owner:"", regNo:"", phone:"" });
  const [loading, setLoading] = useState(false);
  const onChange = e => setF({ ...f, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!f.company || !f.owner || !f.regNo) return alert("필수 항목을 입력하세요.");
    setLoading(true);
    try {
      await API.businessSignup(f);
      alert("기업가입 신청 완료");
    } catch (e) {
      alert("신청 실패: " + (e?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth">
      <div className="card auth-card">
        <h1 className="auth-title">기업 회원가입</h1>
        <form onSubmit={submit} className="form">
          <label className="field">
            <div className="field-label">상호명</div>
            <input className="input" name="company" placeholder="(주)펫스코프" value={f.company} onChange={onChange}/>
          </label>

          <label className="field">
            <div className="field-label">대표자명</div>
            <input className="input" name="owner" placeholder="홍길동" value={f.owner} onChange={onChange}/>
          </label>

          <label className="field">
            <div className="field-label">사업자등록번호</div>
            <input className="input" name="regNo" placeholder="000-00-00000" value={f.regNo} onChange={onChange}/>
            <div className="hint">숫자만 입력해도 됩니다.</div>
          </label>

          <label className="field">
            <div className="field-label">연락처</div>
            <input className="input" name="phone" placeholder="010-0000-0000" value={f.phone} onChange={onChange}/>
          </label>

          <div className="actions">
            <button className="btn primary" disabled={loading}>{loading ? "처리 중..." : "신청하기"}</button>
          </div>
        </form>
      </div>
    </main>
  );
}
