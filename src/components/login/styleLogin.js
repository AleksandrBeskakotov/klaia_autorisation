import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    textLogo: {
        marginBottom: '40px',
        fontWeight: "bold",
        fontSize: '120px'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px'
        
    },
    form: {
        textAlign: 'center'
    },
    textField: {
        marginBottom: '15px',
        minWidth: '280px',
    },
    signInButton: {
        marginTop: '35px',
        backgroundColor:'#ffcd38', 
        color:"#fff",
        minWidth: '280px'
    }
});

export default useStyles;