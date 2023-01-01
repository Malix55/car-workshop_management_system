import { makeStyles } from "@material-ui/core";

const TimeOffStyles = makeStyles(theme => ({
    info: {
        width: '100%',
        marginTop: '30px',
        // border: '1px solid darkgray',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '1vh',
        height: '150px',
        background: 'radial-gradient(circle, rgba(4,197,232,.04) 60%, #fafafa 38%)'

    },

    rightDiv: {
        marginLeft:'auto'
    }
}));

export default TimeOffStyles;