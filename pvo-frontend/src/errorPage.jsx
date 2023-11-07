import {useRouteError} from "react-router-dom";
import {Container, Typography} from "@mui/material";

export default function ErrorPage() {

    const error = useRouteError();
    console.error(error);

    return (
        <Container maxWidth="xs" sx={{mt: 2}}>
            <Typography variant="h5" component="h1" gutterBottom>
                Oops!
            </Typography>
            <Typography variant="p" component="p" gutterBottom>
                Sorry, an unexpected error has occurred.
            </Typography>
            <Typography variant="p" component="p" gutterBottom>
                <i>{error.statusText || error.message}</i>
            </Typography>
        </Container>
    );
}