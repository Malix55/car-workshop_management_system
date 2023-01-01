import * as React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import {SigninContext} from '../../storage/SigninContext';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@material-ui/core';

export default function AvatarMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [isLoggedin, setIsLoggedin] = React.useContext(SigninContext)

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);
  const handleClick = (event) => {
    console.log(isLoggedin)
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorE2(null);
  };
  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="Help">
          <IconButton onClick={handleClick2} lg={{ ml: 2 }}>
            <HelpRoundedIcon style={{ color: 'white', fontSize: '47px' }} />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorE2}
          open={open2}
          onClose={handleClose2}
          onClick={handleClose2}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        // anchorOrigin={{ horizontal: 'right',  }}
        >
          <MenuItem style={{ width: '200px', }}>
            Adding Employees
          </MenuItem>
          <MenuItem>
            Adding Staff
          </MenuItem>
          <MenuItem >
            Account Settings
          </MenuItem>
        </Menu>


        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
            <Avatar sx={{ width: 40, height: 40 }} src={'#'} alt="Abdullah Makix" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      // anchorOrigin={{ horizontal: 'right',  }}
      >
        <MenuItem style={{ width: '200px', }}
          onClick={() => {
            props.setSelectedComponent('MyAccount')
          }}
        >
          <Avatar src={'#'} alt="Abdullah Makix" style={{ marginRight: '30px' }} /> My Account
        </MenuItem>
        <Divider />
        <MenuItem style={{ marginLeft: '10px', }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem style={{ marginLeft: '10px', }}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <span onClick={()=>{setIsLoggedin(false); localStorage.removeItem('token');}}>Logout</span>
        </MenuItem>
      </Menu>


    </React.Fragment>
  );
}