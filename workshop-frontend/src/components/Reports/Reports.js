
import { Button, FormControl, Grid, IconButton, makeStyles, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, Legend, BarChart } from 'recharts';
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// const data = [
//     { name: 'April', uv: 400, pv: 2400, amt: 2400 },
//     { name: 'May', uv: 500, pv: 1400, amt: 3400 },
//     { name: 'June', uv: 100, pv: 2400, amt: 2300 },
//     { name: 'July', uv: 700, pv: 2400, amt: 2460 },
//     { name: 'Aug', uv: 700, pv: 2400, amt: 2460 },
//     { name: 'Sep', uv: 700, pv: 2100, amt: 2460 },
//     { name: 'Oct', uv: 900, pv: 2400, amt: 2460 },
// ];

const RenderLineChart = (props) => {
    const [rows, setRows] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [client, setClient] = useState([]);
    useEffect(() => {
        // async function callApi() {
        //     const response = await fetch('http://localhost:8000/api/auth/tasks/', {
        //         headers: { token: localStorage.token },
        //     });

        //     const parseRes = await response.json();
        //     console.log('sssssssssssssssssssssssssss')
        //     console.log(parseRes)



        //     setClient(parseRes.client);
        //     console.log(parseRes.client);
        //     setTasks(parseRes.task);
        //     // setData(parseRes.staff);

        // }

        // callApi();

        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/tasks/', {
                headers: { token: localStorage.token },
            });

            const parseRes = await response.json();
            console.log('sssssssssssssssssssssssssss')
            setTasks(parseRes.task)
            setClient(parseRes.client)


            var c = 0;
            var p = 0;
            var ip = 0;
            console.log(parseRes.task)
            for (var i in parseRes.task) {
                // if (parseRes.task[i].status) {
                if (parseRes.task[i].status.toLowerCase() === "pending") { p = p + 1 };
                if (parseRes.task[i].status.toLowerCase() === "accepted") { c = c + 1 };
                if (parseRes.task[i].status.toLowerCase() === "rejected") { ip = ip + 1 };
                // }

            }
            console.log('c, p, ip')
            console.log(c, p, ip)
            var obj
            if (props.state === 'all') {
                obj = [
                    {
                        name: "pending",
                        uv: p
                    },
                    {
                        name: "accepted",
                        pv: c
                    },
                    {
                        name: "rejected",
                        lv: ip
                    },
                ]
            }
            if (props.state === 'pending') {
                obj = [
                    {
                        name: "pending",
                        uv: p
                    },
                ]
            }
            if (props.state === 'accepted') {
                obj = [
                    {
                        name: "rejected",
                        pv: c
                    },
                ]
            }
            if (props.state === 'completed') {
                obj = [
                    {
                        name: "completed",
                        lv: ip
                    },
                ]
            }
            props.state && setRows(obj);
            // setData(parseRes.staff);

        }

        callApi();
    }, [props.state])
    return (
        <div style={{ width: '100%' }}>
            <ResponsiveContainer width="95%" height={200}>
                <BarChart height={250} data={rows} >
                    {/* <CartesianGrid strokeDasharray="1 1" /> */}
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="green" style={{ opacity: '1', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} />
                    <Bar dataKey="uv" fill="orange" />
                    <Bar dataKey="lv" fill="red" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}


export default function Reports() {

    const [state, setState] = React.useState('all');
    const handleChange = (event) => {
        setState(
            event.target.value
        );
    };
    // const [state1, setState1] = React.useState('Task1');
    // const handleChange1 = (event) => {
    //     setState1(
    //         event.target.value
    //     );
    // };

    // const [task, setTask] = useState(
    //     [{

    //     },

    //     {

    //     }]
    // )

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


    const [rows, setRows] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [client, setClient] = useState([]);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/tasks/', {
                headers: { token: localStorage.token },
            });

            const parseRes = await response.json();
            console.log('sssssssssssssssssssssssssss')
            setTasks(parseRes.task)
            setClient(parseRes.client)
            setRows(parseRes.task);
            // setData(parseRes.staff);

        }

        callApi();
    }, [])



    const disabledHandler = async (row, status) => {
        console.log(row);

        try {
            const response1 = await fetch('http://localhost:8000/api/auth/task/update', {
                headers: {
                    'token': localStorage.token,
                    'id': row._id,
                    'status': status
                },
                method: 'PATCH'
            });
            console.log(response1)
        } catch (err) {
            console.log(err)
        }

        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/tasks/', {
                headers: { token: localStorage.token },
            });

            const parseRes = await response.json();
            console.log('sssssssssssssssssssssssssss')
            setTasks(parseRes.task)
            setClient(parseRes.client)
            setRows(parseRes.task);
            // setData(parseRes.staff);

        }

        callApi();

    }


    const classes = useStyles();

    return (
        <div>
            <hr style={{ opacity: '.2', marginTop: '20px' }}></hr>
            <Grid container >
                <Grid item align='right' xs={1}>
                    <Typography style={{ marginTop: '4px' }}>Filter By:&nbsp;</Typography>
                </Grid>
                <Grid item xs={1}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        {/* <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel> */}
                        <Select
                            // labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={state}
                            onChange={handleChange}
                            name="Type"
                            style={{ height: '37px', border: '1px solid lightgray' }}

                            defaultValue={'accepted'}
                        >
                            <MenuItem value={'accepted'}>Accepted</MenuItem>
                            <MenuItem value={'pending'}>Pending</MenuItem>
                            <MenuItem value={'rejected'}>Rejected</MenuItem>
                            <MenuItem value={'all'}>All</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>

                </Grid>
            </Grid>
            <hr style={{ opacity: '.2', marginBottom: '40px' }}></hr>
            <Grid container>
                <Grid item xs={12} >
                    <RenderLineChart state={state} />
                </Grid>
                <Grid item xs={12} style={{ marginTop: '40px' }}>
                    <TableContainer style={{ border: '0px solid', marginTop: '30px', height: '29vh', borderBottom: "none" }}>
                        <Table className={classes.table} aria-label="simple table" style={{ width: '100%', border: 'none', borderBottom: "none" }} >
                            <TableHead style={{ background: '#fafafa', border: '0px ', borderBottom: "none" }}>
                                <TableRow style={{ borderBottom: "none" }}>
                                    <TableCell align="left" ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name</b></TableCell>
                                    <TableCell align="left" ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Task</b></TableCell>
                                    <TableCell align="left" ><b>Task No</b></TableCell>
                                    <TableCell align="center" ><b>Status</b></TableCell>
                                    <TableCell align="center" ><b>Due Date</b></TableCell>
                                    <TableCell align="center" ><b>Actions</b></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((r, i) => (
                                    <Fragment>
                                        {
                                            <TableRow key={client[i].firstName + client[i].lastName} style={{ color: '#80a4f1' }}>
                                                <TableCell align="left" style={{ borderBottom: "none" }}>{client[i].firstName + " " + client[i].lastName}</TableCell>
                                                <TableCell align="left" style={{ borderBottom: "none" }}>{r.disc}</TableCell>
                                                <TableCell align="left" style={{ borderBottom: "none" }}>
                                                    <div style={{ color: 'darkgray' }}>&nbsp;&nbsp;&nbsp;&nbsp;{i}</div>
                                                </TableCell>
                                                <TableCell align="center" style={{ borderBottom: "none" }}>
                                                    {r.status.toLowerCase() === "accepted" && <Button variant='outlined' size='small' style={{ width: '10vh', fontSize: '9px', color: 'green', border: '1px solid green' }} color='primary'>{r.status}</Button>}
                                                    {
                                                        <>
                                                            {r.status.toLowerCase() === "pending" &&
                                                                <Button onMouseOver={() => setIsActive(true)} variant='outlined' size='small' style={{ color: 'orange', border: '1px solid orange', width: '10vh', fontSize: '9px' }}>
                                                                    {r.status}
                                                                </Button>}



                                                        </>
                                                    }
                                                    {r.status.toLowerCase() === "rejected" && <Button variant='outlined' size='small' style={{ color: 'red', width: '10vh', border: '1px solid red', fontSize: '9px' }}>{r.status}</Button>}
                                                </TableCell>
                                                <TableCell align="center" style={{ borderBottom: "none" }}>{r.date}&nbsp; {r.time}</TableCell>
                                                {r.status.toLowerCase() === "pending" && <TableCell align="center" style={{ borderBottom: "none" }}> <>
                                                    <IconButton onClick={() => disabledHandler(r, "rejected")}>
                                                        <BlockIcon onClick={() => { }} style={{ color: 'orange', cursor: 'pointer' }} />
                                                    </IconButton>
                                                    :
                                                    <IconButton onClick={() => disabledHandler(r, "accepted")}>
                                                        <CheckCircleIcon onClick={() => { }} style={{ color: '#2a5ab4', cursor: 'pointer' }} />
                                                    </IconButton>
                                                </></TableCell>}
                                                <TableCell align="center" style={{ borderBottom: "none" }}>{r.status.toLowerCase() !== "pending" && <>
                                                    --
                                                </>}</TableCell>

                                            </TableRow>
                                        }
                                    </Fragment>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
            </Grid>
        </div>
    )
}
