import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

import logo from "../../../assets/icon.png";
import styles from "./Header.module.css";

export default function Header() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    async function handleLogout() {
        await signOut(auth);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    return (
        <header className={styles["navbar"]}>
            <Link to="/movies" className={styles["nav-logo"]}>
                <img src={logo} alt="logo" className={styles["logo"]} />
                <h3>{t("HEADER.TITLE")}</h3>
            </Link>
            <div className={styles["hamburger"]} onClick={toggleMenu}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>
            <nav className={`${styles["navbar--links"]} ${isOpen ? styles["open"] : ""}`}>
                <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                        isActive ? styles["active-link"] : null
                    }
                    onClick={toggleMenu}
                >
                    {t("HEADER.MOVIES")}
                </NavLink>
                <NavLink
                    to="/favorite"
                    className={({ isActive }) =>
                        isActive ? styles["active-link"] : null
                    }
                    onClick={toggleMenu}
                >
                    {t("HEADER.FAVORITES")}
                </NavLink>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? styles["active-link"] : null
                    }
                    onClick={() => {
                        handleLogout();
                        toggleMenu();
                    }}
                >
                    {t("HEADER.LOG_OUT")}
                </NavLink>
            </nav>
        </header>
    );
}
