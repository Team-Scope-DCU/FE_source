// src/pages/auth/Terms.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleTerms = `
[이용약관(예시)]

1. 목적
본 약관은 회원이 서비스를 이용함에 있어 회사와 회원 간의 권리·의무 및 책임사항을 규정합니다.

2. 계정 및 보안
회원은 가입 시 정확한 정보를 제공해야 하며, 계정 관리 책임은 회원에게 있습니다. 무단 사용이 확인되면 즉시 회사에 알려야 합니다.

3. 서비스 이용 및 제한
회원은 관련 법령과 본 약관을 준수해야 하며, 타인의 권리를 침해하거나 서비스 운영을 방해하는 행위를 해서는 안 됩니다.

4. 콘텐츠
회사가 제공하는 모든 콘텐츠와 자료의 권리는 회사 또는 정당한 권리자에게 있습니다. 무단 복제·배포를 금합니다.

5. 개인정보
회사는 관련 법령 및 개인정보처리방침에 따라 회원 정보를 처리합니다. 자세한 내용은 개인정보처리방침을 확인하세요.

6. 책임의 제한
회사는 천재지변, 불가항력 또는 회원의 귀책 사유로 인한 손해에 대해 책임을 지지 않습니다.

7. 변경 및 해지
회사는 서비스 또는 약관을 변경할 수 있으며, 변경 사항은 공지 후 적용됩니다. 회원은 언제든지 탈퇴할 수 있습니다.

8. 준거법 및 분쟁 해결
본 약관은 대한민국 법령에 따르며, 분쟁은 관할 법원에 제기합니다.

(본 문구는 예시이며 실제 서비스에 맞게 검토·수정하여 사용하시기 바랍니다.)
`;

export default function Terms() {
  const [agree, setAgree] = useState(false);
  const nav = useNavigate();

  const proceed = () => {
    localStorage.setItem("agreedTerms", "yes");
    nav("/signup");
  };

  return (
    <main className="auth auth--terms">
      <div className="card auth-card auth-card--wide">
        <h1 className="auth-title">이용약관</h1>

        <div className="terms-box">
          <pre className="terms-text">{sampleTerms}</pre>
        </div>

        <label className="checkbox terms-check">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>약관에 동의합니다.</span>
        </label>

        {/* 버튼을 체크박스와 조금 띄우기 위해 .actions--spaced 사용 */}
        <div className="actions actions--spaced">
          <button className="btn primary" disabled={!agree} onClick={proceed}>
            동의하고 회원가입
          </button>
        </div>
      </div>
    </main>
  );
}
