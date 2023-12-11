import React from 'react';
import {Typography, Button, Box} from '@mui/material';
import {useParams,useNavigate} from "react-router-dom";
import {boxStyle} from "./usersPage";
import data from '../data.json';
import SendIcon from '@mui/icons-material/Send';
import {ButtonAppBar} from "./usersPage";
const employees = Array.from(data.employees);

export const typographyStyle = {
    //border: "1px solid #ccc", // толщина границы элемента с цветом
    borderRadius: "5px", // скругление углов
    marginTop: "10px",
    marginBottom: "10px",// отступ внизу элемента
    padding: "10px", // расстояние между содержимым и границами
}
export default function VacancyDetails() {
    document.title = 'Подробности';
    const navigate = useNavigate();
    const {vacancyId} = useParams();
    //выискиваем вакансиюю по id и показыаем всю информацию о вакансии
    const selectedVacancy = employees.find((employee) => employee.id === vacancyId);

    if (!selectedVacancy) {
        return <div>Вакансия не найдена</div>;
    }

    return (
        <div>
            <ButtonAppBar/>
            <Box style={boxStyle}>
                <Typography variant="h4" padding="10px"> {selectedVacancy.post} </Typography>
            </Box>
            <Box display="flex">
                <Box style={{ width: '100%'}} padding= "10px" >
                    <Typography variant="h4">Компания: {selectedVacancy.company}</Typography>
                    <Typography variant="h5">Зарплата: {selectedVacancy.salary}</Typography>
                    <Typography variant="h5">Требуемый опыт работы: {selectedVacancy.work_experience}</Typography>
                    <Typography variant="h5">Навыки: {selectedVacancy.skills.join(", ")}</Typography>
                </Box>
                <Box ml={2} style={{ width: '100%'}}> {/* Расстояние между текстом и изображением */}
                </Box>
            </Box>
            <Box style={boxStyle} width="60%">
                <Typography variant="h5">Обязанности</Typography>
            </Box>
            <Box>
                <Typography variant="h6" style = {typographyStyle} width="60%">
                    {selectedVacancy.duty.map((obligation) => (
                        <div>
                            - {obligation}
                        </div>
                    ))}
                </Typography>
            </Box>
            <Box style={boxStyle} width="60%">
                <Typography variant="h5">Требования</Typography>
            </Box>
            <Box style={{
                flex: "auto",
            }}>
                <Typography variant="h6" style = {typographyStyle} width="60%">
                    {selectedVacancy.requirements.map((requirement) => (
                        <div>
                            - {requirement}
                        </div>
                    ))}
                </Typography>
            </Box>
            <Box style={boxStyle} width="60%">
                <Typography variant="h5">Условия</Typography>
            </Box>
            <Box>
                <Typography variant="h6" style = {typographyStyle} width="60%">
                    {selectedVacancy.conditions.map((condition) => (
                        <div>
                            - {condition}
                        </div>
                    ))}
                </Typography>
            </Box>
            <Button style={{
                backgroundColor: '#060764', // Задаем цвет фона кнопки
                color: "white", // Задаем цвет текста на кнопке (белый)
                right: "0px", // отступ справа
                cursor: "pointer", // меняет курсор на стрелку, говорящая что на этом месте ссылка
                padding: "10px", // расстояние между содержимым и границами
                bottom: 0, // отступ снизу
                position: "fixed",
                width:"40%"

            }}
                    onClick={() => {navigate(`/exam/${vacancyId}`);
                    }} endIcon={<SendIcon />}>
                Подать заявку
            </Button>
        </div>
    );
}
