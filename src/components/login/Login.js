import { Button, Container, TextField, Typography, InputLabel, FormControl, OutlinedInput, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';
import useStyles from './styleLogin';
import apiClient from '../../services/klaiaServices';

const Login = () => {

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [showPasswordSymbols, setShowPasswordSymbols] = useState(false);

    const singIn = async(e) => {
    e.preventDefault();
    console.log(email, password);
    
    try {
        const res = await apiClient.post("/user/sessions", {
        session:{
            platform_type: 'web'
        }, email,password});
        console.log(res);
        }
        
        catch (err) {
        console.log(err.responce);
        }
    }

    const handleClickShowPassword = () => {
        setShowPasswordSymbols(!showPasswordSymbols);
    }    

    const classes = useStyles();

    return(
        <Container maxWidth="sm"  className={classes.container}>
        <form className={classes.form} onSubmit={singIn}>
        <Typography className={classes.textLogo} variant="h1">klaia</Typography>
            <TextField 
                className={classes.textField}
                autoFocus
                id="email" 
                label="Email" 
                variant="outlined" 
                type="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
            />
            <FormControl className={classes.textField} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPasswordSymbols ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
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
                    label="Password"
                />
            </FormControl>
            <Button type="Submit"  size='large' className={classes.signInButton} variant="contained">Sign In</Button>
        </form>
    </Container>
    )
}

export default Login;



