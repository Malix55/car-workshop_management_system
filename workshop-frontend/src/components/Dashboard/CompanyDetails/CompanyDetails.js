import { Backdrop, Button, Fade, Grid, IconButton, makeStyles, Modal, Table, TableBody, TableCell, TableContainer, TableRow, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import React, { useEffect, useState } from 'react'
import Add from '@material-ui/icons/Add';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[2],
        // width:'50%',
        padding: theme.spacing(6, 2, 4),
    },
}));

export default function CompanyDetails() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [event, setEvent] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const submitHandler = async () => {
        console.log(event)
        var response;
        try {
            response = await fetch('http://localhost:8000/api/auth/event/create', {
                method: 'POST',
                headers: { event: JSON.stringify(event), token: localStorage.token }
            });
        } catch (err) {
            console.log("aaa" + err);
        }
        const parseRes = await response.json();
        if (parseRes.message) {
            toast.success("New Expense Added!");
        } else {
            toast.error(parseRes);
        }

        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/event/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log('hereeererererererer')
            console.log(parseRes)
            setRows(parseRes.event);
            // setData(parseRes.event);
            // console.log(data)
        }
        callApi();
        handleClose()
    }


    const [check, setCheck] = useState(false)
    const [rows, setRows] = useState([]);
    // const [data, setData] = useState([]);

    useEffect(() => {
        console.log('adsdadadadad')
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/event/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log('hereeererererererer')
            console.log(parseRes)
            setRows(parseRes.event);
            // setData(parseRes.event);
            // console.log(data)
        }
        callApi();
    }, [])


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Typography
                        noWrap
                    // variant='h6'
                    >
                        Company Events
                    </Typography>
                </div>
                <div>
                    <IconButton onClick={handleOpen} style={{ width: '25px', height: '25px', marginRight: '10px' }}>{<Add style={{ color: '#6792ef' }} />}</IconButton>
                    <IconButton style={{ width: '25px', height: '25px' }}>{<SettingsBackupRestoreIcon style={{ color: '#6792ef' }} />}</IconButton>
                </div>
            </div>

            {!check &&
                <div style={{ justifyContent: 'center', marginBlockStart: '10%', alignItems: 'center', textAlign: 'center' }}>
                    <EventBusyIcon style={{ color: 'rgba(4, 197, 232, .3)', width: '70px', height: '70px' }} />
                    <p style={{ color: 'darkgray' }}>No Upcoming Events</p>
                </div>
            }


            <TableContainer style={{ border: '0px solid', marginTop: '30px', borderBottom: "none" }}>
                <Table className={classes.table} style={{ width: '100%', border: 'none', borderBottom: "none" }} aria-label="simple table">
                    {/* <TableHead style={{ border: '1px dotted rgb(55,55,200, .2) ', borderBottom: "none" }}> */}
                    {/* <hr style={{opacity:'.1'}}></hr> */}
                    {check && <TableRow style={{ borderBottom: "none" }}>
                        {/* <TableCell width={'5%'} style={{  }}><b>Id</b></TableCell> */}
                        <TableCell align="left" style={{}} width={'50%'}><b>Event</b></TableCell>
                        <TableCell align="left" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}><b>Description</b></TableCell>

                    </TableRow>}
                    {/* </TableHead> */}
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.firstName} style={{ borderBottom: "none", }}>
                                {!check && setCheck(true)}
                                {/* <TableCell style={{ borderBottom: "none" }} component="th" scope="row">{index}</TableCell> */}
                                <TableCell align="left" style={{ borderBottom: "none", color: 'darkgray' }}>
                                    {/* <IconButton>
                                        <img id={`img${row.image}`} src={`http://localhost:8000/${row.image}`} alt={`pic of ${row.image}`} style={{ width: 30, height: 30, borderRadius: '50%' }} />
                                    </IconButton> */}
                                    {row.name}
                                </TableCell>
                                {/* <TableCell align="left" style={{ borderBottom: "none" }}>{row.idNumber}</TableCell>
                                <TableCell align="left" style={{ borderBottom: "none" }}>{row.operationalArea}</TableCell>
                                <TableCell width={1} align="left" style={{ cursor: 'pointer', borderBottom: "none" }} ><IconButton ><EditIcon style={{ color: '#00dff1' }} /></IconButton></TableCell> */}
                                <TableCell align="left" style={{ borderBottom: "none", color: 'darkgray' }} >
                                    {row.description}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
                    <div className={classes.paper} style={{ borderRadius: '5px', maxWidth: '600px' }}>
                        <Typography variant='h5' style={{ color: '#6792ef', marginBottom: '20px', justifyContent: 'center', display: 'flex' }}>
                            Add Upcoming Events
                        </Typography>
                        <div style={{ display: 'inline-flex', paddingInline: '60px' }}>
                            <Grid container >
                                <Grid item xs={12} style={{ display: 'grid' }}>
                                    <label className="labels" style={{ marginBlockEnd: '5px' }} >
                                        Event Name
                                    </label>
                                    <TextField name="name" size="small" variant="outlined" type="text" placeholder="Event Name" value={event.name} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={5} style={{ display: 'grid' }}>
                                    <label className="labels" style={{ marginBlockStart: '15px', marginBlockEnd: '5px' }}>
                                        Start Date
                                    </label>
                                    <TextField size="small" variant="outlined" type="Date" placeholder="Enter Date" name="startDate" value={event.startDate} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={5} style={{ display: 'grid', marginLeft: '16%' }}>
                                    <label className="labels" style={{ marginBlockStart: '15px', marginBlockEnd: '5px' }}>
                                        End Date
                                    </label>
                                    <TextField name="endDate" size="small" variant="outlined" type="Date" placeholder="Enter Date" value={event.endDate} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} style={{ display: 'grid', marginBlockStart: '15px', }}>
                                    <label className="labels" style={{ marginBlockEnd: '5px' }}>
                                        Description
                                    </label>
                                    <TextareaAutosize name="description" rows={5} size="small" variant="outlined" value={event.description} onChange={handleChange} placeholder="Description" />
                                </Grid>
                                <Grid item xs={12} style={{ marginTop: '10px', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                    <Button variant='outlined' color='primary' onClick={submitHandler} style={{ width: '150px' }}>Submit</Button>
                                </Grid>
                            </Grid>
                            {/* <Grid container >
                                <Grid item xs={5} style={{ display: 'grid' }}><label className="labels" style={{ marginBlockStart: '15px', marginBlockEnd: '5px' }}>Address</label><TextField size="small" name="address" variant="outlined" type="text" className="form-control" placeholder="Enter Address" value={formik.values.address} onChange={formik.handleChange} /></Grid>
                                <Grid item xs={5} style={{ display: 'grid', marginLeft: '16%' }}><label className="labels" style={{ marginBlockStart: '15px', marginBlockEnd: '5px' }}>Designation</label><TextField size="small" name="operationalArea" variant="outlined" type="text" className="form-control" placeholder="Enter Operational Area" value={formik.values.operationalArea} onChange={formik.handleChange} /></Grid>
                            </Grid> */}
                            {/* <Grid container >
                                <Grid item xs={5} style={{ display: 'grid' }}><label className="labels" style={{ marginBlockStart: '15px', marginBlockEnd: '5px' }}>ID Number</label><TextField size="small" name="idNumber" variant="outlined" type="text" className="form-control" placeholder="Enter ID Number" value={formik.values.idNumber} onChange={formik.handleChange} /></Grid>
                                <Grid item xs={5} style={{ display: 'grid', marginLeft: '16%' }}><label className="labels" style={{ marginBlockStart: '15px', marginBlockEnd: '5px' }}>Education</label><TextField size="small" name="education" variant="outlined" type="text" className="form-control" placeholder="Education" value={formik.values.education} onChange={formik.handleChange} /></Grid>
                            </Grid> */}

                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
