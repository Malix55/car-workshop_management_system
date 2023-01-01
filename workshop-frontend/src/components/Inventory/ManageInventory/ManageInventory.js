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

import { Box, FormControl, IconButton, Menu, MenuItem, Modal, Select } from "@material-ui/core";
// import AddEmployees from "../AddEmployees/AddEmployees";


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


export default function ManageInventory() {
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
            const response = await fetch('http://localhost:8000/api/auth/products/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.products);
            setRows(parseRes.products);
            setData(parseRes.products);

        }

        refresh && callApi();
        refresh && setRefresh(false);
    }, [refresh])

    const updateHandler = async (e) => {
        e.preventDefault()

        // handleClose();
        try {
            const response1 = await fetch('http://localhost:8000/api/auth/products/update', {
                headers: {
                    'token': localStorage.token,
                    name: employee.name,
                    type: employee.type,
                    brand: employee.brand,
                    saleprice: employee.saleprice,
                    retailprice: employee.retailprice,
                    part_ID: employee.part_ID,
                    quantity: employee.quantity,
                    model: employee.model,
                    modelYear: employee.modelYear,
                    make: employee.make,
                    description: employee.description,
                    id: employee._id
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
            const response = await fetch('http://localhost:8000/api/auth/products/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.products);
            setRows(parseRes.products);
            setData(parseRes.products);

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
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const deleteHandler = async (id) => {
        console.log(id)
        try {
            console.log('dsfsfsfsf')
            const response = await fetch('http://localhost:8000/api/auth/products/delete', {
                headers: {
                    'token': localStorage.token,
                    'id': id
                },
                method: 'DELETE'

            });
            console.log(response)
        } catch (err) {
            console.log(err);
        }

        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/products/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.products);
            setRows(parseRes.products);
            setData(parseRes.products);

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
                        <MenuItem value={'Civic'}>Civic</MenuItem>
                        <MenuItem value={'Suzuki'}>Suzuki</MenuItem>
                        <MenuItem value={'Mercedes'}>Mercedes</MenuItem>
                        <MenuItem value={'Toyota'}>Toyota</MenuItem>
                        <MenuItem value={'All'}>All</MenuItem>
                    </Select>
                </FormControl>
                {/* <Button style={{ marginLeft: '66%' }} variant="outlined" size="medium" onClick={() => { setType('Add'); handleOpen(current) }}>Add Employee</Button> */}
            </div>
            <TableContainer style={{ border: '0px solid', marginTop: '30px', borderBottom: "none" }}>
                <Table className={classes.table} aria-label="simple table" style={{ width: '100%', border: 'none', borderBottom: "none" }} >
                    <TableHead style={{ background: '#fafafa', border: '0px ', borderBottom: "none" }}>
                        <TableRow style={{ borderBottom: "none" }}>
                            <TableCell width={'2%'}><b>Id</b></TableCell>
                            <TableCell align="left" ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Product Name</b></TableCell>
                            <TableCell align="left" ><b>Product Type</b></TableCell>
                            <TableCell align="left" ><b>Product Quantity</b></TableCell>
                            <TableCell align="left" ><b>Product Price</b></TableCell>
                            <TableCell align="left" width={'40%'}><b>Product Detail</b></TableCell>
                            <TableCell align="left" style={{ textAlign: 'end' }}><b>Actions</b></TableCell>
                            {/* <TableCell align="left"></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <Fragment>
                                {(state === 'All') &&
                                    <TableRow key={row.firstName} style={{ color: '#80a4f1' }}>
                                        <TableCell style={{ borderBottom: "none" }} component="th" scope="row">{index}</TableCell>
                                        <TableCell align="left" style={{ color: '#80a7e0', borderBottom: "none" }}> <IconButton><img id={`img${row.image}`} src={`http://localhost:8000/${row.image}`} alt={`${row.name}`} style={{ width: 50, height: 50, borderRadius: '50%' }} /></IconButton>{row.name}</TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>
                                            <div >
                                                {row.brand}<br></br>
                                                <div style={{ color: 'darkgray' }}>{row.type}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>{row.quantity}</TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>{row.saleprice}</TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>{row.description}</TableCell>
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
                                                    <MenuItem style={{ marginBottom: '-10px' }} onClick={() => { handleClose1(); deleteHandler(current._id) }}>
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
                                {(state === row.brand) &&
                                    <TableRow key={row.firstName} style={{ color: '#80a4f1' }}>
                                        <TableCell style={{ borderBottom: "none" }} component="th" scope="row">{index}</TableCell>
                                        <TableCell align="left" style={{ color: '#80a7e0', borderBottom: "none" }}> <IconButton><img id={`img${row.image}`} src={`http://localhost:8000/${row.image}`} alt={`${row.name}`} style={{ width: 50, height: 50, borderRadius: '50%' }} /></IconButton>{row.name}</TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>
                                            <div >
                                                {row.brand}<br></br>
                                                <div style={{ color: 'darkgray' }}>{row.type}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>{row.quantity}</TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>{row.saleprice}</TableCell>
                                        <TableCell align="left" style={{ borderBottom: "none" }}>{row.description}</TableCell>
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
                                                    <MenuItem style={{ marginBottom: '-10px' }} onClick={() => { handleClose1(); deleteHandler(current._id) }}>
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
                                        <h1 style={{ color: '#ffff' }}>Update Product Details</h1>
                                    </div>
                                    <br />
                                    <fieldset>
                                        <legend>Product Details</legend>
                                        <div class="colums">
                                            <div class="item">
                                                <label for="name">Product Name<span>*</span></label>
                                                <input id="name" type="text" name="name" value={employee.name} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="type"> Type<span>*</span></label>
                                                <input id="type" type="text" name="type" value={employee.type} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="brand">Brand<span>*</span></label>
                                                <input id="brand" type="text" name="brand" value={employee.brand} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="saleprice">Sale Price</label>
                                                <input id="saleprice" type="number" name="saleprice" value={employee.saleprice} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="retailprice">Retail Price</label>
                                                <input id="retailprice" type="text" name="retailprice" value={employee.retailprice} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="part_ID">Part Id</label>
                                                <input id="part_ID" type="text" name="part_ID" value={employee.part_ID} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="quantity">Quantity</label>
                                                <input id="quantity" type="text" name="quantity" value={employee.quantity} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="model">Model</label>
                                                <input id="model" type="text" name="model" value={employee.model} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="make">Make</label>
                                                <input id="make" type="text" name="make" value={employee.make} onChange={handleChange} />
                                            </div>
                                            <div class="item">
                                                <label for="description">Details</label>
                                                <input id="description" type="text" name="description" value={employee.description} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div class="btn-block">
                                        <button type="submit" className="buttonC" onClick={(e) => { handleClose(); updateHandler(e); }}>Confirm Changes</button>
                                    </div>
                                </form>
                            </div>
                            :
                            <div style={{ background: 'white', borderRadius: '6px', paddingInline: '40px' }}>
                                {/* <AddEmployees handleClose={handleClose} setRefresh={setRefresh}/> */}
                            </div>
                        }
                    </Box>
                </Modal>
            </div>
        </div>
    );
}