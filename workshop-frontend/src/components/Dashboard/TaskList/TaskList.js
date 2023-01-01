import { Backdrop, Fade, IconButton, makeStyles, Modal, Table, TableBody, TableCell, TableContainer, TableRow, TextareaAutosize, Typography } from '@material-ui/core';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import Add from '@material-ui/icons/Add';
import React, { Fragment, useEffect, useState } from 'react'

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


export default function TaskList() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const [tasks, setTasks] = useState([])
    const [client, setClient] = useState([])

    const [check, setCheck] = useState(false)

    useEffect(() => {
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/tasks/', {
                headers: { token: localStorage.token },
            });

            const parseRes = await response.json();
            console.log('sssssssssssssssssssssssssss')
            console.log(parseRes)



            setClient(parseRes.client);
            console.log(parseRes.client);
            setTasks(parseRes.task);
            // setData(parseRes.staff);

        }

        callApi();

        console.log('asdadasdasdaijdajdioajoifajdioa')
    }, [])
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa')
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa')
    console.log(tasks)
    console.log('ccccccccccccc')
    console.log(client)

    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Typography
                        noWrap
                    // variant='h6'
                    >
                        Pending Tasks
                    </Typography>
                </div>
                <div>
                    <IconButton style={{ width: '25px', height: '25px', marginRight: '10px' }}>{<Add style={{ color: 'gray' }} />}</IconButton>
                    <IconButton style={{ width: '25px', height: '25px' }}>{<SettingsBackupRestoreIcon style={{ color: '#6792ef' }} />}</IconButton>
                </div>
            </div>

            {
                !check &&
                <div style={{ justifyContent: 'center', marginBlockStart: '10%', alignItems: 'center', textAlign: 'center' }}>
                    <AllInboxIcon style={{ color: 'rgba(4, 197, 232, .3)', width: '70px', height: '70px' }} />
                    <p style={{ color: 'darkgray' }}>No Pending Tasks</p>
                </div>
            }

            <TableContainer style={{ border: '0px solid', marginTop: '30px', height: '29vh', borderBottom: "none" }}>
                <Table className={classes.table} aria-label="simple table" style={{ width: '100%', border: 'none', borderBottom: "none" }} >
                    {/* <TableHead style={{ background: '#fafafa', border: '0px ', borderBottom: "none" }}> */}
                    {check &&
                        <TableRow style={{ borderBottom: "none" }}>
                            <TableCell align="left" ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name</b></TableCell>
                            <TableCell align="center" ><b>Due Date</b></TableCell>

                        </TableRow>
                    }
                    {/* </TableHead> */}
                    <TableBody>
                        {tasks.map((row, index) => (
                            <Fragment>
                                {console.log(row)}
                                {row.status === 'pending' &&
                                    <TableRow key={client[index].firstName + client[index].lastName} style={{ color: '#80a4f1' }}>
                                        {!check && setCheck(true)}
                                        <TableCell align="left" style={{ borderBottom: "none" }}>
                                            <div style={{ color: 'darkgray' }}>&nbsp;&nbsp;&nbsp;&nbsp;{client[index].firstName}</div>
                                        </TableCell>
                                        <TableCell align="center" style={{ borderBottom: "none", color: 'darkgray' }}>{row.date}</TableCell>

                                    </TableRow>
                                }
                            </Fragment>
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
                    <div className={classes.paper}>
                        <Typography variant='h5' style={{ color: '#6792ef', marginBottom: '20px', justifyContent: 'center', display: 'flex' }}>
                            Add New Task
                        </Typography>
                        <div style={{ display: 'inline-flex', paddingInline: '60px' }}>
                            <TextareaAutosize minRows={4} style={{ minWidth: '400px' }} />
                            {/* <Button style={{marginBlockEnd:'60px'}}>Add</Button> */}
                            <IconButton style={{ width: '50px', marginLeft: '20px', height: '50px', marginBlockEnd: '60px' }}>{<Add width='50' style={{ color: '#6792ef', fontSize: '60px' }} />}</IconButton>
                        </div>
                    </div>
                </Fade>
            </Modal>

        </div >
    )
}
