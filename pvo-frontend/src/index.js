import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/x-date-pickers/locales';

import Login from "./routes/login";
import ErrorPage from "./errorPage";
import Company from "./routes/company";
import UserPrivateWrapper from './userPrivateWrapper';
import AuthProvider from './contexts/authContext';
import UsersPage from "./routes/usersPage";
import Vacancy_details from "./routes/vacancy_details";

const dayjs = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat')
const dayOfYear = require('dayjs/plugin/dayOfYear')

require('dayjs/locale/ru')

dayjs.extend(dayOfYear)
dayjs.extend(localizedFormat)
dayjs.locale('ru')

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="apply"/>,
        errorElement: <ErrorPage/>,  // new
    },
    {
        path: "/",
        element: <UserPrivateWrapper/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/company",
                element: <Company/>,
            },
            {
                path: "/search",
                element: <UsersPage/>,
            },
            {
                //:vacancyId - параметр идентификатор вакансии
                path: "vacancy_details/:vacancyId",
                element: <Vacancy_details/>,
            },
        ]
    },
    {
        path: "/login",
        element: <Login/>,
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

const appTheme = createTheme(
    {
        palette: {
            primary: {
                main: '#f5f5f5',
                light: '#ffffff',
                dark: '#dedede',
                contrastText: '#000000',
            },
            secondary: {
                main: '#0072E5',
                light: '#00A3FF',
                dark: '#0077FF',
                contrastText: '#ffffff',
            },
            blue: {
                main: '#0072E5',
                light: '#00A3FF',
                dark: '#0077FF',
                contrastText: '#ffffff',
            },
            red: {
                main: '#fa382d',
                light: '#f64c4a',
                dark: '#bf0012',
                contrastText: '#ffffff',
            },
            green: {
                main: '#00c642',
                light: '#00ee55',
                dark: '#008c28',
                contrastText: '#ffffff',
            }
        },
        typography: {
            fontFamily: "'Segoe UI', sans-serif;",
        },
    }, ruRU
);


root.render(
    <AuthProvider>
        <ThemeProvider theme={appTheme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </AuthProvider>
);