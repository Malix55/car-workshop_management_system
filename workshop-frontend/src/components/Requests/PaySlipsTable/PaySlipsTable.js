import CallToActionIcon from '@material-ui/icons/CallToAction';
import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { Button } from '@material-ui/core';
import PaySlipsTableStyles from './PaySlipsTableStyles';
import { TableCell } from '@material-ui/core';

// import { useHistory } from 'react-router-dom';

export default function PaySlipsTable(props) {
    const classes = PaySlipsTableStyles();

    // var history = useHistory();

    return (
        <div className={classes.widgetlg}>
            <TableContainer component={Paper} style={{ border: '0px solid', marginTop: '100px', borderBottom: "none" }} >
                <Table className={classes.table} aria-label="simple table" style={{ width: '100%', border: 'none', borderBottom: "none" }} >
                    <TableHead style={{ background: '#fafafa', border: '0px ', borderBottom: "none" }}>
                        <TableRow style={{ borderBottom: "none", height: '50px' }}>

                            <TableCell width="1%" align="right"></TableCell>
                            {/* <TableCell width="1%" align="right"></TableCell>
                            <TableCell width="10%" align="Left" ><b>Expense</b></TableCell>
                            <TableCell width="10%" align="left"><b>Quantity</b></TableCell>
                            <TableCell width="10%" align="left"><b>Cost Per Piece</b></TableCell>
                            <TableCell width="10%" align="left"><b>Cost</b></TableCell>
                            <TableCell width="1%" align="center"><b>Manage</b></TableCell>
                            <TableCell width="1%" align="right"></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ borderBottom: "none" }}>
                        {/* {props.rows.map((row, index) => (
                            <TableRow key={row.id} id={row.id} style={{ borderBottom: "none" }}>
                                <TableCell style={{ borderBottom: "none" }} component="th" width="1%" align="left" scope="row">
                                    <img id={`img${row.name}`} src={Image} alt={`pic of ${row.name}`} style={{ width: 60, borderRadius: "50%" }} />
                                </TableCell>
                                <TableCell width="10%" style={{ borderBottom: "none" }} align="left" id={`fn${row.id}`}>{row.name}</TableCell>
                                <TableCell width="10%" style={{ borderBottom: "none" }} align="left" id={`fn${row.id}`}>{row.description}</TableCell>
                                <TableCell width="10%" style={{ borderBottom: "none" }} align="left" id={`fn${row.id}`}>{row.status / row.description}</TableCell>
                                <TableCell width="1%" style={{ borderBottom: "none", color: 'blue', }} align="left" id={`fn${row.id}`}>{row.status}$</TableCell>
                                <TableCell align="left" style={{ borderBottom: "none" }}>
                                    <div style={{ display: 'flex' }}>
                                        <IconButton onClick={() => props.editTask(index)} style={{ color: '#de921d' }}><EditIcon /></IconButton>
                                        <IconButton onClick={() => props.deleteTask(index)} style={{ color: 'red' }}><Delete /></IconButton>
                                    </div>
                                </TableCell>
                            </TableRow >
                        ))} */}
                        <div style={{ justifyContent: 'center', marginBlockStart: '5%', alignItems: 'center', textAlign: 'center' }}>
                            <CallToActionIcon style={{ color: 'rgba(4, 197, 232, .3)', width: '70px', height: '70px' }} />
                            <p style={{ color: 'darkgray', paddingBottom:'40px' }}>No Data</p>
                        </div>

                    </TableBody>
                </Table>

            </TableContainer>
            {/* <Button className={classes.delButton} onClick={function (event) { props.deleteBtn(); history.push("/Signin") }} >Delete All</Button> */}
        </div>
    )
}
