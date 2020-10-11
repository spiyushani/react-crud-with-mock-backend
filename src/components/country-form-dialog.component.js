//React imports
import React from 'react';
//Lodash imports
import _ from "lodash/fp";
//Form imports
import {useForm} from "react-hook-form";
//Material UI imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const CountryFormDialog = (props) => {
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = data => {
        props.handleSubmit(data);
    };

    return (
        <Dialog fullWidth={true} open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add/Edit country </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        inputRef={register({required: true})}
                        name="id"
                        autoFocus
                        margin="dense"
                        id="id"
                        label="Id"
                        type="text"
                        fullWidth
                        defaultValue={props.selected.id}
                        disabled={!!props.selected.id}
                    />
                    {_.get("id.type", errors) === "required" && (
                        <p className="error">This field is required</p>
                    )}
                    <TextField
                        inputRef={register({required: true})}
                        name="name"
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        defaultValue={props.selected.name}
                    />
                    {_.get("name.type", errors) === "required" && (
                        <p className="error">This field is required</p>
                    )}
                    <TextField
                        inputRef={register({required: true})}
                        name="capital"
                        margin="dense"
                        id="capital"
                        label="Capital"
                        type="text"
                        fullWidth
                        defaultValue={props.selected.capital}
                    />
                    {_.get("capital.type", errors) === "required" && (
                        <p>This field is required</p>
                    )}
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Submit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CountryFormDialog;
