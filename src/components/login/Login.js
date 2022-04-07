import { Button, Container, TextField, Typography, InputLabel, FormControl, OutlinedInput, IconButton, InputAdornment, FormHelperText} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';
import useStyles from './styleLogin';
import apiClient from '../../services/klaiaServices';
import { Alert } from '@material-ui/lab';

const Login = () => {
    
    const [email, setEmail] = useState({
        value: '',
        error: ''
    }); 
    const [password, setPassword] = useState({
        value: '',
        error: ''
    });
    const [errorMessage, setErrorMessage] = useState({
        value: ''
    });
    const [showPasswordSymbols, setShowPasswordSymbols] = useState(false);
    const [newSingInLoading, setNewSingInLoading] = useState(false)
    
    const checkEmail = (email) => {
        const checkParams = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;//eslint-disable-line   
        return checkParams.test(String(email).toLowerCase());
    }

    const postData = async () => {
        try {
            const res = await apiClient.post("/user/sessions", {
            session:{
                platform_type: 'web'
            }, email: email.value, password: password.value});
            }
            
        catch (error) {
            setNewSingInLoading(false);
            setErrorMessage({
                value: error.response.data.error.message
            });
        }
    }

    const clearErrors = () => {
        setErrorMessage(({value: ''}));
        setEmail({...email, error: ''});
        setPassword({...password, error: ''});
    }

    const  singIn = (e) => {
        e.preventDefault();
        clearErrors();
        let hasError = false;
        
        if (!checkEmail(email.value)) {
            hasError = true;
            setEmail(({...email, error: "Invalid email"}));
        } 
        if (password.value.length < 5) {
            hasError = true
            setPassword({...password, error: "Password cannot be empty or <5 characters"});
        } 
        if (hasError) return;

        setNewSingInLoading(true);
        postData();
    }

    const handleClickShowPassword = () => {
        setShowPasswordSymbols(!showPasswordSymbols);
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
                value={email.value}
                onChange={(e) => {setEmail({...email, value: e.target.value})}}
                error={email.error}
                helperText={email.error}
            />
            <FormControl  className={classes.textField} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPasswordSymbols ? 'text' : 'password'}
                    value={password.value}
                    onChange={(e) => {setPassword({...password, value: e.target.value})}}
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
                <FormHelperText className={classes.formHelperText} id="outlined-weight-helper-text">{password.error}</FormHelperText>
            </FormControl >
            <Button type="Submit" disabled={newSingInLoading}  size='large' className={classes.signInButton} variant="contained">Sign In</Button>
            {errorMessage.value && <Alert className={classes.alert} severity="error">{errorMessage.value}</Alert>}
        </form>
    </Container>
    )
}

export default Login;



