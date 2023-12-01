import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Container, Typography } from '@mui/material';
import { apiClient } from '../../../shared/services/api-client';
import { useLogin } from '../../../shared/hooks/useLogin';
import { useLogout } from '../../../shared/hooks/useLogout';
import { useAuthContext } from '../../../shared/hooks/useAuthContext';
import { Link } from 'react-router-dom';

export const Login = () => {

    // const [message, setMessage] = useState("");
    // const emailRef = useRef();
    // const passwordRef = useRef();
    // const doLogin = async () => {
    //     const userInfo = {
    //         email: emailRef.current.value,
    //         password: passwordRef.current.value,
    //     }
    //     try {
    //         const response = await apiClient.post(process.env.REACT_APP_LOGIN, userInfo);
    //         setMessage(response.data.message);

    //         console.log("response is", response);
    //         console.log("user Info ", userInfo);
    //     }
    //     catch (err) {
    //         console.log("error is ", err);
    //     }
    // }
    // return (
    //     <Container>
    //         <Typography>Login</Typography>
    //         <TextField id="outlined-basic" label="Email" variant="outlined" inputRef={emailRef} />
    //         <TextField id="outlined-basic" label="Password" variant="outlined" type="password" inputRef={passwordRef} />
    //         <Button variant="contained" onClick={doLogin}>Register</Button>
    //         <p>{message}</p>
    //     </Container>
    // )
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, error, isLoading } = useLogin();
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        // e.preventDefault();
        await login(email, password);
    }
    const handleClick = () => {
        logout();
    }
    return (
        <div className='loginParent'>
        <Container className='Login'>
            <div className='innerLogin'>
                <Typography variant='h3'>Login</Typography>
                <TextField id="outlined-basic" label="Email" variant="outlined" type='email' onChange={e => setEmail(e.target.value)} value={email} />
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} value={password} />
                <Button variant="contained" onClick={handleSubmit}>Login</Button>
                {error && <div className='error'>{error}</div>}
                <Link to='/signIn'>sign In</Link>
                {/* <Button onClick={handleClick}>Logout</Button> */}

            </div>
        </Container>
        </div>
    )
}
