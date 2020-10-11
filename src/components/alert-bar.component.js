//React imports
import React from "react";
//Material UI imports
import Alert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";

export const AlertBar = (props) => {
    return (
        <Snackbar anchorOrigin={{vertical: "top", horizontal: "right"}} open={props.open}
                  autoHideDuration={6000} onClose={props.onClose}>
            <Alert variant="filled" severity={props.alertMeta.severity} onClose={props.onClose}>
                {props.alertMeta.message}
            </Alert>
        </Snackbar>
    );
};
