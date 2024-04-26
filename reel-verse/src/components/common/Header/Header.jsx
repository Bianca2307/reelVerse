import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { useTranslation } from "react-i18next";

import logo from "../../../assets/nav-icon.png";
import styles from "./Header.module.css";

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
        <header className={styles["navbar"]}>
            <Link to="/movies" className={styles["nav-logo"]}>
                <img src={logo} alt="logo" />
                <h3>{t('header.TITLE')}</h3>
            </Link>
            <nav className={styles["navbar--links"]}>
                <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                        isActive ? styles["active-link"] : null
                    }
                >
                    {t("header.MOVIES")}
                </NavLink>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? styles["active-link"] : null
                    }
                    onClick={() => handleLogout()}
                >
                    {t("header.LOG_OUT")}
                </NavLink>
            </nav>
        </header>
    );
}
