import { makeStyles } from "@material-ui/core";
// import Image from '../../images/home.jpg'

const DashboardStyles = makeStyles(theme => ({
    centerDiv: {
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        display:'flex',
        width:'100%',
        height:'100%',
        // display:'flex',
    },
    
    featured: {
        width: '50%',
        // marginTop:'.4%',
        borderRadius:'15%',
        height:'100%',
        // height:'20px',
        display: 'flex',
        // paddingLeft:'-100vh',
        // display:'flex',
        // position:'relative',
        // flexDirection:'row',
        // flexWrap:'nowrap',
        justifyContent:'space-evenly',
        // marginInline:'5%',
        // alignItems:'center',
        // textAlign:'cetner',
        
        // alignItems:'center',
        // textAlign:'center',
        background:'white'
    },

    featuredItem: {
        cursor:'pointer',
        width:'100%',
        height:'100%',
        // flex:1,
        background:'#6792ef0d',
        // margin:'5%',
        // display:'inline',
        // position:'relative',
        // flex: 1,
        // marginBlock: 0,
        paddingInline: '24px',
        paddingBlock: '20px',
        borderRadius: '10px',
        boxShadow: '1px 0px 9px 0px rgba(0,0,0,0.35)',
    },

    featuredTitle: {

    },

    featuredMoneyContainer: {
        marginBlock: '10px',
        // marginBlockStart:'18px',
        // display: 'flex',
        // alignItems: 'center',
    },

    featuredMoney: {
        fontSize: '30px',
        fontWeight: 'bold'
    },

    featuredMoneyRate: {
        // display: 'flex',
        alignItems: 'center',
        marginLeft: '20px',
        marginBlockStart:'5px'
    },

    featuredIconNegative: {
        fontSize: '25px',
        marginLeft: '5px',
        color: '#6792ef'
    },

    featuredIconPositive: {
        fontSize: '25px',
        marginLeft: '5px',
        color: '#6792ef'
    },

    featuredSub: {
        fontSize: '15px',
        color: 'grey',
    },
    


    
}))

export default DashboardStyles;


