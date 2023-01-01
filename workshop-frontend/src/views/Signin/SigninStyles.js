import { makeStyles } from "@material-ui/core";

const SigninStyles = makeStyles(theme => ({
    center: {

        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding:'40px',
        borderRadius: '10px',
        background:'white'
    },

    outer: {

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'rgb(255,255,255,.8)'
    },

    field: {
        paddingBlockEnd: '15px'
    },

    text: {
        width: '40vh'
    }
}));

export default SigninStyles;