import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Button,AppBar,Toolbar } from '@mui/material';
import {Box ,Tab} from "@mui/material";
import {Tabs} from "react-tabs";
import { useNavigate } from "react-router-dom"
import data from '../data.json';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
//Титульник страницы
document.title = 'Вакансии';

export let selectedID = 0;

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
                            onClick={() =>   {selectedID= employees.id;// устанавливаем id выбранной вакансии
                                navigate(`/vacancy_details/${employees.id}`);
                            }}
                        >
                            <ListItemText
                                primary={
                                    <div>
                                        {employees.company} <br />
                                        Должность: {employees.post} <br />
                                        Зарплата: {employees.salary}
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
                        EMPLY
                    </Typography>
                    <AccountSettings/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}



export default function UsersPage() {
    const [selectedPanel, setSelectedOPanel] = useState('users')
    // навигация по вкладкам

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
                    <Tab label="Поданные заявки" value="2" onClick={() => setSelectedOPanel('hui')} />
                </Tabs>

            </Box>

            <Typography variant="h4">Список вакансий</Typography>
            <GetTab tabName={selectedPanel} />

        </div>
    );
};


