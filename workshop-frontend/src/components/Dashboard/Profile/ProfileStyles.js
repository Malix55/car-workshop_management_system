import { makeStyles } from "@material-ui/core";

const ProfileStyles = makeStyles(theme => ({

    profilebar: {
        paddingBlock: '3vh',
        padding: theme.spacing(0, 1),
    },
    vl: {
        borderLeft: '1px solid rgb(88 123 206) ',
        height: '100%'
    },
    listItem: {
        fontSize:'12px',
        // width:'12px',
        height:'39px'
    }
}));

export default ProfileStyles;