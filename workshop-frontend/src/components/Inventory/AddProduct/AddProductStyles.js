import { createTheme, makeStyles } from "@material-ui/core";
// import Image from '../../images/home.jpg'
const values = {
    xs: 500,
    sm: 806,
    md: 960,
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

const AddProductStyles = makeStyles(theme => ({
    home: {
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        width:'50vh',
        height: '50vh',
    },
    form: {
        padding: '6vh',
        marginInline: '20%'
    },
    innerForm: {
        marginBlock: '.5vh',
        marginInline: '.5%'
    },

    innerFormDate: {
        marginBlock: '.5vh',
    },

    topContainer: {
        marginTop: '0px',
    },

    container: {
        display: 'flex',

    },

    home1: {
        flex: 3,
    },

    centerDiv: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        width: '100%',
        // marginTop:'5vh'
    },

    featured: {
        width: '100%',
        display: 'flex',
        // justifyContent: 'space-between'
    },

    featuredItem: {
        flex: 1,
        marginBlock: 0,
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '1px 0px 18px 0px rgba(0,0,0,0.75)',
    },
    button: {
        display: "block",
        marginLeft: 'auto'
    },

    featuredTitle: {

    },

    featuredMoneyContainer: {
        marginBlock: '10px',
        display: 'flex',
        alignItems: 'center',
    },

    featuredMoney: {
        fontSize: '30px',
        fontWeight: 'bold'
    },

    featuredMoneyRate: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20px'
    },

    featuredIconNegative: {
        fontSize: '25px',
        marginLeft: '5px',
        color: 'red'
    },

    featuredIconPositive: {
        fontSize: '25px',
        marginLeft: '5px',
        color: 'green'
    },

    featuredSub: {
        fontSize: '15px',
        color: 'grey',
    },


    chart1: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: '40px',
        // display: 'table',
        width: '89%',
        height: '100%',
        paddingBlock: '10px',
        marginInlineStart: '20px',
        paddingInline: '20px',
        boxShadow: '1px 0px 18px 0px rgba(0,0,0,0.15)',
    },
    chart2: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: '40px',
        // display: 'table',
        width: '89%',
        height: '80%',
        paddingBlock: '10px',
        marginInlineStart: '20px',
        paddingInline: '20px',
        boxShadow: '1px 0px 18px 0px rgba(0,0,0,0.15)',
    },

    chartTitle: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: '20px'
    },

    homeWidgets: {
        display: 'flex',
        marginTop: '30%',
    },

    widgetsm: {
        marginBlockStart: "40px",
        backgroundColor: 'white',
        boxShadow: '1px 0px 12px 0px rgba(0,0,0,0.25)',
        padding: '20px',
        marginInline: '20px'
    },

    checkBox: {
        width: 50,
        height: 20,
    },
}))

export default AddProductStyles;
export {
    theme
}

