import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";


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
            <h2 className="register-title">Welcome back</h2>
            <Form className="form-home" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="sign-button">
                    {t('signIn')}
                </Button>
                <Form.Text className="text-muted" id="sign-up-text">
                    {t('dontHaveAccount')}
                    <Link to="/register">{t('signUp') }</Link>
                </Form.Text>
            </Form>
        </>
    );
}
