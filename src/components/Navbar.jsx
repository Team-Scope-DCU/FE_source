import { Link, NavLink } from "react-router-dom";

const active = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container">
        <Link to="/" className="brand">숨고</Link>

        <nav className="nav-links">
          <NavLink to="/estimate" className={active}>견적요청</NavLink>
          <NavLink to="/find-pro" className={active}>고수찾기</NavLink>
          <NavLink to="/market" className={active}>마켓</NavLink>
        </nav>

        <div className="nav-right">
          <button className="link">로그인 / 회원가입</button>
          <button className="cta">고수가입</button>
        </div>
      </div>
    </header>
  );
}
