import React, { Fragment, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import DashboardHome from '../DashboardHome/DashboardHome';
import Requests from '../Requests/Requests';
import { CssBaseline } from '@material-ui/core';
import Calander from '../../components/Calander/Calander';
import MyAccount from '../MyAccount/MyAccount';
import Map from '../../components/Map/Map';
import Shop from '../../components/Shop/Shop';
import ClientsMultitabs from '../../components/ClientsMultitabs/Multitabs';
import Multitabs from '../../components/EmployeeMultitabs/Multitabs';
import ReportsMultitab from '../../components/Reports/ReportsMultitab';
import Inventory from '../../components/Inventory/Inventory';
import ManagePricing from '../../components/ManagePricing/ManagePricing';
import Orders from '../../components/Orders/Orders';
import Advertising from '../../components/Advertising/Advertising';
import Feedback from '../../components/Feedback/Feedback';

export default function Dashboard() {

    const [selectedComponent, setSelectedComponent] = useState('Dashboard');
    const selectedComponentHandler = (inp) => {
        setSelectedComponent(inp);
    }

    return (
        <Fragment>
            <CssBaseline />
            <Navbar
                selectedComponent={selectedComponent}
                setSelectedComponent={selectedComponentHandler}
            />
            <Sidebar
                selectedComponent={selectedComponent}
                setSelectedComponent={selectedComponentHandler}
                dashboard={<DashboardHome />}
                requests={<Requests />}
                calander={<Calander />}
                myaccount={<MyAccount />}
                map={<Map />}
                shop={<Shop />}
                client={<ClientsMultitabs />}
                employee={<Multitabs />}
                reports={<ReportsMultitab />}
                inventory={<Inventory />}
                managePricing={<ManagePricing />}
                orders={<Orders />}
                advertising={<Advertising />}
                feedback={<Feedback />}

            />
        </Fragment>
    )
}
