import { Snackbar } from "@mui/material";
import { useState } from "react";
import { api } from "util/api";


type TApiErrorProps = {
    children: React.ReactNode
}

export const ApiError = (props: TApiErrorProps) => {

    const [error, setError] = useState<string | null>(null)



    api.interceptors.response.use(
        response => {

            // Handle the response data as needed
            return response;
        },
        error => {
            // Log the error
            console.error('API Error:', error.response.data.errors);
            // You can also send the error to an error tracking service here
            setError(error.response.data.errors[0].name)

            // Set the snackbar message and open it

            // If you want to pass the error along without handling it here
            return Promise.reject(error);
        }
    );
    return (
        <>
            {props.children}
            <Snackbar
                open={error !== null}
                autoHideDuration={6000}
                onClose={() => setError(null)}
                message={error}
            />
        </>

    );
};