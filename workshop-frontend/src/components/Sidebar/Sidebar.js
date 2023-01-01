import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import PermPhoneMsgOutlinedIcon from '@material-ui/icons/PermPhoneMsgOutlined';
import SidebarStyles from './SidebarStyles';
import { Avatar } from '@material-ui/core';
import logo from '../../Images/logo.png';
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import LocalGroceryStoreOutlinedIcon from '@material-ui/icons/LocalGroceryStoreOutlined';
import LiveTvOutlinedIcon from '@material-ui/icons/LiveTvOutlined';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';


export default function Sidebar(props) {
    const classes = SidebarStyles();

    const [open, setOpen] = useState(false);

    const [drop, setDrop] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };



    return (
        <Fragment>
            <div className={classes.root}>
                {/* <CssBaseline /> */}
                {/* <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>

                    </Toolbar>
                </AppBar> */}
                <div className={classes.test}>
                    <div className={clsx({
                        [classes.toolbarClose]: !open,
                        [classes.toolbar]: open,

                    })}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={open ? handleDrawerClose : handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton)}
                        >
                            <ListIcon />
                        </IconButton>
                        <div style={{ marginLeft: '18px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>

                            <Typography
                                variant="h6"
                                noWrap
                                className={clsx({
                                    [classes.hide]: !open,
                                })}
                            >
                                <b>
                                    Workshop
                                </b>
                            </Typography>
                            <Avatar
                                style={{ marginLeft: '15px' }}
                                className={clsx({
                                    [classes.hide]: !open,
                                })} src={logo} alt="logo"
                            />
                        </div>

                    </div>
                    <Divider />
                    <div className={classes.profilebar}>
                        <div style={{ display: 'inline-flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar src={'#'} alt="Abdullah Makix" />
                        </div>
                        <Typography
                            noWrap
                            className={clsx({
                                [classes.hide]: !open,
                            })}
                        >
                            Abdullah Malix
                        </Typography>
                        <Typography
                            noWrap
                            style={{ color: 'gray' }}
                            className={clsx({
                                [classes.hide]: !open,
                            })}
                        >
                            Toyota
                        </Typography>
                    </div>
                    <Divider />
                </div>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >

                    <div className={classes.drawerContent}>
                        <List className={clsx({
                            [classes.marginIcon]: !open,
                        })}>
                            <h4
                                className={clsx({
                                    [classes.hide]: !open,
                                })}
                                style={{ marginLeft: '10px', color: 'gray' }}>You</h4>
                            {['Dashboard', 'Requests', 'Calendar'].map((text, index) => {
                                switch (text) {
                                    case "Dashboard":
                                        return (
                                            <ListItem button onClick={() => {
                                                props.setSelectedComponent('Dashboard');
                                            }}
                                                className={classes.dropDownPanel} key={text}
                                            >
                                                <ListItemIcon>{index === 0 && <DashboardOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                        )
                                    case "Requests":
                                        return (
                                            <ListItem button onClick={() => {
                                                props.setSelectedComponent('Requests')
                                            }} className={classes.dropDownPanel} key={text}>
                                                <ListItemIcon>{index === 1 && <MailOutlineOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                        )

                                    default:
                                        return (
                                            <ListItem button onClick={() => {
                                                props.setSelectedComponent('Calendar')
                                            }} className={classes.dropDownPanel} key={text}>
                                                <ListItemIcon>{index === 2 && <DateRangeOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                        )
                                }
                            })}
                        </List>
                        <List className={clsx({
                            [classes.marginIcon]: !open,
                        })}>
                            <h4
                                className={clsx({
                                    [classes.hide]: !open,
                                })}
                                style={{ marginLeft: '10px', color: 'gray' }}>Your Company</h4>
                            {['Live', 'Employees', 'Clients', 'Appointments', 'Store'].map((text, index) => {
                                switch (text) {
                                    case "Live":
                                        return (
                                            <ListItem button onClick={() => {
                                                props.setSelectedComponent('Live')
                                            }} className={classes.dropDownPanel} key={text}>
                                                <ListItemIcon>{index === 0 && <RoomOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                        )
                                    case "Store":
                                        return (
                                            <Fragment>
                                                <ListItem button onClick={() => {
                                                    setDrop(!drop)
                                                }} className={classes.dropDownPanel} key={text}>
                                                    <ListItemIcon>{index === 4 && <LocalMallOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                    <ListItemText primary={text} />

                                                    {drop ?
                                                        <ListItemIcon>{index === 4 && <ExpandLessIcon style={{ marginLeft: '25px' }} className={classes.drawerIcon} />}</ListItemIcon>
                                                        :
                                                        <ListItemIcon>{index === 4 && <ExpandMoreIcon style={{ marginLeft: '25px' }} className={classes.drawerIcon} />}</ListItemIcon>
                                                    }

                                                </ListItem>
                                                {drop === true &&
                                                    <Fragment>
                                                        <ListItem button onClick={() => {
                                                            props.setSelectedComponent('Inventory')
                                                        }} className={classes.dropDownPanel} key={text}>
                                                            <ListItemIcon>{index === 4 && <StorefrontOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                            <span style={{ color: 'gray' }} >Inventory</span>
                                                        </ListItem>
                                                        <ListItem button onClick={() => {
                                                            props.setSelectedComponent('Manage Pricing')
                                                        }} className={classes.dropDownPanel} key={text}>
                                                            <ListItemIcon>{index === 4 && <LocalAtmOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                            <span style={{ color: 'gray' }} >Manage pricing</span>
                                                        </ListItem>
                                                        <ListItem button onClick={() => {
                                                            props.setSelectedComponent('Orders')
                                                        }} className={classes.dropDownPanel} key={text}>
                                                            <ListItemIcon>{index === 4 && <LocalGroceryStoreOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                            <span style={{ color: 'gray' }} >Orders</span>
                                                        </ListItem>
                                                        <ListItem button onClick={() => {
                                                            props.setSelectedComponent('Advertising')
                                                        }} className={classes.dropDownPanel} key={text}>
                                                            <ListItemIcon>{index === 4 && <LiveTvOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                            <span style={{ color: 'gray' }} >Advertising</span>
                                                        </ListItem>
                                                        <ListItem button onClick={() => {
                                                            props.setSelectedComponent('Feedback')
                                                        }} className={classes.dropDownPanel} key={text}>
                                                            <ListItemIcon>{index === 4 && <FeedbackOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                            <span style={{ color: 'gray' }} >Feedback</span>
                                                        </ListItem>
                                                    </Fragment>
                                                }
                                            </Fragment>
                                        )
                                    case "Employees":
                                        return (
                                            <ListItem button onClick={() => {
                                                props.setSelectedComponent('Employees')
                                            }} className={classes.dropDownPanel} key={text}>
                                                <ListItemIcon>{index === 1 && <WorkOutlineOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                        )
                                    case "Appointments":
                                        return (
                                            <ListItem button onClick={() => {
                                                props.setSelectedComponent('Reports')
                                            }} className={classes.dropDownPanel} key={text}>
                                                <ListItemIcon>{index === 3 && <PollOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                        )

                                    default:
                                        return (
                                            <ListItem button onClick={() => {
                                                props.setSelectedComponent('Clients')
                                            }} className={classes.dropDownPanel} key={text}>
                                                <ListItemIcon>{index === 2 && <PeopleOutlineOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                        )
                                }
                            })}
                        </List>

                        <List className={clsx({
                            [classes.marginIcon]: !open,
                        })}>
                            <h4
                                className={clsx({
                                    [classes.hide]: !open,
                                })}
                                style={{ marginLeft: '10px', color: 'gray' }}>Support</h4>
                            {['Knowledge Base', 'Contact Us'].map((text, index) => {
                                switch (text) {
                                    case "Knowledge Base":
                                        return (
                                            <ListItem button onClick={() => {
                                                props.setSelectedComponent('Knowledge Base')
                                            }} className={classes.dropDownPanel} key={text}>
                                                <ListItemIcon>{index === 0 && <MenuBookOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                        )
                                    case "Contact Us":
                                        return (
                                            <ListItem button onClick={() => {
                                                props.setSelectedComponent('Contact Us')
                                            }} className={classes.dropDownPanel} key={text}>
                                                <ListItemIcon>{index === 1 && <PermPhoneMsgOutlinedIcon className={classes.drawerIcon} />}</ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                        )

                                    default:
                                        return (
                                            <Fragment></Fragment>
                                        )
                                }
                            })}
                        </List>

                        <List
                            className={clsx({
                                [classes.hide]: !open,
                                [classes.marginIcon]: !open,
                            })}>
                            <h4
                                style={{ marginLeft: '10px', color: 'gray' }}>Build Info</h4>
                            {['2021 Dec 30, 5:33:15 PM'].map((text, index) => (
                                <ListItem button key={text}><ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar2} />
                    <div style={{ display: 'inline-flex', cursor: 'pointer' }}>
                        {props.selectedComponent !== 'Dashboard' && props.selectedComponent !== 'Live' &&<p style={{ color: 'darkblue' }} onClick={() => props.setSelectedComponent('Dashboard')}>Home &nbsp; {' > '}&nbsp;</p>}
                        {props.selectedComponent !== 'Dashboard' && props.selectedComponent !== 'Live' && <p onClick={() => props.setSelectedComponent(props.selectedComponent)}> {props.selectedComponent}</p>}
                    </div>
                    {props.selectedComponent === 'Dashboard' && props.dashboard}
                    {props.selectedComponent === 'Requests' && props.requests}
                    {props.selectedComponent === 'Calendar' && props.calander}
                    {props.selectedComponent === 'MyAccount' && props.myaccount}
                    {props.selectedComponent === 'Live' && props.map}
                    {props.selectedComponent === 'Shop' && props.shop}
                    {props.selectedComponent === 'Clients' && props.client}
                    {props.selectedComponent === 'Employees' && props.employee}
                    {props.selectedComponent === 'Reports' && props.reports}
                    {props.selectedComponent === 'Inventory' && props.inventory}
                    {props.selectedComponent === 'Manage Pricing' && props.managePricing}
                    {props.selectedComponent === 'Orders' && props.orders}
                    {props.selectedComponent === 'Advertising' && props.advertising}
                    {props.selectedComponent === 'Feedback' && props.feedback}
                </main>
            </div>
        </Fragment>
    )
}
