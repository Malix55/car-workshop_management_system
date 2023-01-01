import { makeStyles } from "@material-ui/core";

const MultitabsStyles = makeStyles(theme => ({

    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    rightAlign: {
        marginLeft: 'auto',
    },
    appBar: {
        background:'white',
        color:'black',
        paddingTop:'15px',
        paddingRight:'15px',
        boxShadow:'none',
        border:'1px rgb(0,0,0,.1) solid',
    },
    tabs: {
        
    },
    insideTabLeft: {
        // border: '1px solid',
        fontSize:'12px',
        fontWeight:'bold',
        color:'blue'
        
    },
    insideTabRight: {
        borderRight: '1px solid lightblue',
        borderLeft: '1px solid lightblue',
        borderTop: '1px solid lightblue',
        fontSize:'12px',
        borderRadius:'.5vh',
        
        borderBlockEnd:'2px white solid'
    },
    addedTabs: {
    }
}));

export default MultitabsStyles;