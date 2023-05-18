import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ErrorMsg() {
    return (
        <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="outlined" severity="error">
                Please fill these details before accessing the page.
            </Alert>
        </Stack>
    );
}
