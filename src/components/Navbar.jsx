import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const link = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container">
        <div className="nav-brand-row">
          <Link to="/" className="brand" style={{ color: "var(--brand)" }}>
            pet SCOPE
          </Link>

          {/* ⬅️ 브랜드 옆 왼쪽 메뉴 */}
          <nav className="nav-left">
            <NavLink to="/board/dog" className={link}>강아지</NavLink>
            <NavLink to="/board/cat" className={link}>고양이</NavLink>
            <NavLink to="/board/free" className={link}>자유게시판</NavLink>
          </nav>

          <div className="spacer" />

          {/* ➡️ 우측 액션(중복 없음, 버튼 스타일) */}
          <div className="nav-actions">
            <NavLink to="/signup" className="btn outline">회원가입</NavLink>
            <NavLink to="/login" className="btn ghost">로그인</NavLink>
            <NavLink to="/business-signup" className="btn primary">기업가입</NavLink>
          </div>

          <button className="burger" onClick={() => setOpen(v => !v)} aria-label="open menu">☰</button>
        </div>
      </div>

      {/* 모바일 드롭다운 */}
      <div className={open ? "nav-menu open" : "nav-menu"}>
        <NavLink to="/board/dog" onClick={() => setOpen(false)} className={link}>강아지</NavLink>
        <NavLink to="/board/cat" onClick={() => setOpen(false)} className={link}>고양이</NavLink>
        <NavLink to="/board/free" onClick={() => setOpen(false)} className={link}>자유게시판</NavLink>
        <hr />
        <NavLink to="/signup" onClick={() => setOpen(false)} className="btn outline block">회원가입</NavLink>
        <NavLink to="/login" onClick={() => setOpen(false)} className="btn ghost block">로그인</NavLink>
        <NavLink to="/business-signup" onClick={() => setOpen(false)} className="btn primary block">기업가입</NavLink>
      </div>
    </header>
  );
}
