import React from 'react';
import Multitabs from '../../components/MyAccount/Multitabs/Multitabs';
import MyAccountStyles from './MyAccountStyles';

export default function MyAccount() {
    const classes = MyAccountStyles();
    return (
        <div className={classes.bkGround}>

            <Multitabs/>

        </div>
    )
}
