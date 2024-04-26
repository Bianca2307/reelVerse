import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./Register.module.css"

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { t } = useTranslation();

    function handleChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        );
        console.log(userCredential);
        const user = userCredential.user;
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/");
    }

    return (
        <>
            <h2 className={styles["register-title"]}>
                {t("REGISTER.REGISTER")}
            </h2>
            <Form className={styles["register-form"]} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={styles["register-form__label"]}>
                        {t("login.EMAIL")}
                    </Form.Label>
                    <Form.Control
                        className={styles["register-form__input"]}
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={styles["register-form__label"]}>
                        {t("LOGIN.PASSWORD")}
                    </Form.Label>
                    <Form.Control
                        className={styles["register-form__input"]}
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className={styles["sign-button"]}
                >
                    {t("REGISTER.SIGN_UP")}
                </Button>
            </Form>
        </>
    );
}
