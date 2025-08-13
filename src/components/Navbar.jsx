import { Link, NavLink } from "react-router-dom";

const active = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container">
        <Link to="/" className="brand">PET SCOPE</Link>

        <nav className="nav-links">
            <NavLink to="/community" className={active}>커뮤니티</NavLink>
            <NavLink to="/freeboard" className={active}>자유게시판</NavLink>
            <NavLink to="/adopt" className={active}>분양/입양</NavLink>
        </nav>

        <div className="nav-right">
          <button className="link">로그인 / 회원가입</button>
          <button className="cta">기업가입</button>
        </div>
      </div>
    </header>
  );
}
