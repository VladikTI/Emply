import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance.js";

import { authContext, AuthStatus } from "../contexts/authContext";

import { useTheme } from '@mui/material/styles';

export default function Login() {
    const authCont = useContext(authContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {document.title = "логин"}, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        // validate the inputs
        if (!login || !password) {
            setError("Пожалуйста, введите свой логин и пароль");
            return;
        }

        // clear the errors
        setError("");

        // TODO: send the login request
        console.log("Logging in...");
        authCont.login(login, password)
            .then(response => {navigate("/company")})
            .catch(error => console.error(error));
    }

    return (
        <>
            {/*{authCont.authStatus == AuthStatus.AUTHORIZED && <Navigate to="/company"/>}*/}
            <Container maxWidth="xs" sx={{mt: 30}}>
                <Typography variant="h5" component="h1" gutterBottom textAlign="center">
                    Вход в аккаунт
                </Typography>
                {error && <Alert severity="error" sx={{my: 2}}>{error}</Alert>}
                <Box component="form" onSubmit={onSubmit}>
                    <TextField
                        color="blue"
                        label="Логин"
                        variant="outlined"
                        autoComplete="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        sx={{mt: 1}}
                        fullWidth
                    />
                    <TextField
                        color="blue"
                        label="Пароль"
                        variant="outlined"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{mt: 3}}
                        fullWidth
                    />
                    <Button variant="contained" color="blue" type="submit" sx={{mt: 3}} fullWidth>Войти</Button>
                </Box>
            </Container>
        </>
    )
}