import React, { useState, useEffect } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, Button } from '@mui/material';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default function Vacancy_details() {
    const vacancies = [{salary: 100000}, 0];

    return (
        <div>
            <Box sx={{ height: "100%", flex: "auto"}}>
                <Tabs textColor="secondary" aria-label="basic tabs example">
                    <Tab label="Пошел нахуй"  />
                </Tabs>
            </Box>

        </div>
    );
}
