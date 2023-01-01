import { createTheme, makeStyles } from "@material-ui/core";


const values = {
    xs: 50,
    sm: 100,
    md: 1070,
    lg: 1200,
    xl: 1450
};

const theme = createTheme({
    palette: {
        primary1: {
            main: "#000000"
        },
        secondary2: {
            main: "#9f9f9f"
        },
    },
    breakpoints: {
        keys: ["xs", "sm", "md", "lg", "xl"],
        up: (key) => `@media (min-width:${values[key]}px)`
    }
});

const DashboardHomeStyles = makeStyles(theme => ({
    // root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     '& > *': {
    //       margin: theme.spacing(1),
    //       width: theme.spacing(16),
    //       height: theme.spacing(16),
    //     },
    //   },
    // content: {
    //     flexGrow: 1,
    //     marginInlineStart:'200px',
    //     // marginInlineStart:'-230px',
    //     padding: theme.spacing(3),
    // },
    paperBk: {
        width: '100%', background: 'white', height: '450px',
        boxShadow: '0px 0px 5px 6px rgba(0,0,0,0.05)',
        padding:'2vh 2vh'
    },
    paperBk1: {
        width: '100%', background: 'white', height: '270px',
        boxShadow: '0px 0px 5px 6px rgba(0,0,0,0.05)',
        padding:'2vh 2vh 0vh 2vh'
    },
    home1: {
        flex: 3,
    },
}));

export default DashboardHomeStyles;
export {
    theme
}