import React from 'react';
import {Typography, Button, Box} from '@mui/material';
import {useParams} from "react-router-dom";
import {boxStyle} from "./usersPage";
import data from '../data.json';

const employees = Array.from(data.employees);

export default function VacancyDetails() {
    const {vacancyId} = useParams();
    //выискиваем вакансиюю по id и показыаем всю информацию о вакансии
    const selectedVacancy = employees.find((employee) => employee.id === vacancyId);

    if (!selectedVacancy) {
        return <div>Вакансия не найдена</div>;
    }

    return (
        <div>
            <Box style={boxStyle}>
                <Typography variant="h4">Подробности о вакансии</Typography>
            </Box>
            <Box>
                <Typography variant="h4">Компания: {selectedVacancy.company}</Typography>
                <Typography variant="h5">Зарплата: {selectedVacancy.salary}</Typography>
                <Typography variant="h5">Требуемый опыт работы: {selectedVacancy.work_experience}</Typography>
                <Typography variant="h5">Навыки: {selectedVacancy.skills.join(", ")}</Typography>
            </Box>
            <Box style={boxStyle}>
                <Typography variant="h5">Обязанности</Typography>
            </Box>
            <Box>
                <Typography variant="h6">
                    {selectedVacancy.duty.map((obligation) => (
                        <div>
                            - {obligation}
                        </div>
                    ))}
                </Typography>
            </Box>
            <Box style={boxStyle}>
                <Typography variant="h5">Требования</Typography>
            </Box>
            <Box style={{
                flex: "auto",
            }}>
                <Typography variant="h6">
                    {selectedVacancy.requirements.map((requirement) => (
                        <div>
                            - {requirement}
                        </div>
                    ))}
                </Typography>
            </Box>
            <Box style={boxStyle}>
                <Typography variant="h5">Условия</Typography>
            </Box>
            <Box>
                <Typography variant="h6">
                    {selectedVacancy.conditions.map((condition) => (
                        <div>
                            - {condition}
                        </div>
                    ))}
                </Typography>
            </Box>
            <Box style={boxStyle}>
                <Button style={{
                    cursor: "pointer", // меняет курсор на стрелку, говорящая что на этом месте ссылка
                    padding: "10px", // расстояние между содержимым и границами
                    width: "100%"
                }}
                        onClick={() => {
                        }}>
                    Подать заявку
                </Button>
            </Box>
        </div>
    );
}
