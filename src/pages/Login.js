import React, { useState, useEffect } from 'react';
import { getToken } from '../apiCalls';
import Button from 'react-bootstrap/Button';

// change and reset password

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);

    const handleSubmit= async (event) => {
        event.preventDefault();
        await getToken(username, password)
            .then(res => {
                console.log(res);
                if (res.data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', res.data.key);
                    localStorage.setItem('username', username);
                    window.location.replace('http://localhost:3000');
                } else {
                    localStorage.clear();
                    setErrors(true);
                }
            }).catch((e) => setErrors(true))
    }

    return (
        <div>
            {errors === true && <h2>Cannot log in with provided credentials</h2>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <input className="Creator-button" type="submit" value="Login" />
            </form>
            <Button href='/register' variant="success">
                Register new account
            </Button>
        </div>
    // <Button href={LOGIN_URI} variant="success">
    //     Log in to Spotify
    // </Button>
)};

export default Login;