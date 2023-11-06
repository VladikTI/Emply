import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Alert, Autocomplete, Button, TextField} from "@mui/material";
import axios from "axios";
import {useTheme} from '@mui/material/styles';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Company(){
    const navigate = useNavigate();
    return (
        <Box id="app" sx={{height: "100%", width: "100%", display: "flex"}}>
            <BasicTabs/>
        </Box>
    );
}

function BasicTabs() {
    const roles = ['Руководитель', 'Сотрудник'];
    const [units, setUnits] = useState(["Отдел 1", "Отдел 2", "Отдел 3"]);
    const [value, setValue] = React.useState("");
    const [value1, setValue1] = React.useState(roles[0]);
    const [value2, setValue2] = React.useState(units[0]);
    const token = localStorage.getItem('token');
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [position, setPosition] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [unit_id, setUnitId] = useState(units[0]);
    const [available_vacation, setAvailableVacation] = useState("");
    const [role_id, setRoleId] = useState(roles[0]);
    const [error, setError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const theme = useTheme();

    useEffect(() => {document.title = "Пора в отпуск: административная панель"}, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleAddEmployee = async (event) => {
        event.preventDefault();
        if (!username || !password || !name || !surname || !patronymic || !role_id || !unit_id
            || !available_vacation || !position) {
            setError("Пожалуйста, заполните все поля");
            return;
        }
        setError("");
        setSnackbarSeverity("success");
        setSnackbarMessage("Сотрудник успешно добавлен");
        setSnackbarOpen(true);
        axios
            .post('http://127.0.0.1:3000/api/add_employee', {username: username, password: password, name: name,
            surname: surname, patronymic: patronymic, position: position, available_vacation: available_vacation,
            unit_id: unit_id, role_id: role_id}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                // Обработка успешного ответа от сервера
            })
            .catch((error) => {
                console.error('Ошибка при отправке запроса:', error);
            });
    };

    const handleAddUnit = async (event) => {
        if (!name) {
            setError("Пожалуйста, заполните все поля");
            return;
        }
        setUnits((prevUnits) => [...prevUnits, name]);
        setError("");
        axios
            .post('http://127.0.0.1:3000/api/add_unit', {name: name}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                // Обработка успешного ответа от сервера

            })
            .catch((error) => {
                console.error('Ошибка при отправке запроса:', error);
            });
    };

    //Можно более аккуратно цвета настроить через стиль, но я этим сейчас заниматься не буду // 25.10.2023 6:43
    return (
        <Box sx={{ height: "100%", flex: "auto"}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs textColor="secondary" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Управление вакансиями" {...a11yProps(0)} />
                    <Tab label="Управление HR-сотрудниками" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel color={theme.palette.blue.dark} value={value} index={0}>
                {error && <Alert severity="error" sx={{my: 2}}>{error}</Alert>}
                <form>
                <Box marginBottom={2}>
                    <TextField
                        label="Название отдела"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Box>
                </form>
                <form><Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "auto", marginRight: "0" }}
                    onClick={handleAddUnit}
                >
                    Добавить
                </Button>
                </form>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {error && <Alert severity="error" sx={{my: 2}}>{error}</Alert>}
                <form>
                    <Box sx={{ width: "100%" }}>
                        {/* ... остальной код ... */}
                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={6000}
                            onClose={handleSnackbarClose}
                            anchorOrigin={{ vertical: "center", horizontal: "center" }} // Установите положение Snackbar по центру
                        >
                            <MuiAlert
                                elevation={6}
                                variant="filled"
                                severity={snackbarSeverity}
                                onClose={handleSnackbarClose}
                            >
                                {snackbarMessage}
                            </MuiAlert>
                        </Snackbar>
                    </Box>
                    <Box marginBottom={2}>
                        <TextField
                            label="Фамилия"
                            variant="outlined"
                            fullWidth
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </Box>
                    <Box marginBottom={2}>
                    <TextField
                        label="Имя"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </Box>
                        <Box marginBottom={2}>
                    <TextField
                        label="Отчество"
                        variant="outlined"
                        fullWidth
                        value={patronymic}
                        onChange={(e) => setPatronymic(e.target.value)}
                    />
                        </Box>
                    <Box marginBottom={2}>
                    <TextField
                        label="Должность"
                        variant="outlined"
                        fullWidth
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                    </Box>
                    <Box marginBottom={2}>
                    <TextField
                        label="Логин"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </Box>
                    <Box marginBottom={2}>
                    <TextField
                        label="Пароль"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Box>
                    <Box marginBottom={2}>
                    <TextField
                        label="Доступные дни отпуска"
                        variant="outlined"
                        fullWidth
                        value={available_vacation}
                        onChange={(e) => setAvailableVacation(e.target.value)}
                    />
                    </Box>
                    <Box marginBottom={2}>
                        <Autocomplete
                            value={value1}
                            onChange={(event, newValue1) => {
                                setValue1(newValue1);
                                if (newValue1 === "Сотрудник") {
                                    setRoleId(2)
                                }
                                else if (newValue1 === "Руководитель") {
                                    setRoleId(1)
                                }
                            }}
                            id="combo-box-demo"
                            options={roles}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Роль" variant="outlined" />}

                        />
                    </Box>
                    <Box marginBottom={2}>
                        <Autocomplete
                            value={value2}
                            onChange={(event, newValue2) => {
                                setValue2(newValue2);
                                const id = units.indexOf(newValue2) + 1;
                                setUnitId(id);
                            }}
                            id="combo-box-demo"
                            options={units}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Отдел" variant="outlined" />}

                        />
                    </Box>
                </form>
                <form><Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "auto", marginRight: "0" }}
                    onClick={handleAddEmployee}
                >
                    Добавить
                </Button>
                </form>
            </CustomTabPanel>
        </Box>
    );
}