import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Button,AppBar,Toolbar,} from '@mui/material';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@mui/material';
import {Box ,Tab} from "@mui/material";
import {Tabs} from "react-tabs";
import { useNavigate } from "react-router-dom"
import data from '../data.json';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmplyLogo from "../images/Emply_transparent.png"
import {Solution} from "./TestForm";

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// стиль для кнопок
export const buttonStyle = {
    backgroundColor: '#e0e1ff', // Задаем цвет фона кнопки
    color: '#060764', // Задаем цвет текста на кнопке (белый)
    marginRight: '10px' // отступ
};
// стиль для box
export const boxStyle = {
    height: "100%", // выоста
    flex: "auto", // меняет свой размер в зависимости от содержимого
    backgroundColor:  '#e0e1ff', // Задаем цвет фона
    color: '#060764', // задаем цвет текста
    textAlign:'center' // центрируем текст
}



const employees = Array.from(data.employees);

//функция для отрисовки таблицы с результатами тестов
function GetTable() {
    const navigate = useNavigate();
    let VacancyList =[]
    Solution.forEach((solution) => {
        // Ищем объекты в employees, соответствующие текущему vacancy_id
        const foundEmployee = employees.find((employee) => employee.id === solution.vacancy_id);

        // Если найден, добавляем в VacancyList
        if (foundEmployee) {
            VacancyList.push(foundEmployee);
        }
    });
    //VacancyList = employees.filter((employee) => employee.id === Solution.vacancy_id);
    console.log("Прекрасно: ", VacancyList)
    //console.log("Охуеть2: ", typeof (VacancyList))
    //const TestResult = getRandomInt(50, 101)
    if (typeof (VacancyList) == "undefined") {
        return (
            <div>
                Вы не выбирали вакансии
            </div>
        )
    } else {
        return (

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Вакансии</TableCell>
                            <TableCell align="center">Зарплата&nbsp;</TableCell>
                            <TableCell align="center">Компания&nbsp;</TableCell>
                            <TableCell align="center">Результат тестирования&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {VacancyList.map((vacancy) => (
                            <TableRow key={vacancy.id}
                                      onClick={() =>   {navigate(`/vacancy_details/${vacancy.id}`)}}
                                      style={{
                                          cursor: "pointer"
                                      }}
                            >
                                <TableCell align="center">{vacancy.post}</TableCell>
                                <TableCell align="center">{vacancy.salary}</TableCell>
                                <TableCell align="center">{vacancy.company}</TableCell>
                                <TableCell align="center">{vacancy.relative}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}
// функция для вывода содержимого каждого таба
function GetTab({tabName}) {
    const navigate = useNavigate();
    switch (tabName) {
        case 'users':
            return (
                <List>

                    {employees.map((employees) => (
                        <ListItem
                            //key={index}
                            style={{
                                border: "1px solid #ccc", // толщина границы элемента с цветом
                                borderRadius: "5px", // скругление углов
                                marginBottom: "10px",// отступ внизу элемента
                                cursor: "pointer", // меняет курсор на стрелку, говорящая что на этом месте ссылка
                                padding: "10px", // расстояние между содержимым и границами

                            }}
                            // теперь каждая вакансия кликабельна
                            //${employees.id} - добавляет в путь айдишник вакансии = параметр, указанный для пути в index.js
                            onClick={() =>   {navigate(`/vacancy_details/${employees.id}`);
                            }}
                        >
                            <ListItemText
                                primary={
                                    <div>
                                        Должность: {employees.post} <br />
                                        Зарплата: {employees.salary}<br />
                                        {employees.company}
                                    </div>
                                }
                                // join  = объединяет в одну строку с разделением
                                secondary={ <div>
                                    Опыт работы: {employees.work_experience} <br />
                                    Навыки:   {employees.skills.join(", ")}
                                </div>

                                }

                            />
                        </ListItem>
                    ))}
                </List>
            );
        case 'vacancys':
            return(
                <GetTable/>
            );
        default:
            return(
                <Typography>тут ничего нет</Typography>
            )
    }
}


function AccountSettings () {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //
    return (
        <div>

            <Box>
                <Button style = {buttonStyle}
                        onClick={handleClick}
                >
                    Профиль
                    <AccountBoxIcon/>
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={handleClose}>Мой аккаунт</MenuItem>
                    <MenuItem onClick={handleClose}>Выйти из аккаунта</MenuItem>
                </Menu>
            </Box>
        </div>
    );
}


export  function ButtonAppBar() {
    return (
        <Box >
            <AppBar style = {{
                position:"static",
                backgroundColor: "#e0e1ff",
                color: "#060764"
            }}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <img
                            src={EmplyLogo} // Замените на путь или URL-адрес вашего логотипа Яндекса
                            alt="Emply"
                            style={{ maxWidth: '100%', maxHeight: '50px', marginTop: "10px"}}
                        />
                    </Typography>
                    <AccountSettings/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}



export default function UsersPage() {
    const [selectedPanel, setSelectedOPanel] = useState('users')
    document.title = 'Вакансии';
    // навигация по вкладкам
    console.log("Абоба: ",Solution)
    // в <list> выводим список вакансий employees с использованием map
    return (
        <div>
            <Box style = {{
                height: "100%", // выоста
                flex: "auto", // меняет свой размер в зависимости от содержимого
                backgroundColor:  '#060764', // Задаем цвет фона
                color: 'white', // задаем цвет текста
                textAlign:'left' // центрируем текст

            }}>
                <ButtonAppBar/>
            </Box>


            <Box style = {boxStyle} >
                <Typography variant="h4">Работа твоей мечты </Typography>
                <Tabs>
                    <Tab label="Вакансии"  value="1" onClick={() => setSelectedOPanel('users')} />
                    <Tab label="Поданные заявки" value="2" onClick={() => setSelectedOPanel('vacancys')} />
                </Tabs>

            </Box>

            <Typography variant="h4">Список вакансий</Typography>
            <GetTab tabName={selectedPanel} />

        </div>
    );
};


