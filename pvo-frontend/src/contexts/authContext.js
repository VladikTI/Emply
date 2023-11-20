import {createContext, useState, useEffect, useContext} from 'react';
//import { useNavigate } from "react-router-dom";

import {axiosInstance} from "../axiosInstance.js";

export const authContext = createContext({});

const dayjs = require('dayjs')

export const AuthStatus = {UNAUTHORIZED: 0, AUTHORIZED: 1, PENDING_AUTH: 2, PENDING_REFRESH: 3};

export function AuthProvider({children}) {
    const [authStatus, setAuthStatus] = useState(AuthStatus.AUTHORIZED);
    const [userData, setUserData] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [authTokenExpire, setAuthTokenExpire] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [refreshTokenExpire, setRefreshTokenExpire] = useState(null);

    //const navigate = useNavigate();

    async function login(username, password) {
        setAuthStatus(AuthStatus.PENDING_AUTH);
        try {
            let response = await axiosInstance.post("/auth", {username: username, password: password});
            let data = response.data;
            let userData_temp = {
                id: data.employee_id,
                name: data.name,
                surname: data.surname,
                patronymic: data.patronymic,
                position: data.position,
                availableVacation: data.available_vacation,
                unitId: data.unit_id,
                roleId: data.role_id
            };

            setUserData(userData_temp);
            setAuthToken(data.token);
            setAuthTokenExpire(data.token_expire_date);
            setRefreshToken(data.refresh_token);
            setRefreshTokenExpire(data.refresh_token_expire_date);

            localStorage.setItem("userData", JSON.stringify(userData_temp));
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("authTokenExpire", data.token_expire_date);
            localStorage.setItem("refreshToken", data.refresh_token);
            localStorage.setItem("refreshTokenExpire", data.refresh_token_expire_date);

            setAuthStatus(AuthStatus.AUTHORIZED);
        } catch (error) {
            console.error(error);
            setAuthStatus(AuthStatus.UNAUTHORIZED)
        }
        return;
    };

    async function logout() {
        setAuthStatus(AuthStatus.UNAUTHORIZED);

        localStorage.removeItem("userData");
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpire");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("refreshTokenExpire");
    };

    async function postWithAuth(path, body) {
        // if (authStatus == AuthStatus.UNAUTHORIZED) {
        //     //navigate("/login");
        //     return;
        // }
        // if (authStatus == AuthStatus.PENDING_AUTH ||
        //     authStatus == AuthStatus.PENDING_REFRESH) {
        //
        //     await new Promise(resolve => setTimeout(resolve, 100));
        //     postWithAuth(body);
        // }
        // if (authStatus == AuthStatus.AUTHORIZED) {
        //     return axiosInstance.post(path, body, {
        //         headers: {
        //             'Authorization': 'Bearer ' + authToken,
        //             'Content-Type': 'application/json',
        //         }
        //     });
        // }
    };

    async function getWithAuth(path) {
        // if (authStatus == AuthStatus.UNAUTHORIZED) {
        //     //navigate("/login");
        //     return;
        // }
        // if (authStatus == AuthStatus.PENDING_AUTH ||
        //     authStatus == AuthStatus.PENDING_REFRESH) {
        //
        //     await new Promise(resolve => setTimeout(resolve, 100));
        //     getWithAuth(path);
        // }
        // if ( authStatus == AuthStatus.AUTHORIZED ) {
        //     return axiosInstance.get(path, {
        //         headers: {
        //             'Authorization': 'Bearer ' + authToken,
        //             'Content-Type': 'application/json',
        //         }
        //     });
        // }
    }

    async function refreshAccessToken() {
        // if (authStatus == AuthStatus.UNAUTHORIZED) {
        //     //navigate("/login");
        //     return;
        // }
        // if (authStatus == AuthStatus.PENDING_AUTH ||
        //     authStatus == AuthStatus.PENDING_REFRESH) {
        //
        //     await new Promise(resolve => setTimeout(resolve, 100));
        //     refreshAccessToken();
        // }
        // if (authStatus == AuthStatus.AUTHORIZED) {
        //     setAuthStatus(AuthStatus.PENDING_REFRESH);
        //     try {
        //         let response = await axiosInstance.post("/api/refresh", {}, {
        //             headers: {
        //                 'Authorization': 'Bearer ' + authToken,
        //                 'Content-Type': 'application/json',
        //             }
        //         });
        //         let data = response.data;
        //
        //         setAuthToken            (data.token);
        //         setAuthTokenExpire      (data.token_expire_date);
        //         setRefreshToken         (data.refresh_token);
        //         setRefreshTokenExpire   (data.refresh_token_expire_date);
        //
        //         localStorage.setItem("authToken",           authToken);
        //         localStorage.setItem("authTokenExpire",     authTokenExpire);
        //         localStorage.setItem("refreshToken",        refreshToken);
        //         localStorage.setItem("refreshTokenExpire",  refreshTokenExpire);
        //
        //         setAuthStatus(AuthStatus.AUTHORIZED);
        //     }
        //     catch (error) {
        //         console.error(error);
        //         logout();
        //     }
        //
        // }
    };

    //TODO: проверка должна быть не в локальном времени!!!
    useEffect(() => {
        const intervalId = setInterval(() => {
            let now = dayjs();
            if (authStatus != AuthStatus.AUTHORIZED) return;
            if (now.diff(dayjs(authTokenExpire), 'minute') < 2) refreshAccessToken();
            if (now.diff(dayjs(refreshTokenExpire), 'minute') < 2) logout();
        }, 1000 * 5) // in milliseconds
        return () => clearInterval(intervalId)
    }, []);

    useEffect(() => {
        let userData_temp = JSON.parse(localStorage.getItem('userData'));
        let authToken_temp = localStorage.getItem('authToken');
        let authTokenExpire_temp = localStorage.getItem('authTokenExpire');
        let refreshToken_temp = localStorage.getItem('refreshToken');
        let refreshTokenExpire_temp = localStorage.getItem('refreshTokenExpire');

        setUserData(userData_temp);
        setAuthToken(authToken_temp);
        setAuthTokenExpire(authTokenExpire_temp);
        setRefreshToken(refreshToken_temp);
        setRefreshTokenExpire(refreshTokenExpire_temp);

        // if(authToken_temp == undefined) {
        //     setAuthStatus(AuthStatus.UNAUTHORIZED);
        // }
    }, []);

    return (
        <authContext.Provider value={{
            authStatus: authStatus,
            userData: userData,
            login: login,
            logout: logout,
            postWithAuth: postWithAuth,
            getWithAuth: getWithAuth
        }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;