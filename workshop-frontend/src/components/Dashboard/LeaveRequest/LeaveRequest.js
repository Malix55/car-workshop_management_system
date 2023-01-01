import { Backdrop, Fade, IconButton, makeStyles, Modal, Table, TableBody, TableCell, TableContainer,  TableRow, TextareaAutosize, Typography } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import DraftsIcon from '@material-ui/icons/Drafts';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import React, { useEffect, useState } from 'react'

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

export default function LeaveRequest() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const [rows, setRows] = useState([]);
    // const [data, setData] = useState([]);


    useEffect(() => {
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/staff/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.staff)
            setRows(parseRes.staff);
            // setData(parseRes.staff);

        }
        callApi();
    }, [])

    const [check, setCheck] = useState(false);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Typography
                        noWrap
                    // variant='h6'
                    >
                        On Leave
                    </Typography>
                </div>
                <div>
                    <IconButton  style={{ width: '25px', height: '25px', marginRight: '10px' }}>{<Add style={{ color: 'gray' }} />}</IconButton>
                    <IconButton style={{ width: '25px', height: '25px' }}>{<SettingsBackupRestoreIcon style={{ color: '#6792ef' }} />}</IconButton>
                </div>
            </div>

            {!check &&
                <div style={{ justifyContent: 'center', marginTop: '5&', alignItems: 'center', textAlign: 'center' }}>
                    <DraftsIcon style={{ color: 'rgba(4, 197, 232, .3)', width: '70px', height: '70px' }} />
                    <p style={{ color: 'darkgray' }}>No Pending Leave Requests</p>
                </div>
            }
            <div style={{}}>
                <TableContainer style={{ border: '0px solid', marginTop: '10px', borderBottom: "none", overflowY: 'hidden', height: '200px' }} >
                    <Table className={classes.table} aria-label="simple table" style={{ width: '100%', border: 'none', borderBottom: "none" }} >
                        {check && <TableRow style={{ borderBottom: "none" }}>
                            {/* <TableCell width={'5%'} style={{  }}><b>Id</b></TableCell> */}
                            <TableCell align="left" style={{}} width={'50%'}><b>Name</b></TableCell>
                            <TableCell align="left" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}><b>No. Leaves</b></TableCell>

                        </TableRow>}
                        <TableBody style={{ borderBottom: "none", }}>
                            {rows.map((row, index) => (
                                <TableRow key={row.id} id={row.id} style={{ borderBottom: "none" }}>
                                    {!check && setCheck(true)}

                                    {/* <TableCell width="10%" style={{ color: 'blue' }} component="th" scope="row" id={`id${row.id}`}>{index}</TableCell> */}
                                    <TableCell width="10%" style={{ borderBottom: "none", color: 'darkgray' }} align="left" id={`fn${row.id}`}>{row.firstName + " " + row.lastName}</TableCell>
                                    <TableCell width="10%" style={{ borderBottom: "none", color: 'darkgray' }} align="left" id={`fn${row.id}`}>{row.timeoffLeaves}</TableCell>
                                    {/* <TableCell width="10%" style={{ borderBottom: "none" }} align="left" id={`fn${row.id}`}>{row.timeoffDescription}</TableCell> */}
                                    {/* <TableCell width="1%" style={{ borderBottom: "none", color: 'blue', }} align="left" id={`fn${row.id}`}>{row.status}</TableCell> */}
                                    {/* <TableCell width="10%" style={{ borderBottom: "none" }} align="left" id={`fn${row.id}`}><ProgressBar progress={row.timeoffCompleted} /></TableCell> */}
                                    {/* <TableCell width="1%" align="right" ><img id={`img${row.id}`} src={row.imageURL} alt={`profile pic of ${row.firstName}`} style={{ width: 60 }} /></TableCell> */}

                                    {/* <TableCell><IconButton onClick={()=>props.editTask(index)}><Edit/></IconButton></TableCell> */}
                                </TableRow >
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>
            </div>
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
                        <Typography variant='h5' style={{ color: '#6792ef', marginBottom: '20px', justifyContent: 'center', display: 'flex' }}>
                            Add New Leave
                        </Typography>
                        <div style={{ display: 'inline-flex', paddingInline: '60px' }}>
                            <TextareaAutosize minRows={4} style={{ minWidth: '400px' }} />
                            {/* <Button style={{marginBlockEnd:'60px'}}>Add</Button> */}
                            <IconButton style={{ width: '50px', marginLeft: '20px', height: '50px', marginBlockEnd: '60px' }}>{<Add width='50' style={{ color: '#6792ef', fontSize: '60px' }} />}</IconButton>
                        </div>
                    </div>
                </Fade>
            </Modal>

        </div>
    )
}
