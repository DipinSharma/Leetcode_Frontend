import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Container, Typography } from '@mui/material';
import { apiClient } from '../../../shared/services/api-client';
import { useSignUp } from '../../../shared/hooks/useSignUp';
import { useLogout } from '../../../shared/hooks/useLogout';
import { Link } from 'react-router-dom';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username,setUsername]=useState('')
    const { signUp, error, isLoading } = useSignUp();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signUp(email, password, name,username);
    }
    return (
        <div className='loginParent'>

        <Container className='Login'>
            <div className='innerLogin'>
                <Typography variant='h3'>SignUp</Typography>
                <TextField id="outlined-basic" label="Email" variant="outlined" type='email' onChange={e => setEmail(e.target.value)} value={email} />
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} value={password} />
                <TextField id="outlined-basic" label="Name" variant="outlined" onChange={e => setName(e.target.value)} value={name} />
                <TextField id="outlined-basic" label="UserName" variant="outlined" onChange={e => setUsername(e.target.value)} value={username} />
                <Button disabled={isLoading} variant="contained" onClick={handleSubmit}>SignUp</Button>
                {error && <div className='error'>{error}</div>}
                <Typography variant='p' color={'darkgrey'}> already a user <Link to='/login'>login</Link></Typography>
                {/* <Button onClick={handleClick}>Logout</Button> */}
            </div>
        </Container>
        </div>

    )
}
