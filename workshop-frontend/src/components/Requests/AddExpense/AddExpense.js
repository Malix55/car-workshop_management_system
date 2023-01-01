import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Divider, Grid, TextareaAutosize, TextField } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        width: '5120px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function AddExpense(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function callApi() {
        var response;
        try {
            response = await fetch('http://localhost:8000/api/auth/expense/create', {
                method: 'POST',
                headers: { expense: JSON.stringify(props.expense), token: localStorage.token }
            });
        } catch (err) {
            console.log("aaa" + err);
        }
        const parseRes = await response.json();
        if (parseRes === "Expense Added") {
            toast.success("New Expense Added!");
        } else {

            toast.error(parseRes);
        }

        async function callApi2() {
            const response = await fetch('http://localhost:8000/api/auth/expense/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.expense)
            props.setRows(parseRes.expense);
            props.setData(parseRes.expense);

        }
        callApi2();

        handleClose();
        console.log('im in')
    }


    return (
        <div>
            <span onClick={handleOpen}>
                {props.component}
            </span>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper} style={{ borderRadius: '15px', border: 'none', width: '55vh' }}>
                        <h2 id="transition-modal-title" style={{}}><PostAddIcon style={{ color: 'rgb(32 60 130)', width: '40px', height: '40px' }} />Add Expense</h2>
                        <Divider style={{ marginBottom: '20px' }} />
                        <Grid container spacing={3} >
                            {/* <Grid item sm={12}> */}
                            <Grid item sm={5}>
                                <div style={{ marginTop: '-12px', color: 'rgb(0,0,0,.7)' }}><h4>Expense Name : </h4></div>
                            </Grid>
                            <Grid item sm={7}>
                                <TextField
                                    size='small'
                                    style={{ width: '100%' }}
                                    variant="outlined"
                                    name="name"
                                    value={props.expense.name}
                                    onChange={props.handleChange}
                                >

                                </TextField>
                            </Grid>
                            {/* </Grid> */}
                            <Grid item sm={5}>
                                <div style={{ marginTop: '-8px', color: 'rgb(0,0,0,.7)' }}><h4 style={{ paddingBottom: '10px' }}>Expense Type: </h4></div>
                            </Grid>
                            <Grid item sm={7}>
                                <TextField
                                    value={props.expense.expenseType}
                                    name="expenseType"
                                    onChange={props.handleChange}
                                    size='small'
                                    style={{ width: '100%' }}
                                    variant="outlined"
                                >

                                </TextField>
                            </Grid>
                            <Grid item sm={5}>
                                <div style={{ marginTop: '-12px', color: 'rgb(0,0,0,.7)' }}><h4>Quantity of Item: </h4></div>
                            </Grid>
                            <Grid item sm={7}>
                                <TextField
                                    value={props.expense.quantity}
                                    name="quantity"
                                    onChange={props.handleChange}
                                    size='small'
                                    style={{ width: '100%' }}
                                    variant="outlined"
                                >

                                </TextField>
                            </Grid>
                            <Grid item sm={5}>
                                <div style={{ marginTop: '-8px', color: 'rgb(0,0,0,.7)' }}><h4 style={{ paddingBottom: '10px' }}>Cost of Item : </h4></div>
                            </Grid>
                            <Grid item sm={7}>
                                <TextField
                                    value={props.expense.cost}
                                    name="cost"
                                    onChange={props.handleChange}
                                    size='small'
                                    style={{ width: '100%' }}
                                    variant="outlined"
                                >

                                </TextField>
                            </Grid>
                            <Grid item sm={12}>
                                {/* <div style={{ display: 'flex' }}> */}
                                <b style={{ color: 'rgb(0,0,0,.7)' }}>Expense Description:</b>
                                <TextareaAutosize
                                    value={props.expense.description}
                                    name="description"
                                    onChange={props.handleChange}
                                    style={{ width: '100%', borderRadius: '5px', }}
                                    aria-label="minimum height"
                                    minRows={5}
                                />
                                {/* </div> */}
                            </Grid>
                            <div style={{ display:'relative', marginLeft: '40%', marginTop: '20px', width: '100%' }}>
                            <Button variant='contained' style={{ backgroundColor: 'rgb(32 60 130)', color: 'white' }} onClick={callApi}>Add Expense</Button>
                            <Button variant='contained' style={{ marginLeft: '10px', backgroundColor: 'rgb(32 60 130)', color: 'white' }} onClick={handleClose}>Cancel</Button>
                        </div>
                        </Grid>
                        
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
