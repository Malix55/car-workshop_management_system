import { Avatar, Grid, List, ListItem, ListItemIcon, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ProfileStyles from './ProfileStyles'
import PlaylistAddCheckOutlinedIcon from '@material-ui/icons/PlaylistAddCheckOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CircularChart from '../CircularChart/CircularChart';

export default function Profile() {
    const classes = ProfileStyles();
    const [user, setUser] = useState();
    const [client, setClient] = useState();
    const [staff, setStaff] = useState();
    const [online, setOnline] = useState(1);
    const [total, setTotal] = useState(2);
    const [clientG, setClientG] = useState(2);

    useEffect(() => {
        var parseResStaff;
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/admin/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.admin)
            setUser(parseRes.admin);

        }
        async function callApi1() {
            const response = await fetch('http://localhost:8000/api/auth/staff/', {
                headers: { token: localStorage.token }
            });

            parseResStaff = await response.json();
            console.log('im staff')
            console.log(parseResStaff.staff[0].online)
            setStaff(parseResStaff.staff);

        }
        async function callApi2() {
            const response = await fetch('http://localhost:8000/api/auth/client/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.client)
            setClient(parseRes.client);

        }
        callApi();
        callApi1();
        callApi2();


    }, [])

    return (
        <div>
            <div className={classes.profilebar}>


                <Grid container spacing={0} >

                    <Grid item sm={4} xm={3} xl={2} lg={2} md={3}>

                        <div className={classes.paperBk}>
                            <Avatar style={{ height: '85px', width: '85px' }} src={'#'} alt="Abdullah Makix" />
                        </div>

                    </Grid>
                    <Grid item sm={8} xm={9} xl={10} lg={10} md={9}>
                        <div className={classes.paperBk}>
                            <Typography
                                noWrap
                                variant='h6'
                            >
                                Welcome, Abdullah Malix!
                            </Typography>
                            <Typography
                                noWrap
                                style={{ color: 'gray', fontSize: '13px' }}
                            >
                                EmployeeId: 01
                            </Typography>
                            <Typography
                                noWrap
                                style={{ color: 'gray', fontSize: '13px' }}
                            >
                                Company: Toyota
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item sm={12}>
                        <div style={{ marginBlockStart: '80px' }}></div>
                    </Grid>
                    <Grid item sm={6} xm={6} xl={6} lg={6} md={6}>
                        <div style={{ fontSize: '9px' }} >.</div>
                        <div className={classes.paperBk}>
                            <Typography
                                noWrap
                                style={{ fontSize: '12px' }}
                            >
                                YOU HAVE
                            </Typography>
                            <List >

                                <ListItem button onClick={() => {
                                }} className={classes.listItem} >
                                    <ListItemIcon><span style={{ fontSize: '3px' }}>.</span><PlaylistAddCheckOutlinedIcon style={{ width: '20px', color: '#6792ef' }} /></ListItemIcon>
                                    <span style={{ color: '#6792ef' }}>0 Pending request(s)</span>
                                </ListItem>

                                <ListItem style={{ marginTop: '-15px' }} button onClick={() => {
                                }} className={classes.listItem} >
                                    <ListItemIcon><AssignmentOutlinedIcon style={{ width: '18px', color: '#6792ef' }} /></ListItemIcon>
                                    <span style={{ color: '#6792ef' }}>0 Pending Task(s)</span>
                                </ListItem>

                            </List>
                        </div>

                    </Grid>
                    <Grid item sm={6} xm={6} xl={6} lg={6} md={6}>

                        <div className={classes.vl}>
                            <div className={classes.paperBk}>
                                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                    <Grid item sm={6}>
                                        <p style={{ fontSize: '12px' }}>
                                            STAFF ONLINE
                                        </p>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <p style={{ fontSize: '12px' }}>
                                            Registered Users
                                        </p>
                                    </Grid>
                                </div>
                            </div>
                            <div className={classes.paperBk}>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <CircularChart staff={staff} online={online} setOnline={setOnline} total={total} setTotal={setTotal} />
                                    <CircularChart client={client} clientG={clientG} setClientG={setClientG} setTotal={setTotal} total={total} />
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}
