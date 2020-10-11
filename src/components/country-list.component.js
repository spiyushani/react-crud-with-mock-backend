//React imports
import React, {useEffect, useState} from "react";
//Material UI imports
import Button from "@material-ui/core/Button";
//Local imports
import {createCountry, getAllCountries, removeCountry, updateCountry} from "../services/country-http.service";
import CountryFormDialog from "./country-form-dialog.component";
import {CountryTable} from "./country-table.component";
import {AlertBar} from "./alert-bar.component";

const CountryList = () => {
    const [rows, setRows] = useState([]);
    const [alertMeta, setAlertMeta] = useState({severity: '', message: ''});
    const [isCountryListManipulated, setCountryListManipulated] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [selected, setSelected] = useState({id: '', name: '', capital: ''});

    useEffect(() => {
        getAllCountries().then(res => setRows(res.data));
    }, []);

    useEffect(() => {
        if (isCountryListManipulated) {
            getAllCountries().then(res => setRows(res.data));
        }
        setCountryListManipulated(false);
    }, [isCountryListManipulated]);

    const add = (data) => {
        createCountry(data)
            .then(() => {
                showAlert("success", "Create success");
                closeDialog();
            })
            .catch(() => showAlert("error", "Create failed"));
    };

    const showAlert = (severity, message) => {
        setCountryListManipulated(true);
        setAlertMeta({severity, message});
        setAlertOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelected({id: '', name: '', capital: ''});
    };

    const edit = (data) => {
        data.id = selected.id;
        updateCountry(data.id, data)
            .then(() => {
                showAlert("success", "Update success");
                closeDialog();
            })
            .catch(() => showAlert("error", "Update failed"));
    };

    const remove = (row) => {
        removeCountry(row.id)
            .then(() => showAlert("success", "Delete success"))
            .catch(() => showAlert("error", "Delete failed"));
    };

    const openCreateDialog = () => {
        openCountryFormDialog({id: '', name: '', capital: ''});
    };

    const openEditDialog = (row) => {
        openCountryFormDialog(row);
    };

    const openCountryFormDialog = (row) => {
        setDialogOpen(true);
        setSelected(row);
    };

    const handleSubmit = (country) => {
        if (selected.id) {
            edit(country);
        } else {
            add(country);
        }
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    return (
        <div>
            <AlertBar open={isAlertOpen} onClose={handleAlertClose} alertMeta={alertMeta}/>
            <Button variant="outlined" color="primary" onClick={openCreateDialog}>Add new</Button>
            <CountryFormDialog open={isDialogOpen} handleClose={closeDialog} handleSubmit={handleSubmit}
                               selected={selected}/>
            <CountryTable rows={rows} onDelete={remove} openEditModal={openEditDialog}/>
        </div>
    );
};

export default CountryList;
