import React, { useState, useEffect } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, Button,  } from '@mui/material';
import {Box ,Tab} from "@mui/material";
import {Tabs, TabList, TabPanel} from "react-tabs";
import { TabContext } from '@mui/lab';
import { useNavigate } from "react-router-dom"
//import Tabs from "@mui/material/Tabs";

//Титульник страницы
document.title = 'Вакансии';

// стиль для кнопок
const buttonStyle = {
    backgroundColor: '#060764', // Задаем цвет фона кнопки
    color: 'white', // Задаем цвет текста на кнопке (белый)
    marginRight: '10px' // отступ
};
// стиль для box
const boxStyle = {
    height: "100%", // выоста
    flex: "auto", // меняет свой размер в зависимости от содержимого
    backgroundColor:  '#060764', // Задаем цвет фона
    color: 'white', // задаем цвет текста
    textAlign:'center' // центрируем текст
}

//Список Вакансий
const employees = [
    {
        company: "Компания A",
        salary: 50000,
        description: "Опыт работы - 2 года.",
        skills: ["JavaScript", "React", "Node.js"]
    },
    {
        company: "Компания B",
        salary: 60000,
        description: "Базовые знания Python и SQL",
        skills: ["Python", "Django", "SQL"]
    },
    {
        company: "Компания C",
        salary: 55000,
        description: "Базовые знания Java",
        skills: ["Java", "Spring", "Hibernate"]
    }
];

export default function UsersPage() {
    const navigate = useNavigate();
    // в <list> выводим список вакансий employees с использованием map
    return (
        <div>
            <Box style = {boxStyle} >
                <Tab label="Работа твоей мечты, ага, щас"  />
                <TabList>
                    <Tab label="Вакансии" value="1" />
                    <Tab label="Поданные заявки" value="2" />
                </TabList>
            </Box>

                <Typography variant="h4">Список вакансий</Typography>
            <List>

                {employees.map((employees, index) => (
                    <ListItem
                        key={index}
                        // теперт каждая вакансия кликабельна
                        onClick={() => navigate(`/vacancy_details`)}
                        >
                        <ListItemText
                            primary={
                                        <div>
                                            {employees.company} <br />
                                            Зарплата: {employees.salary}
                                        </div>
                                    }
                            // join  = объединяет в одну строку с разделением
                            secondary={ <div>
                                        Описание: {employees.description} <br />
                                        Навыки:   {employees.skills.join(", ")}
                                        </div>

                                      }

                        />

                        <Button style={buttonStyle} onClick={() => {}}>
                            Подать заявку
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
