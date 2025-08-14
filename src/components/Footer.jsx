export default function Footer() {
  return (
    <footer className="footer">
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 20px",
          fontSize: 14,
        }}
      >
        <small>© 2025 pet SCOPE</small>
        <small className="muted">
          (예시) (주)펫스코프 | 대표: 홍길동 | 사업자등록번호: 000-00-00000 | 서울특별시 어디구 어디로 123
        </small>
      </div>
    </footer>
  );
}
