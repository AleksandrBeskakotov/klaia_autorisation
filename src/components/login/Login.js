import { Button, Container, TextField, Typography, InputLabel, FormControl, OutlinedInput, IconButton, InputAdornment, FormHelperText} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';
import useStyles from './styleLogin';
import apiClient from '../../services/klaiaServices';
import { Alert } from '@material-ui/lab';

const Login = () => {
    
    const [email, setEmail] = useState({
        email: '',
        error: false,
        errorMessage: ''
    }); 
    const [password, setPassword] = useState({
        password: '',
        error: false,
        errorMessage: ''
    });
    const [showPasswordSymbols, setShowPasswordSymbols] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        error: false,
        message: ''
    }); 

    const checkEmail = (email) => {
        const checkParams = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;//eslint-disable-line
        console.log(checkParams.test(String(email).toLowerCase()));
        return checkParams.test(String(email).toLowerCase());
    }

    const postData = async () => {
        try {
            const res = await apiClient.post("/user/sessions", {
            session:{
                platform_type: 'web'
            },email: email.email,password: password.password});
            console.log(res);
            }
            
        catch (error) {
            setErrorMessage(
                {
                    error: true, 
                    message: error.response.data.error.message
                });
            console.log(error.response.data.error.message);
            }
    }

    const clearErrors = () => {
        setErrorMessage(({error: false, message: ""}));
        setEmail({...email, errorMessage: "", error: false});
        setPassword({...password, errorMessage: "", error:false});
    }

    const  singIn = (e) => {
        e.preventDefault();
        clearErrors();
        
        
        if (!checkEmail(email.email)) {
            setEmail(({...email, errorMessage: "Invalid email", error: true}));
        } 
        if (password.password.length < 5) {
            setPassword({...password, errorMessage: "Password cannot be empty or <5 characters", error: true});
        } 
        
        if (checkEmail(email.email) && password.password.length > 5) {
            postData();
        }
        console.log(email, password);
    }

    const handleClickShowPassword = () => {
        setShowPasswordSymbols(!showPasswordSymbols);
        console.log(email, password);
    }    

    const classes = useStyles();

    return(
        <Container maxWidth="sm"  className={classes.container}>
        <form className={classes.form} onSubmit={(e) => singIn(e)}>
        <Typography className={classes.textLogo} variant="h1">klaia</Typography>
            <TextField 
                className={classes.textField}
                autoFocus
                id="email" 
                label="Email" 
                variant="outlined" 
                type="email"
                value={email.email}
                onChange={(e) => {setEmail({...email, email: e.target.value})}}
                error={email.error}
                helperText={email.errorMessage}
            />
            <FormControl  className={classes.textField} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPasswordSymbols ? 'text' : 'password'}
                    value={password.password}
                    onChange={(e) => {setPassword({...password, password: e.target.value})}}
                    label="Password"
                    error={password.error}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        >
                        {showPasswordSymbols ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }            
                />
                <FormHelperText className={classes.formHelperText} id="outlined-weight-helper-text">{password.errorMessage}</FormHelperText>
            </FormControl >
            <Button type="Submit"  size='large' className={classes.signInButton} variant="contained">Sign In</Button>
            {errorMessage.error && <Alert className={classes.alert} severity="error">{errorMessage.message}</Alert>}
        </form>
    </Container>
    )
}

export default Login;



