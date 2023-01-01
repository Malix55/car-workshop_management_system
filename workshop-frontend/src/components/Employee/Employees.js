import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Box, Button, FormControl, IconButton, Menu, MenuItem, Modal, Select } from "@material-ui/core";
import AddEmployees from "../AddEmployees/AddEmployees";
import './Employees.css';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const useStyles = makeStyles((theme) => ({
    // table: {
    //     minWidth: 650
    // },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
        marginLeft: '10px',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function Employees() {
    const [current, setCurrent] = useState('');

    const ITEM_HEIGHT = 48;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl(null);
    };




    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = (e) => {
        console.log(e)
        setEmployee(e);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        operationalArea: '',
        phoneNumber: '',
        idNumber: '',
        education: '',
        country: '',
        state: '',
        experience: '',
        skills: '',
        additionalDetails: '',
        creator: '',
        image: '',
        longitude: '',
        latitude: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/staff/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.staff)
            setRows(parseRes.staff);
            setData(parseRes.staff);

        }

        refresh && callApi();
        refresh && setRefresh(false);
    }, [refresh])

    const updateHandler = async (e) => {
        e.preventDefault()

        // handleClose();
        try {
            const response1 = await fetch('http://localhost:8000/api/auth/staff/update', {
                headers: {
                    'token': localStorage.token,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email,
                    address: employee.address,
                    operationalArea: employee.operationalArea,
                    phoneNumber: employee.phoneNumber,
                    idNumber: employee.idNumber,
                    education: employee.education,
                    country: employee.country,
                    state: employee.state,
                    experience: employee.experience,
                    skills: employee.skills,
                    additionalDetails: employee.additionalDetails,
                    creator: employee.creator,
                    image: employee.image,
                    longitude: employee.longitude,
                    latitude: employee.latitude,
                    id: employee.id
                },
                method: 'PATCH'
            });
            console.log(response1)
        } catch (err) {
            console.log(err)
        }


        console.log('enddd')
        var response;
        async function callApi() {
            response = await fetch('http://localhost:8000/api/auth/staff/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.staff)
            setRows(parseRes.staff);
            setData(parseRes.staff);

        }
        callApi();

        const parseRes = await response.json();
        console.log(parseRes.staff)
        setRows(parseRes.staff);
        setData(parseRes.staff);

        // console.log(employee)
    }

    const [searched, setSearched] = useState("");
    const classes = useStyles();

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const deleteHandler = async (email) => {
        try {
            console.log('dsfsfsfsf')
            const response = await fetch('http://localhost:8000/api/auth/staff/delete', {
                headers: {
                    'token': localStorage.token,
                    'email': email
                },
                method: 'DELETE'

            });
            console.log(response)
        } catch (err) {
            console.log(err);
        }

        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/staff/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.staff)
            setRows(parseRes.staff);
            setData(parseRes.staff);

        }
        callApi();
    }

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const [type, setType] = useState('');
    const [state, setState] = React.useState('All');

    const handleChange1 = (event) => {
        setState(
            event.target.value
        );
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <SearchBar
                    style={{ width: '15%', borderRadius: '15px', height: '37px', border: '1px solid lightgray' }}
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                    {/* <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel> */}
                    <Select
                        // labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={state}
                        onChange={handleChange1}
                        name="Year"
                        style={{ height: '37px', border: '1px solid lightgray' }}

                        defaultValue={'All'}
                    >
                        <MenuItem value={'Mech'}>Mech</MenuItem>
                        <MenuItem value={'Elct Fitt'}>Elct Fitt</MenuItem>
                        <MenuItem value={'Engine Exp'}>Engine Exp</MenuItem>
                        <MenuItem value={'Ortx'}>Ortx</MenuItem>
                        <MenuItem value={'All'}>All</MenuItem>
                    </Select>
                </FormControl>
                <Button style={{ marginLeft: '66%' }} variant="outlined" size="medium" onClick={() => { setType('Add'); handleOpen(current) }}>Add Employee</Button>
            </div>
            <TableContainer style={{ border: '0px solid', marginTop: '30px', borderBottom: "none" }}>
                <Table className={classes.table} aria-label="simple table" style={{ width: '100%', border: 'none', borderBottom: "none" }} >
                    <TableHead style={{ background: '#fafafa', border: '0px ', borderBottom: "none" }}>
                        <TableRow style={{ borderBottom: "none" }}>
                            <TableCell ><b>Id</b></TableCell>
                            <TableCell align="left" ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name</b></TableCell>
                            <TableCell align="left" ><b>Contact</b></TableCell>
                            <TableCell align="left" ><b>Designation</b></TableCell>
                            <TableCell align="left" ><b>Checked In</b></TableCell>
                            {/* <TableCell align="left" ><b>Area</b></TableCell> */}
                            <TableCell align="left" width={'25%'} style={{ textAlign: 'end', paddingRight: '5%' }}><b>Actions</b></TableCell>
                            {/* <TableCell align="left"></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <Fragment>
                                {(state === 'All') &&
                                    <TableRow key={row.firstName} style={{ color: '#80a4f1' }}>
                                        <TableCell style={{ borderBottom: "none" }} component="th" scope="row">{index}</TableCell>
                                        <TableCell align="left" style={{ color: '#80a7e0', borderBottom: "none" }}> <IconButton><img id={`img${row.image}`} src={`http://localhost:8000/${row.image}`} alt={`pic of ${row.image}`} style={{ width: 50, height: 50, borderRadius: '50%' }} /></IconButton>{row.firstName + " " + row.lastName}</TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>
                                            <div >
                                                {row.phoneNumber}<br></br>
                                                <div style={{ color: 'darkgray' }}>{row.email}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>{row.designation}</TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>{row.checkedIn}</TableCell>
                                        {/* <TableCell align="left" style={{ color: '#80a4f1', borderBottom: "none" }}>{row.operationalArea}</TableCell> */}
                                        {/* <TableCell width={1} align="left" style={{ justifyContent:'end', alignItems:'end',textAlign:'end',  cursor: 'pointer',paddingRight:'5%', borderBottom: "none" }} onClick={() => handleOpen(row)}><div style={{display:'inline-flex'}}></div></TableCell> */}
                                        <TableCell width={1} align="left" style={{ justifyContent: 'end', alignItems: 'end', textAlign: 'end', cursor: 'pointer', paddingRight: '5%', borderBottom: "none" }}>
                                            {console.log(row.firstName)}
                                            <div>
                                                <IconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={(e) => { handleClick(e); setCurrent(row) }}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    style={{ marginLeft: '-155px', marginTop: '20px', }}
                                                    id="long-menu"
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={open1}
                                                    onClose={handleClose1}
                                                    PaperProps={{
                                                        style: {
                                                            maxHeight: ITEM_HEIGHT * 4.5,
                                                            width: '20ch',
                                                            boxShadow: '1px 0px 5px 6px rgba(0,0,0,0.03)',
                                                        },
                                                    }}
                                                >
                                                    {/* {options.map((option) => ( */}
                                                    <MenuItem style={{ marginBottom: '-10px' }} onClick={() => { handleClose1(); deleteHandler(current.email) }}>
                                                        <DeleteIcon style={{ width: '20px', color: 'red', cursor: 'pointer' }} />&nbsp;&nbsp;<p style={{ fontSize: '12px', color: 'blue' }}> Delete</p>
                                                    </MenuItem>
                                                    <hr style={{ marginInline: '20px', opacity: '.3' }}></hr>
                                                    <MenuItem style={{ marginTop: '-10px' }} onClick={() => { setType('Edit'); handleClose1(); handleOpen(current) }} >
                                                        <EditIcon style={{ width: '20px', color: '#00dff1', }} />&nbsp;&nbsp;<p style={{ fontSize: '12px', color: 'blue' }}>Edit</p>
                                                    </MenuItem>
                                                </Menu>
                                            </div>

                                        </TableCell>

                                    </TableRow>
                                }
                                {(state === row.designation) &&
                                    <TableRow key={row.firstName} style={{ color: '#80a4f1' }}>
                                        <TableCell style={{ borderBottom: "none" }} component="th" scope="row">{index}</TableCell>
                                        <TableCell align="left" style={{ color: '#80a7e0', borderBottom: "none" }}> <IconButton><img id={`img${row.image}`} src={`http://localhost:8000/${row.image}`} alt={`pic of ${row.image}`} style={{ width: 50, height: 50, borderRadius: '50%' }} /></IconButton>{row.firstName + " " + row.lastName}</TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>
                                            <div >
                                                {row.phoneNumber}<br></br>
                                                <div style={{ color: 'darkgray' }}>{row.email}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>{row.designation}</TableCell>
                                        {/* <TableCell align="left" style={{ color: '#80a4f1', borderBottom: "none" }}>{row.operationalArea}</TableCell> */}
                                        {/* <TableCell width={1} align="left" style={{ justifyContent:'end', alignItems:'end',textAlign:'end',  cursor: 'pointer',paddingRight:'5%', borderBottom: "none" }} onClick={() => handleOpen(row)}><div style={{display:'inline-flex'}}></div></TableCell> */}
                                        <TableCell width={1} align="left" style={{ justifyContent: 'end', alignItems: 'end', textAlign: 'end', cursor: 'pointer', paddingRight: '5%', borderBottom: "none" }}>
                                            {console.log(row.firstName)}
                                            <div>
                                                <IconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={(e) => { handleClick(e); setCurrent(row) }}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    style={{ marginLeft: '-155px', marginTop: '20px', }}
                                                    id="long-menu"
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={open1}
                                                    onClose={handleClose1}
                                                    PaperProps={{
                                                        style: {
                                                            maxHeight: ITEM_HEIGHT * 4.5,
                                                            width: '20ch',
                                                            boxShadow: '1px 0px 5px 6px rgba(0,0,0,0.03)',
                                                        },
                                                    }}
                                                >
                                                    {/* {options.map((option) => ( */}
                                                    <MenuItem style={{ marginBottom: '-10px' }} onClick={() => { handleClose1(); deleteHandler(current.email) }}>
                                                        <DeleteIcon style={{ width: '20px', color: 'red', cursor: 'pointer' }} />&nbsp;&nbsp;<p style={{ fontSize: '12px', color: 'blue' }}> Delete</p>
                                                    </MenuItem>
                                                    <hr style={{ marginInline: '20px', opacity: '.3' }}></hr>
                                                    <MenuItem style={{ marginTop: '-10px' }} onClick={() => { handleClose1(); handleOpen(current) }} >
                                                        <EditIcon style={{ width: '20px', color: '#00dff1', }} />&nbsp;&nbsp;<p style={{ fontSize: '12px', color: 'blue' }}>Edit</p>
                                                    </MenuItem>
                                                </Menu>
                                            </div>

                                        </TableCell>

                                    </TableRow>
                                }
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-additionalDetails"
                >
                    <Box sx={style}>

                        {(type === "Edit") ?
                            <div class="testbox">
                                <form className="formUpdate" onSubmit={updateHandler}>
                                    <div class="banner">
                                        <h1 style={{ color: '#ffff' }}>Update Employee Details</h1>
                                    </div>
                                    <br />
                                    <fieldset>
                                        <legend>Personale Details</legend>
                                        <div class="colums">
                                            <div class="item">
                                                <label for="firstName">First Name<span>*</span></label>
                                                <input id="firstName" type="text" name="firstName" value={employee.firstName} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="lastName"> Last Name<span>*</span></label>
                                                <input id="lastName" type="text" name="lastName" value={employee.lastName} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="address">Email Address<span>*</span></label>
                                                <input id="address" type="text" name="email" value={employee.email} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="phoneNumber">phone Number</label>
                                                <input id="phoneNumber" type="tel" name="phoneNumber" value={employee.phoneNumber} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="address">House Address</label>
                                                <input id="address" type="text" name="address" value={employee.address} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="state">state</label>
                                                <input id="state" type="text" name="state" value={employee.state} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="idNumber">CNIC</label>
                                                <input id="idNumber" type="text" name="idNumber" value={employee.state} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="country">Country</label>
                                                <input id="country" type="text" name="country" value={employee.country} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <br />
                                    <fieldset>
                                        <legend>Other Details</legend>
                                        <div class="colums">
                                        </div>

                                        <div class="item">
                                            <label for="experience">Experience<span>*</span></label>
                                            <input id="experience" type="text" name="experience" value={employee.experience} onChange={handleChange} />
                                        </div>
                                        <div class="item">
                                            <label for="skills">Skills</label>
                                            <input id="skills" type="text" name="skills" value={employee.skills} onChange={handleChange} />
                                        </div>
                                        <div class="item">
                                            <label for="additionalDetails">additionalDetails</label>
                                            <textarea id="additionalDetails" name="additionalDetails" rows="3" value={employee.additionalDetails} onChange={handleChange}></textarea>
                                        </div>
                                    </fieldset>
                                    <div class="btn-block">
                                        <button type="submit" className="buttonC" onClick={(e) => { handleClose(); updateHandler(e); }}>Confirm Changes</button>
                                    </div>
                                </form>
                            </div>
                            :
                            <div className="full-top-con" >
                                <AddEmployees handleClose={handleClose} setRefresh={setRefresh} />
                            </div>
                        }
                    </Box>
                </Modal>
            </div>
        </div>
    );
}