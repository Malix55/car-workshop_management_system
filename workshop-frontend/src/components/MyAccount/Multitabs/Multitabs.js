import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MultitabsStyles from './MultitabsStyles';
import clsx from 'clsx';
import Personal from '../Personal Info/Personal';
import Work from '../Work/Work';
import Contract from '../Contract/Contract';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}

            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab

            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}



export default function Multitabs() {
    const classes = MultitabsStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue - 1);
    };

    const [admin, setAdmin] = useState({});

    const handleSetAdmin = e => {
        const { name, value } = e.target;
        setAdmin(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/admin/', {
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();
            setAdmin(parseRes.admin)
            console.log(parseRes.admin)

        }
        callApi();
    }, [])



    const updateHandler = async () => {
        // e.preventDefault()
        // handleClose();
        try {
            const response1 = await fetch('http://localhost:8000/api/auth/admin/update', {
                headers: {
                    'token': localStorage.token,
                    name: admin.name,
                    email: admin.email,
                    gender: admin.gender,
                    phoneNumber: admin.phoneNumber,
                    country: admin.country,
                    street: admin.street,
                    society: admin.society,
                    houseNumber: admin.houseNumber,
                    state: admin.state,
                    zip: admin.zip,
                    workshopName: admin.workshopName,
                    type: admin.type,
                    open: admin.open,
                    close: admin.close,
                    city: admin.city,
                    area: admin.area,
                    id: admin._id
                },
                method: 'PATCH'
            });
            console.log(response1)
        } catch (err) {
            console.log(err)
        }


        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/admin/', {
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();
            setAdmin(parseRes.admin)
            console.log(parseRes.admin)

        }

        callApi();
        console.log(admin)
    }


    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Tabs
                    //   variant="scrollable"
                    value={!value ? 1 : value + 1}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                    className={classes.tabs}



                >
                    <LinkTab className={classes.insideTabLeft} label={(value === 0 && 'PERSONAL') || (value === 1 && 'WORK') || (value === 2 && 'CONTRACT')} disabled />
                    <LinkTab
                        label="Personal" href="/drafts" {...a11yProps(0)}
                        className={clsx({
                            [classes.insideTabRight]: true,
                            [classes.rightAlign]: true,
                        })}
                    />
                    <LinkTab className={classes.insideTabRight} label="Work" href="/trash" {...a11yProps(1)} />
                    <LinkTab className={classes.insideTabRight} label="Contract" href="/spam" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} >
                <Personal admin={admin} handleChange={handleSetAdmin} submitHandler={updateHandler}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Work admin={admin} handleChange={handleSetAdmin} submitHandler={updateHandler}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Contract admin={admin} handleChange={handleSetAdmin} />
            </TabPanel>
        </div>
    );
}