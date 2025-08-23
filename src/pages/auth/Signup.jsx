// src/pages/auth/Signup.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "@/lib/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Signup() {
  const nav = useNavigate();

  const [f, setF] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    nickname: "",
  });
  const [loading, setLoading] = useState(false);

  // 아이디 중복 상태: idle | checking | available | taken | error
  const [uStatus, setUStatus] = useState("idle");

  // 파생 유효성
  const emailValid = f.email === "" ? null : EMAIL_RE.test(f.email);
  const pwMatch   = f.password2 === "" ? null : f.password === f.password2;
  const pwLenOK   = f.password === "" ? null : f.password.length >= 8;

  // 모든 필수 값 채움 여부 + 즉시 유효성
  const filled =
    !!f.username && !!f.email && !!f.password && !!f.password2 && !!f.nickname;
  const formValid =
    filled &&
    emailValid === true &&
    pwLenOK === true &&
    pwMatch === true;

  useEffect(() => {
    // 약관 동의 없으면 /terms 로 유도
    if (localStorage.getItem("agreedTerms") !== "yes") {
      nav("/terms", { replace: true });
    }
  }, [nav]);

  const onChange = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const checkUsername = async () => {
    if (!f.username) return alert("아이디를 입력하세요.");
    setUStatus("checking");
    try {
      // 백엔드 연결 시: API.checkUsername(username) => { available: boolean } 형태 기대
      if (API?.checkUsername) {
        const res = await API.checkUsername(f.username);
        setUStatus(res?.available ? "available" : "taken");
      } else {
        // TODO: 백엔드 연동 전 임시 동작(예시: 4글자 이상이면 사용 가능)
        setTimeout(() => {
          setUStatus(f.username.length >= 4 ? "available" : "taken");
        }, 400);
      }
    } catch {
      setUStatus("error");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!filled) return alert("모든 항목을 입력하세요.");
    if (!EMAIL_RE.test(f.email)) return alert("이메일 형식이 아닙니다.");
    if (f.password.length < 8) return alert("비밀번호는 8자 이상이어야 합니다.");
    if (f.password !== f.password2) return alert("비밀번호가 일치하지 않습니다.");

    setLoading(true);
    try {
      await API.signup({
        username: f.username,
        email: f.email,
        password: f.password,
        nickname: f.nickname,
      });
      alert("회원가입 성공");
      localStorage.removeItem("agreedTerms"); // 사용 후 약관 플래그 정리(선택)
      nav("/login");
    } catch (err) {
      alert("회원가입 실패: " + (err?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth">
      <div className="card auth-card">
        <h1 className="auth-title">회원가입</h1>

        <form onSubmit={submit} className="form" noValidate>
          {/* 아이디 + 중복확인 */}
          <label className="field">
            <div className="field-label">아이디</div>
            <div className="field-row">
              <input
                className="input"
                name="username"
                placeholder="아이디를 입력하세요"
                value={f.username}
                onChange={(e) => {
                  onChange(e);
                  setUStatus("idle"); // 변경 시 상태 초기화
                }}
                autoComplete="username"
              />
              <button
                type="button"
                className="btn"
                onClick={checkUsername}
                disabled={uStatus === "checking"}
              >
                {uStatus === "checking" ? "확인 중…" : "중복 확인"}
              </button>
            </div>
            <div
              className={
                "input-hint " +
                (uStatus === "available"
                  ? "valid"
                  : uStatus === "taken" || uStatus === "error"
                  ? "invalid"
                  : "")
              }
              aria-live="polite"
            >
              {
                {
                  idle: "확인 전",
                  checking: "확인 중…",
                  available: "사용 가능",
                  taken: "이미 사용 중",
                  error: "오류",
                }[uStatus]
              }
            </div>
          </label>

          {/* 이메일 + 즉시 형식 검증 */}
          <label className="field">
            <div className="field-label">이메일</div>
            <input
              className="input"
              name="email"
              placeholder="example@domain.com"
              value={f.email}
              onChange={onChange}
              autoComplete="email"
              inputMode="email"
            />
            <div
              className={
                "input-hint " +
                (emailValid == null ? "" : emailValid ? "valid" : "invalid")
              }
              aria-live="polite"
            >
              {emailValid == null ? " " : emailValid ? " " : "정확히 입력해주세요"}
            </div>
          </label>

          {/* 비밀번호 + 길이 힌트(8자 이상) */}
          <label className="field">
            <div className="field-label">비밀번호</div>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="비밀번호"
              value={f.password}
              onChange={onChange}
              autoComplete="new-password"
            />
            <div
              className={
                "input-hint " + (pwLenOK == null ? "" : pwLenOK ? "valid" : "invalid")
              }
              aria-live="polite"
            >
              {pwLenOK == null ? " " : pwLenOK ? "8자 이상 조건 충족" : "8자 이상 필요"}
            </div>
          </label>

          {/* 비밀번호 확인 + 일치 힌트 */}
          <label className="field">
            <div className="field-label">비밀번호 확인</div>
            <input
              className="input"
              type="password"
              name="password2"
              placeholder="비밀번호 다시 입력"
              value={f.password2}
              onChange={onChange}
              autoComplete="new-password"
            />
            <div
              className={
                "input-hint " + (pwMatch == null ? "" : pwMatch ? "valid" : "invalid")
              }
              aria-live="polite"
            >
              {pwMatch == null ? " " : pwMatch ? "일치합니다" : "불일치합니다"}
            </div>
          </label>

          {/* 닉네임 */}
          <label className="field">
            <div className="field-label">닉네임</div>
            <input
              className="input"
              name="nickname"
              placeholder="닉네임"
              value={f.nickname}
              onChange={onChange}
              autoComplete="nickname"
            />
          </label>

          <div className="actions">
            <button className="btn primary" disabled={loading || !formValid}>
              {loading ? "처리 중..." : "회원가입"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
