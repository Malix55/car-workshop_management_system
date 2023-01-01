import {  Grid, MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import Calander from '../../components/Dashboard/Calander/Calander';
import CompanyDetails from '../../components/Dashboard/CompanyDetails/CompanyDetails';
import Profile from '../../components/Dashboard/Profile/Profile';
import Feedback from '../../components/Dashboard/Feedback/FeedBack';
import LeaveRequest from '../../components/Dashboard/LeaveRequest/LeaveRequest';
import TaskList from '../../components/Dashboard/TaskList/TaskList';
import DashboardHomeStyles, { theme } from './DashboardHomeStyles';

export default function DashboardHome() {
    const classes = DashboardHomeStyles();
    return (

        <div className={classes.content}>

            <MuiThemeProvider theme={theme}>

                <div className={classes.root}>
                    <Grid container spacing={4} >

                        <Grid item sm={12} xm={12} xl={6} lg={6} md={6}>

                            <div className={classes.paperBk}>
                                <Profile />
                            </div>

                        </Grid>
                        <Grid item sm={12} xm={12} xl={6} lg={6} md={6}>
                            <div className={classes.paperBk}>
                                <Calander />
                            </div>

                        </Grid>
                        <Grid item sm={12} xm={12} xl={6} lg={6} md={6}>
                            <div className={classes.paperBk}>
                                <div style={{ height: '15px' }}></div>
                                <TaskList />
                            </div>
                        </Grid>
                        <Grid item sm={12} xm={12} xl={6} lg={6} md={6}>
                            <div className={classes.paperBk}>
                                <div style={{ height: '15px' }}></div>
                                <CompanyDetails />
                            </div>
                        </Grid>
                        <Grid item sm={12} xm={12} xl={6} lg={6} md={6}>
                            <div className={classes.paperBk1}>
                                <LeaveRequest/>
                            </div>
                        </Grid>
                        <Grid item sm={12} xm={12} xl={6} lg={6} md={6}>
                            <div className={classes.paperBk1}>
                                <Feedback/>
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </MuiThemeProvider>

        </div>
    )
}
