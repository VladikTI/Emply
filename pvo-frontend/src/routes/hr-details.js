import React from 'react';
import { Typography, Box, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import {boxStyle, ButtonAppBar} from './usersPage';
import data from '../data.json';
import { DataGrid } from '@mui/x-data-grid';
import {typographyStyle} from "./VacancyDetails";

const employees = Array.from(data.employees);

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Имя', width: 150 },
    { field: 'rating', headerName: 'Оценка', width: 150 },
];

const rows = [
    { id: 1, name: 'John Doe', rating: 92 },
    // Add more rows as needed
];

export default function VacancyDetails() {
    document.title = 'Подробности';
    const navigate = useNavigate();
    const { vacancyId } = useParams();
    const selectedVacancy = employees.find((employee) => employee.id === vacancyId);

    if (!selectedVacancy) {
        return <div>Вакансия не найдена</div>;
    }

    return (
        <div>
            <ButtonAppBar />
            <Box>
                <Typography variant="h4" padding="10px">
                    {selectedVacancy.post}
                </Typography>
            </Box>
            {/* ... (rest of the code) ... */}
            <Box>
                <Typography variant="h6" style={typographyStyle} width="60%">
                    {selectedVacancy.requirements.map((requirement) => (
                        <div key={requirement}>
                            - {requirement}
                        </div>
                    ))}
                </Typography>
            </Box>
            <Box style={boxStyle} width="60%">
                <Typography variant="h5">Условия</Typography>
            </Box>
            <Box>
                <Typography variant="h6" style={typographyStyle} width="60%">
                    {selectedVacancy.conditions.map((condition) => (
                        <div key={condition}>
                            - {condition}
                        </div>
                    ))}
                </Typography>
            </Box>
            {/* Add the table */}
            <Box style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
            </Box>
        </div>
    );
}
