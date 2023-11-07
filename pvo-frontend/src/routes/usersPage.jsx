import React, { useState, useEffect } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, Button,  } from '@mui/material';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom"
//import Tabs from "@mui/material/Tabs";

// стили
const buttonStyle = {
    backgroundColor: '#060764', // Задаем цвет фона кнопки
    color: 'white', // Задаем цвет текста на кнопке (белый)
    marginRight: '10px' // отступ
};

//Вакансии
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


//Титульник страницы
document.title = 'Вакансии';

export default function UsersPage() {
    const navigate = useNavigate();
    // в <list> выводим список вакансий employees с использованием map
    return (
        <div>

            <Box sx={{ height: "100%", flex: "auto", backgroundColor: "#060764", color: "white", textAlign:'center'}} >
                <Tab label="Работа твоей мечты, ага, щас"  />
            </Box>
            <Typography variant="h4">Список вакансий</Typography>
            <List>

                {employees.map((employees, index) => (
                    <ListItem
                        key={index}
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
                        <Button
                            style={buttonStyle}
                            onClick={() => navigate(`/vacancy_details`)} // Переход на страницу vacancy_details
                        >
                            Подробнее
                        </Button>

                        <Button style={buttonStyle} onClick={() => {}}>
                            Подать заявку
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
