import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import data from '../data.json';
import {ButtonAppBar} from "./usersPage";
import {Button, TextField, Typography,Box} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";


export let Solution = []

const exams = Array.from(data.Tests);
function ShowTest() {
    const navigate = useNavigate();
    const {vacancyId} = useParams();
    const mytest = exams.find(exam => exam.vacancy_id === vacancyId);


    const [answers, setAnswers] = useState(Array(mytest.topic.length).fill(''));

    //передача значения из поля
    const handleInputChange = (index, event) => {
        const newAnswers = [...answers];
        newAnswers[index] = event.target.value;
        setAnswers(newAnswers);
    }


    let newSolution = {
        vacancy_id: vacancyId,
        answers: answers // сохранение ответов
    };


    return (
        <div>
            {mytest.topic.map((question, index) => (
                <div >

                    <Typography variant="h6" style = {{
                        borderRadius: "5px", // скругление углов
                        marginTop: "10px",
                        padding: "10px", // расстояние между содержимым и границами
                    }}> {index + 1}) {question}</Typography>
                    <TextField
                        label="Ответ"
                        variant="outlined"
                        onChange={(event) => handleInputChange(index, event)}
                        fullWidth
                        margin="normal"
                    />
                </div>
            ))}
            <Button style={{
                backgroundColor: '#060764', // Задаем цвет фона кнопки
                color: 'white', // Задаем цвет текста на кнопке (белый)
                marginRight: '10px', // отступ
                cursor: "pointer", // меняет курсор на стрелку, говорящая что на этом месте ссылка
                padding: "10px", // расстояние между содержимым и границами
                bottom: 0,
                //position: "fixed",
                width:"100%"

            }}
                    onClick={() =>
                    {
                        navigate("/search");
                        console.log(answers)
                        console.log(newSolution)
                        Solution.push(newSolution)
                        console.log("Список: ", Solution)
                        alert("Результаты тестирования доступны на вкладке Поданные заявки");
                    }} endIcon={<SendIcon />}>
                Отправить
            </Button>
        </div>
    );


}
export default function TestForm(){
    document.title = 'Тестирование';
    return(
        <div>
            <ButtonAppBar/>
            <ShowTest/>

        </div>
    )
}