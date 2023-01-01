import { Backdrop, Button, Divider, Fade, Grid, IconButton, makeStyles, Modal, TextareaAutosize, TextField } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { Button } from '@material-ui/core';
import ExpenseTableStyles from './ExpenseTableStyles';
import Image from '../../../Images/logo.png';
import { toast } from 'react-toastify';
import PostAddIcon from '@material-ui/icons/PostAdd';

// import { useHistory } from 'react-router-dom';
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

export default function ExpenseTable(props) {
    const classes1 = ExpenseTableStyles();

    const editHandler = (data) => {
        handleOpen()
        const expense = {
            name: data.name,
            cost: data.cost,
            description: data.description,
            expenseType: data.expenseType,
            quantity: data.quantity,
            id: data._id
        }
        console.log(data._id)
        props.setExpense(expense)
    }

    async function callApi() {
        var response1;
        try {
            response1 = await fetch('http://localhost:8000/api/auth/expense/update', {
                headers: {
                    'token': localStorage.token,
                    name: props.expense.name,
                    cost: props.expense.cost,
                    description: props.expense.description,
                    expenseType: props.expense.expenseType,
                    quantity: props.expense.quantity,
                    id: props.expense.id
                },
                method: 'PATCH'
            });
            console.log(response1)
        } catch (err) {
            console.log(err)
        }

        const parseRes1 = await response1.json();
        if (response1.message) {

            toast.success(parseRes1.message);
        }

        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/expense/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.expense)
            props.setRows(parseRes.expense);
            props.setData(parseRes.expense);

        }
        callApi();
        handleClose();

        // async function callApi2() {
        //     const response = await fetch('http://localhost:8000/api/auth/expense/', {
        //         headers: { token: localStorage.token }
        //     });

        //     const parseRes = await response.json();
        //     console.log(parseRes.expense)
        //     props.setRows(parseRes.expense);
        //     props.setData(parseRes.expense);

        // }
        // callApi2();

        // handleClose();
        console.log('im in')
    }
    //     const editHandler = async (data) => {
    // console.log('oim clicked')
    //     }
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const deleteHandler = async (name) => {
        try {
            console.log('dsfsfsfsf')
            const response = await fetch('http://localhost:8000/api/auth/expense/delete', {
                headers: {
                    'token': localStorage.token,
                    'name': name
                },
                method: 'DELETE'

            });

            const parseRes = await response.json();
            if (response.message) {

                toast.success(parseRes.message);
            }

            async function callApi() {
                const response = await fetch('http://localhost:8000/api/auth/expense/', {
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes.expense)
                props.setRows(parseRes.expense);
                props.setData(parseRes.expense);

            }
            callApi();

        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className={classes1.widgetlg}>
            <span onClick={handleOpen}>
                {props.component}
            </span>
            <TableContainer  style={{ border: '0px solid', marginTop: '100px', borderBottom: "none" }} >
                <Table className={classes1.table} aria-label="simple table" style={{ width: '100%', border: 'none', borderBottom: "none" }} >
                    <TableHead style={{ background: '#fafafa', border: '0px ', borderBottom: "none" }}>
                        <TableRow style={{ borderBottom: "none" }}>

                            {/* <TableCell width="1%" align="right"></TableCell> */}
                            <TableCell width="5%" align="Left" ><b>Name</b></TableCell>
                            <TableCell width="15%" align="left"><b>Detail</b></TableCell>
                            <TableCell width="5%" align="left"><b>Quantity</b></TableCell>
                            <TableCell width="5%" align="left"><b>Cost Per Piece</b></TableCell>
                            <TableCell width="5%" align="left"><b>Cost</b></TableCell>
                            <TableCell width="1%" align="center"><b>Manage</b></TableCell>
                            {/* <TableCell width="1%" align="right"></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ borderBottom: "none" }}>
                        {props.rows.map((row, index) => (
                            <TableRow key={row.id} id={row.id} style={{ borderBottom: "none" }}>
                                {/* <TableCell style={{ borderBottom: "none" }} component="th" width="1%" align="left" scope="row"> */}
                                    {/* <img id={`img${row.firstName}`} src={`http://localhost:8000/${row.image}`} alt={`pic of ${row.firstName}`} style={{ width: 60 }} /> */}
                                    {/* <img id={`img${row.name}`} src={Image} alt={`pic of ${row.name}`} style={{ width: 60, borderRadius: "50%" }} /> */}
                                {/* </TableCell> */}
                                {/* <TableCell width="10%" style={{ color: 'blue' }} component="th" scope="row" id={`id${row.id}`}>{index}</TableCell> */}
                                <TableCell width="5%" style={{ color: 'blue', borderBottom: "none" }} align="left" id={`fn${row.id}`}>{row.name}</TableCell>
                                <TableCell width="15%" style={{ borderBottom: "none", }} align="left" id={`fn${row.id}`}>{row.description}$</TableCell>
                                <TableCell width="5%" style={{ borderBottom: "none" }} align="left" id={`fn${row.id}`}>{row.quantity}</TableCell>
                                <TableCell width="5%" style={{ borderBottom: "none" }} align="left" id={`fn${row.id}`}>{row.cost}</TableCell>
                                <TableCell width="1%" style={{ borderBottom: "none", }} align="left" id={`fn${row.id}`}>{row.cost * row.quantity}$</TableCell>
                                {/* <TableCell width="1%" align="right" ><img id={`img${row.id}`} src={row.imageURL} alt={`profile pic of ${row.firstName}`} style={{ width: 60 }} /></TableCell> */}
                                <TableCell align="left" style={{ borderBottom: "none" }}>
                                    <div style={{ display: 'flex' }}>

                                        <IconButton style={{ color: 'skyblue' }} onClick={() => editHandler(row)}><Edit /></IconButton>
                                        <IconButton onClick={() => deleteHandler(row._id)} style={{ color: 'red' }}><Delete /></IconButton>
                                    </div>
                                </TableCell>
                                {/* <TableCell><IconButton onClick={()=>props.editTask(index)}><Edit/></IconButton></TableCell> */}
                            </TableRow >
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
                    <div className={classes.paper} style={{ borderRadius: '15px', border: 'none', width: '55vh' }}>
                        <h2 id="transition-modal-title" style={{}}><PostAddIcon style={{ color: 'rgb(32 60 130)', width: '40px', height: '40px' }} />Edit Expense</h2>
                        <Divider style={{ marginBottom: '20px' }} />
                        <Grid container spacing={3} >
                            {/* <Grid item sm={12}> */}
                            <Grid item sm={4}>
                                <div style={{ marginTop: '-12px', color: 'rgb(0,0,0,.7)' }}><h4>Expense Name : </h4></div>
                            </Grid>
                            <Grid item sm={8}>
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
                            <Grid item sm={4}>
                                <div style={{ marginTop: '-8px', color: 'rgb(0,0,0,.7)' }}><h4 style={{ paddingBottom: '10px' }}>Expense Type: </h4></div>
                            </Grid>
                            <Grid item sm={8}>
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
                            <Grid item sm={4}>
                                <div style={{ marginTop: '-12px', color: 'rgb(0,0,0,.7)' }}><h4>Quantity of Item: </h4></div>
                            </Grid>
                            <Grid item sm={8}>
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
                            <Grid item sm={4}>
                                <div style={{ marginTop: '-8px', color: 'rgb(0,0,0,.7)' }}><h4 style={{ paddingBottom: '10px' }}>Cost of Item : </h4></div>
                            </Grid>
                            <Grid item sm={8}>
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
                            <div style={{ display: 'relative', marginLeft: '45%', marginTop: '20px', width: '100%' }}>
                                <Button variant='contained' style={{ backgroundColor: 'rgb(32 60 130)', color: 'white' }} onClick={callApi}>Confirm</Button>
                                <Button variant='contained' style={{ marginLeft: '10px', backgroundColor: 'rgb(32 60 130)', color: 'white' }} onClick={handleClose}>Cancel</Button>
                            </div>
                        </Grid>

                    </div>
                </Fade>
            </Modal>

            {/* <Button className={classes.delButton} onClick={function (event) { props.deleteBtn(); history.push("/Signin") }} >Delete All</Button> */}
        </div>
    )
}
