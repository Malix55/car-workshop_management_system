import { makeStyles } from "@material-ui/core";
const drawerWidth = 260;

const SigninStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    test: {
        zIndex: theme.zIndex.drawer +3,
        backgroundColor: 'rgb(255,255,255)',
        marginBlockEnd:'900vh',
        position:'fixed'
    },
    appBar: {
        zIndex: theme.zIndex.drawer - 1,
        backgroundColor: 'rgb(42 90 180)',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: `${drawerWidth}px`,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: '-1px'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerIcon: {
        color: 'rgb(42 90 180)',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        paddingInlineStart: '15px',
        backgroundColor: '#6792ef',
        width: drawerWidth,
        paddingBlock:'11.5px',
        color: 'white',
        // justifyContent: 'flex-end',
        // padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    toolbarClose: {
        display: 'flex',
        alignItems: 'center',
        paddingInlineStart: '15px',
        backgroundColor: '#6792ef',
        width: '73px',
        paddingBlock:'11.5px',
        color: 'white',
        // justifyContent: 'flex-end',
        // padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    toolbar2: {
        display: 'flex',
        alignItems: 'center',
        paddingInlineStart: '20px',
        // justifyContent: 'flex-end',
        // padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    profilebar: {
        paddingBlock: '3vh',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: theme.spacing(0, 1),
    },
    drawerContent: {
        
        marginLeft: '10px',
        marginBlockStart: '25vh',
    },
    marginIcon: {
        marginBlockStart:'-1.5vh',
    },
    content: {
        flexGrow: 1,
        // marginInlineStart:'-230px',
        padding: theme.spacing(3),
    },
}));

export default SigninStyles;