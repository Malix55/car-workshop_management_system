import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MultitabsStyles from './MultitabsStyles';
import clsx from 'clsx';
import ManageOrders from './‏‏‏‏ManageOrders/ManageOrders';
import OrderReports from './OrderReports/OrderReports';
// import HeapMap from './HeatMap/HeatMap';
// import HeatMap from './HeatMap/HeatMap';
// import Reports from './Reports';

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



export default function OrdersMultitab() {
    const classes = MultitabsStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue - 1);
    };

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
                    <LinkTab className={classes.insideTabLeft} label={(value === 0 && 'Manage Orders') || (value === 1 && 'Order Reports') } />
                    <LinkTab
                        label="Manage Orders" href="/drafts" {...a11yProps(0)}
                        className={clsx({
                            [classes.insideTabRight]: true,
                            [classes.rightAlign]: true,
                        })}
                    />
                    <LinkTab className={classes.insideTabRight} label="Order Reports" href="/trash" {...a11yProps(1)} />
                    {/* <LinkTab className={classes.insideTabRight} label="Heat Map" href="/spam" {...a11yProps(2)} /> */}
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} >
                <ManageOrders />
            </TabPanel>
            <TabPanel value={value} index={1} >
                <OrderReports />
            </TabPanel>
            <TabPanel value={value} index={2} >
                {/* <HeatMap /> */}
            </TabPanel>

        </div>
    );
}