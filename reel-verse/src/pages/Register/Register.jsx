import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";

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
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            console.log(userCredential);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            navigate("/");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h2 className="register-title">{ t('register')}</h2>
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
                    {t('signUp')}
                </Button>
            </Form>
        </>
    );
}
