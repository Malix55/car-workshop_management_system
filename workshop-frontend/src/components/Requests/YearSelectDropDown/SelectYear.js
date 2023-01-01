import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {  MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SelectYear() {
    const classes = useStyles();
    const [state, setState] = React.useState(1);

    const handleChange = (event) => {
        setState(
            event.target.value
        );
    };

    return (
        <div>

            <FormControl variant="outlined" className={classes.formControl}>
                {/* <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel> */}
                <Select
                    // labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={state.Year}
                    onChange={handleChange}
                    name="Year"


                    defaultValue={1}
                >
                    <MenuItem value={1}>2022</MenuItem>
                    <MenuItem value={2}>2023</MenuItem>
                    <MenuItem value={3}>2024</MenuItem>
                    <MenuItem value={4}>2025</MenuItem>
                </Select>
            </FormControl>

        </div>
    );
}
