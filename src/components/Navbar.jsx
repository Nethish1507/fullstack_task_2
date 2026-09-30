import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-in">
        <strong className="brand">Poll</strong>
        <nav>
          <NavLink to="/" end>Vote</NavLink>
          <NavLink to="/results">Results</NavLink>
          <NavLink to="/manage">Manage</NavLink>
        </nav>
      </div>
    </header>
  );
}
