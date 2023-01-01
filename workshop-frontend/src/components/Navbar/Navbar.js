import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AvatarMenu from './AvatarMenu';
import NavbarStyles from './NavbarStyles';


export default function Navbar(props) {
    const classes = NavbarStyles();

    return (
        <div className={classes.navTop}>

            <AppBar position="fixed" className={classes.navTop}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    </Typography>

                    <div>
                        <AvatarMenu
                            selectedComponent={props.selectedComponent}
                            setSelectedComponent={props.setSelectedComponent}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
