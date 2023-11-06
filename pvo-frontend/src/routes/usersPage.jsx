import React, { useState, useEffect } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, Button } from '@mui/material';

export default function UsersPage() {
    const vacancies = [{salary: 100000}, 0];

    return (
        <div>
            <Typography variant="h4">Список вакансий</Typography>
            <List>
                {vacancies.map((vacancy, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={vacancy.title}
                            secondary={`Зарплата: ${vacancy.salary}`}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                // Ваш код для обработки выбора вакансии
                            }}
                        >
                            Подать заявку
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
