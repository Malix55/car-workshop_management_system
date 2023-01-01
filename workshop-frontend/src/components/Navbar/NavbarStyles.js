import { makeStyles } from "@material-ui/core";

const NavbarStyles = makeStyles(theme => ({
    
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    navTop: {
        background:'rgb(88 123 206)',
    }
}));

export default NavbarStyles;