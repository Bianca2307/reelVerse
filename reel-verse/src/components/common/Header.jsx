import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useTranslation } from "react-i18next";

import logo from "../../assets/nav-icon.png";

export default function Header() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    async function handleLogout() {
        await signOut(auth);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }

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
                    {t('movies')}
                </NavLink>
                <NavLink to="/" className={({isActive}) => isActive ? "active-link": null} onClick={() => handleLogout()}>
                    {t('logOut')}
                </NavLink>
            </nav>
        </header>
    );
}
