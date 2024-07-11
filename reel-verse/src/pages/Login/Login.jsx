import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase/firebase";
import { useTranslation } from "react-i18next";

import style from "./Login.module.css";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { t } = useTranslation();

    const navigate = useNavigate();

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const userCredential = await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        );
        console.log(userCredential);
        const user = userCredential.user;
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/movies");
    }

    return (
        <>
            <div className={style["login-container"]}>
                <h2 className={style["login-title"]}>
                    {t("LOGIN.WELCOME_BACK")}
                </h2>
                <Form className={style["login-form"]} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style["login-form__label"]}>
                            {t("LOGIN.EMAIL")}
                        </Form.Label>
                        <Form.Control 
                            className={style["login-form__input"]}
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {t("LOGIN.VALID_EMAIL")}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className={style["login-form__label"]}>
                            {t("LOGIN.PASSWORD")}
                        </Form.Label>
                        <Form.Control
                            className={style["login-form__input"]}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <div className={style["authentication-methods-container"]}>
                        <Button
                            variant="primary"
                            type="submit"
                            className={style["sign-button"]}
                        >
                            {t("LOGIN.SIGN_IN")}
                        </Button>
                        <Form.Text
                            className={style["text-muted"]}
                            id={style["sign-up-text"]}
                        >
                            {t("LOGIN.DONT_HAVE_ACCOUNT")}
                            <Link to="/register">{t("signUp")}</Link>
                        </Form.Text>
                    </div>
                </Form>
            </div>
        </>
    );
}
