import React, { useState, useEffect } from 'react';
import { Typography, Button,Box } from '@mui/material';
import  { useParams }  from "react-router-dom";
import {buttonStyle,boxStyle, employees,selectedID} from "./usersPage";
export default function Vacancy_details() {
    /*const id = 1234;
    const {vacancyId} = Number(useParams()); - не работает, надо разбираться с router и
    разбираться в динамических компонентах 19.11
    console.log("опа : ", vacancyId);   */
    //выискиваем вакансиюю по id и показыаем всю информацию о вакансии
    const selectedVacancy =  employees.find((employee) => employee.id === selectedID);

    if (!selectedVacancy) {
        return <div>Вакансия не найдена</div>;
    }

    return (
        // <div>
        //     <Box sx={{ height: "100%", flex: "auto"}}>
        //         <Tabs textColor="secondary" aria-label="basic tabs example">
        //             <Tab label="Пошел нахуй" />
        //         </Tabs>
        //     </Box>
        // </div>
        <div>
            <Box style = {boxStyle} >
                <Typography variant="h4">Подробности о вакансии</Typography>
            </Box>

            <Box>
                <Typography variant = "h4">Компания: {selectedVacancy.company}</Typography>
                <Typography variant = "h5">Зарплата: {selectedVacancy.salary}</Typography>
                <Typography variant = "h5">Требуемый опыт работы: {selectedVacancy.work_experience}</Typography>
                <Typography variant = "h5">Навыки: {selectedVacancy.skills.join(", ")}</Typography>
            </Box>



            <Box style = {boxStyle}>
                <Typography variant="h5" >Обязанности</Typography>
            </Box>

            <Box>
                <Typography variant = "h6">
                    {selectedVacancy.duty.map((obligation) => (
                        <div>
                            - {obligation}
                        </div>
                    ))}
                </Typography>
            </Box>



            <Box style = {boxStyle}>
                <Typography variant="h5">Требования</Typography>
            </Box>

            <Box style={{
                flex:"auto",
            }}>
                <Typography variant = "h6">
                    {selectedVacancy.requirements.map((requirement) => (
                        <div>
                            - {requirement}
                        </div>
                    ))}
                </Typography>
            </Box>




            <Box style = {boxStyle}>
                <Typography variant="h5">Условия</Typography>
            </Box>

            <Box>
                <Typography variant = "h6">
                    {selectedVacancy.conditions.map((condition) => (
                        <div>
                            - {condition}
                        </div>
                    ))}
                </Typography>
            </Box>


            <Box  style = {boxStyle}>
                <Button  style={{
                    cursor: "pointer", // меняет курсор на стрелку, говорящая что на этом месте ссылка
                    padding: "10px", // расстояние между содержимым и границами
                    width: "100%"
                }}

                         onClick={() => {}}>
                    Подать заявку
                </Button>
            </Box>
        </div>
    );
}
