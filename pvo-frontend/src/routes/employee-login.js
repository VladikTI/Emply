import { Alert, Button, Input, Row, Col, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        document.title = "логин";
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        // validate the inputs
        if (!login || !password) {
            setError("Пожалуйста, введите свой логин и пароль");
            return;

        }
        navigate("/company");
    }

    return (
        <>
            <Row
                justify="center"
                align="middle"
                style={{ minHeight: "100vh", textAlign: "center" }}
            >
                <Col span={8}>
                    <h1>Вход в аккаунт</h1>
                    {error && <Alert type="error" style={{ marginBottom: 16 }}>{error}</Alert>}
                    <form onSubmit={onSubmit}>
                        <Input
                            color="blue"
                            placeholder="Логин"
                            autoComplete="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            style={{ marginTop: 8 }}
                        />
                        <Input
                            color="blue"
                            placeholder="Пароль"
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ marginTop: 12 }}
                        />
                        <Button type="primary" htmlType="submit" style={{ marginTop: 16, width: "100%" }}>
                            Войти
                        </Button>
                        <Typography.Text style={{ marginTop: 8 }}>
                            <Link to="/login">Войти на страницу компании</Link>
                        </Typography.Text>
                    </form>
                </Col>
            </Row>
        </>
    );
}
