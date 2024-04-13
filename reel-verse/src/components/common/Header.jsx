import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/nav-icon.png";

export default function Header() {
    return (
        <header className="navbar">
            <Link to="/movies" className="nav-logo">
                <img src={logo} alt="logo" />
                <h3>reelVerse</h3>
            </Link>
            <nav>
                <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                        isActive ? "active-link" : null
                    }
                >
                    Movies
                </NavLink>
            </nav>
        </header>
    );
}
