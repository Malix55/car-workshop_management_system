import React from 'react';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Button } from '@material-ui/core';

export default function Contract() {
    return <div style={{ width:'100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{margin:'120px'}}>
            <ListAltIcon style={{width:'50px', height:'50px', color:'#587bce'}}/>
            <p style={{marginTop:'-5px'}}>Malix Abdullah! Manage here all of your contract's</p>
            <Button variant='contained' color="primary" style={{marginTop:'20px'}}>Add New Contract</Button>
        </div>
        <div>

        </div>
    </div>;
}
