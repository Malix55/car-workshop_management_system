import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Divider, Grid, TextareaAutosize, TextField } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        width: '500px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function EditTimeOff(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title" style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}><Edit style={{ color: 'blue', width: '30px', height: '30px' }} />Edit</h2>
                        <Divider style={{ marginBottom: '20px' }} />
                        <Grid container spacing={3}>
                            <Grid item sm={6}>

                                <div style={{ display: 'flex' }}>
                                    <div style={{ marginTop: '-6px' }}><h4>Name: </h4></div> <TextField size='small' style={{ width: '100px' }} disabled variant="outlined" value={props.data.name}></TextField>
                                </div>
                            </Grid>
                            <Grid item sm={6}>
                                <div style={{ display: 'flex', marginLeft:'20px' }}>
                                    <div style={{ marginTop: '-8px' }}><h4 style={{ paddingBottom: '10px' }}>Leave Days: </h4></div> <TextField size='small' style={{ width: '100px' }} variant="outlined" value={props.data.offDays}></TextField>
                                </div>
                            </Grid>
                            <Grid item sm={12}>
                                {/* <div style={{ display: 'flex' }}> */}
                                    <b>Description:</b> <TextareaAutosize style={{ width: '100%', borderRadius: '5px', }} aria-label="minimum height" minRows={5} value={props.data.description} />
                                {/* </div> */}
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
