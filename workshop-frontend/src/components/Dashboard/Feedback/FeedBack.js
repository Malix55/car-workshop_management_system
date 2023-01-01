import { IconButton, Typography } from '@material-ui/core';
import FeedbackIcon from '@material-ui/icons/Feedback';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import React from 'react'

export default function Feedback() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Typography
                        noWrap
                    // variant='h6'
                    >
                        Feedback
                    </Typography>
                </div>
                <div>
                    <IconButton style={{width:'25px', height:'25px'}}>{<SettingsBackupRestoreIcon style={{color:'#6792ef'}} />}</IconButton>
                </div>
            </div>

            <div style={{justifyContent:'center', marginBlockStart:'5%', alignItems:'center',textAlign:'center'}}>
                <FeedbackIcon style={{color:'rgba(4, 197, 232, .3)', width: '70px', height: '70px' }}/>
                <p style={{color:'darkgray'}}>No Feedback Yet</p>
            </div>
        </div>
    )
}
