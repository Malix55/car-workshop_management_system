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
// import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Box, IconButton, Modal, Tooltip } from "@material-ui/core";
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles({
    table: {
        // minWidth: 650
    }
});


export default function Clients() {
    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    const [disabled, setDisabled] = useState(null);

    const disabledHandler = async (row) => {
        console.log(row.disabled);

        try {
            const response1 = await fetch('http://localhost:8000/api/auth/client/update', {
                headers: {
                    'token': localStorage.token,
                    'id': row._id,
                    'disabled': !row.disabled
                },
                method: 'PATCH'
            });
            console.log(response1)
        } catch (err) {
            console.log(err)
        }

        row.disabled ? setDisabled(false) : setDisabled(true);
    }

    useEffect(() => {
        console.log('adsdadadadad')
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/client/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log('hereeererererererer')
            console.log(parseRes)
            setRows(parseRes.client);
            setData(parseRes.client);

        }
        callApi();
        setDisabled(null)
    }, [disabled])

    const deleteHandler = async (email) => {
        var parseRes;
        try {
            console.log('dsfsfsfsf')
            const response = await fetch('http://localhost:8000/api/auth/client/delete', {
                headers: {
                    'token': localStorage.token,
                    'email': email
                },
                method: 'DELETE'

            });

            parseRes = await response.json();
            console.log(parseRes)
        } catch (err) {
            console.log(err);
        }

        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/client/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log('hereeererererererer')
            console.log(parseRes)
            setRows(parseRes.client);
            setData(parseRes.client);

        }
        callApi();
    }

    const [searched, setSearched] = useState("");
    const classes = useStyles();

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };



    
    const [open, setOpen] = React.useState(false);
    const handleOpen = (e) => {
        console.log('below here')
        setEmployee(e);
        console.log(employee);
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

    return (
        <Fragment>
            <SearchBar
                style={{ width: '15%', borderRadius: '15px', height: '37px', border: '1px solid lightgray' }}
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
            />
            <TableContainer style={{ border: '0px solid', marginTop: '30px', borderBottom: "none" }}>
                <Table className={classes.table} style={{ width: '100%', border: 'none', borderBottom: "none" }} aria-label="simple table">
                    <TableHead style={{ background: '#fafafa', border: '0px ', borderBottom: "none" }}>
                        <TableRow style={{ borderBottom: "none" }}>
                            {/* <TableCell width={'5%'} style={{  }}><b>Id</b></TableCell> */}
                            <TableCell align="left" width={'70%'}><b>Name</b></TableCell>
                            <TableCell align="left" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.firstName} style={{ borderBottom: "none", }}>
                                {/* <TableCell style={{ borderBottom: "none" }} component="th" scope="row">{index}</TableCell> */}
                                <TableCell align="left" style={{ borderBottom: "none", color: 'gray' }}>
                                    {/* <IconButton>
                                        <img id={`img${row.image}`} src={`http://localhost:8000/${row.image}`} alt={`pic of ${row.image}`} style={{ width: 30, height: 30, borderRadius: '50%' }} />
                                    </IconButton> */}
                                    <i style={{ cursor: 'pointer' }} onClick={() => {handleOpen(row)}}>{row.firstName + " " + row.lastName}</i>
                                </TableCell>
                                {/* <TableCell align="left" style={{ borderBottom: "none" }}>{row.idNumber}</TableCell>
                                <TableCell align="left" style={{ borderBottom: "none" }}>{row.operationalArea}</TableCell>
                                <TableCell width={1} align="left" style={{ cursor: 'pointer', borderBottom: "none" }} ><IconButton ><EditIcon style={{ color: '#00dff1' }} /></IconButton></TableCell> */}
                                <TableCell align="left" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderBottom: "none" }} >

                                    {row.disabled ?
                                        <Tooltip title="User Disabled" >
                                            <IconButton onClick={() => disabledHandler(row)}>
                                                <BlockIcon onClick={() => { }} style={{ color: 'orange', cursor: 'pointer' }} />
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        <Tooltip title="User Active" >
                                            <IconButton onClick={() => disabledHandler(row)}>
                                                <CheckCircleIcon onClick={() => { }} style={{ color: '#2a5ab4', cursor: 'pointer' }} />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                    <IconButton>
                                        <DeleteIcon onClick={() => deleteHandler(row.email)} style={{ color: 'red', cursor: 'pointer' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
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

                        <div class="testbox">
                            <form className="formUpdate" >
                                <div class="banner">
                                    <h1 style={{ color: '#ffff' }}>Update Employee Details</h1>
                                </div>
                                <br />
                                <fieldset>
                                    <legend>Personale Details</legend>
                                    <div class="colums">
                                        <div class="item">
                                            <label for="firstName">First Name<span>*</span></label>
                                            <input disabled id="firstName" type="text" name="firstName" value={employee.firstName} />
                                        </div>
                                        <div class="item">
                                            <label for="lastName"> Last Name<span>*</span></label>
                                            <input id="lastName" disabled type="text" name="lastName" value={employee.lastName} />
                                        </div>
                                        <div class="item">
                                            <label for="address">Email Address<span>*</span></label>
                                            <input disabled id="address" type="text" name="email" value={employee.email} />
                                        </div>
                                        <div class="item">
                                            <label for="phoneNumber">phone Number</label>
                                            <input disabled id="phoneNumber" type="tel" name="phoneNumber" value={employee.phoneNumber} />
                                        </div>
                                        <div class="item">
                                            <label for="address">House Address</label>
                                            <input disabled id="address" type="text" name="address" value={employee.address} />
                                        </div>
                                        <div class="item">
                                            <label for="state">state</label>
                                            <input disabled id="state" type="text" name="state" value={employee.state} />
                                        </div>
                                        <div class="item">
                                            <label for="idNumber">CNIC</label>
                                            <input disabled id="idNumber" type="text" name="idNumber" value={employee.state} />
                                        </div>
                                        <div class="item">
                                            <label for="country">Country</label>
                                            <input disabled id="country" type="text" name="country" value={employee.country} />
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
                                        <input disabled id="experience" type="text" name="experience" value={employee.experience} />
                                    </div>
                                    <div class="item">
                                        <label for="skills">Skills</label>
                                        <input disabled id="skills" type="text" name="skills" value={employee.skills} />
                                    </div>
                                    <div class="item">
                                        <label for="additionalDetails">additionalDetails</label>
                                        <textarea disabled id="additionalDetails" name="additionalDetails" rows="3" value={employee.additionalDetails}  ></textarea>
                                    </div>
                                </fieldset>
                                <div class="btn-block">
                                    <button type="submit" className="buttonC" onClick={(e) => { handleClose() }}>Confirm Changes</button>
                                </div>
                            </form>
                        </div>

                    </Box>
                </Modal>
            </div>
        </Fragment>
    );
}