import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/x-date-pickers/locales';

import Login from "./routes/login";
import Company from "./routes/company";
import UsersPage from "./routes/usersPage";
import VacancyDetails from "./routes/VacancyDetails";
import EmployeeLogin from "./routes/employee-login";
import Start from "./routes/start";
import HR from "./routes/hr";
import TestForm from "./routes/TestForm";
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
        element: <Start/>,
    },
    {
        path: "/company",
        element: <Company/>,
    },
    {
        path: "/search",
        element: <UsersPage/>,
    },
    {
        path: "vacancy_details/:vacancyId",
        element: <VacancyDetails/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/employee-login",
        element: <EmployeeLogin/>,
    },
    {
        path: "/employee-page",
        element: <HR/>,
    },
    {
        path: "/exam/:vacancyId",
        element: <TestForm/>
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
        <ThemeProvider theme={appTheme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
);