import {
    Box,
    Typography,
    CircularProgress
} from "@mui/material";

import {useTheme} from '@mui/material/styles';
import {useNavigate, Navigate} from "react-router-dom";
import {useEffect, useState, useContext} from "react";

import HorizontalDivider from "../components/horizontalDivider";
import VerticalDivider from "../components/verticalDivider";
import DisplayPanel from "../components/apply/displayPanel";
import Timeline from "../components/apply/timeline";
import ApplyingPanel from "../components/apply/applyingPanel";
import NavBar from "../components/navBar"
import {AuthStatus, authContext} from "../contexts/authContext";

export default function Editing() {
    const navigate = useNavigate();
    const authData = useContext(authContext);
    const [loaded, setLoaded] = useState(false);
    const [remoteData, setRemoteData] = useState({daysLeft: -1, myApplications: [], applications: []});
    const [applyData, setApplyData] = useState({
        isApplying: false,
        selectedDay: 14,
        firstSelector: null,
        secondSelector: null
    });

    useEffect(() => {
        if (authData.authStatus == AuthStatus.UNAUTHORIZED) {
            return;
        }
        if (authData.userData == null) {
            return;
        }
        ;

        async function load() {
            try {
                let response1 = await authData.postWithAuth("/api/get_applications", {users: [{employee_id: authData.userData.id}]});
                let response2 = await authData.postWithAuth("/api/get_unit_applications", {
                    employee_id: authData.userData.id,
                    unit_id: authData.userData.unitId
                });
                setRemoteData({
                    daysLeft: authData.userData.availableVacations,
                    myApplications: (response1.data[0]).applications,
                    applications: (response2.data)
                });
                setLoaded(true);
            } catch (error) {
                console.error(error);
            }
        }

        load();
    }, [authData]);

    if (!loaded) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                <CircularProgress size="100px"/>
            </Box>
        );
    }

    return (
        <Box id="app" sx={{height: "100%", width: "100%", display: "flex"}}>
            <Panel remoteData={remoteData} applyData={applyData} setApplyData={setApplyData}
                   setRemoteData={setRemoteData} setLoaded={setLoaded}/>
            <VerticalDivider/>
            <Timeline remoteData={remoteData} applyData={applyData} setApplyData={setApplyData}
                      setRemoteData={setRemoteData}/>
            <VerticalDivider/>
            <NavBar/>
        </Box>
    );
}


function Panel({remoteData, applyData, setRemoteData, setApplyData, setLoaded}) {
    const theme = useTheme();
    const authData = useContext(authContext);

    return (
        <Box sx={{height: "100%", width: "380px", display: "flex", flexDirection: "column", flex: "none"}}>
            <Box sx={{height: "59px", display: "flex", alignItems: "center"}}>
                {
                    !applyData.isApplying &&
                    <Typography variant="h5" fontWeight="600" gutterBottom color={theme.palette.blue.dark}
                                sx={{paddingLeft: "10px", margin: "10px"}}>
                        Мои заявки
                    </Typography>
                }
                {
                    applyData.isApplying &&
                    <Typography variant="h5" fontWeight="600" gutterBottom color={theme.palette.blue.dark}
                                sx={{paddingLeft: "10px", margin: "10px"}}>
                        Подача заявки
                    </Typography>
                }
            </Box>
            <HorizontalDivider/>
            <Box sx={{height: "40px", display: "flex", alignItems: "center"}}>
                <Typography variant="body1" fontWeight="600" gutterBottom sx={{paddingLeft: "10px", margin: "10px"}}>
                    {authData.userData.surname + ' ' + authData.userData.name + ' ' + authData.userData.patronymic}
                </Typography>
            </Box>
            <HorizontalDivider/>
            <Box sx={{height: "40px", display: "flex", alignItems: "center"}}>
                <Typography variant="body1" fontWeight="600" gutterBottom sx={{paddingLeft: "10px", margin: "10px"}}>
                    Доступные дни для отпуска: {remoteData.daysLeft}
                </Typography>
            </Box>
            <HorizontalDivider/>
            <Box sx={{flex: "1"}}>
                {
                    applyData.isApplying &&
                    <ApplyingPanel remoteData={remoteData} applyData={applyData} setApplyData={setApplyData}
                                   setRemoteData={setRemoteData} setLoaded={setLoaded}/>
                }
                {
                    (!applyData.isApplying) &&
                    <DisplayPanel remoteData={remoteData} applyData={applyData} setApplyData={setApplyData}
                                  setRemoteData={setRemoteData} setLoaded={setLoaded}/>
                }
            </Box>
        </Box>
    );
}


