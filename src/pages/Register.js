import React, { useState, useEffect } from 'react';
import { register } from '../apiCalls';
import Button from 'react-bootstrap/Button';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password1, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordErrors, setPasswordErrors] = useState(null);
    const [dontMatch, setDontMatch] = useState(false);
    const [usernameError, setUsernameError] = useState(false);

    const handleSubmit= async (event) => {
        event.preventDefault();
        await register(username, password1, password2)
            .then(res => {
                if (res.data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', res.data.key);
                    localStorage.setItem('username', username);
                    window.location.replace('https://workout-manager-ss.herokuapp.com/');
                }
            }).catch((e) => {
                console.log(e)
                if (e.response.data.username) {
                    setPasswordErrors(null);
                    setDontMatch(false);
                    setUsernameError(true);
                } else if (e.response.data.password1) {
                    setUsernameError(false);
                    setDontMatch(false);
                    setPasswordErrors(e.response.data.password1.join(' '))
                } else if (e.response.data.non_field_errors) {
                    setPasswordErrors(null);
                    setUsernameError(false);
                    setDontMatch(true);
                }
            })
    }

    return (
        <>
            <div className="login-form">
                {passwordErrors !== null && <h2>{passwordErrors}</h2>}
                {usernameError === true && <h2>username already exists</h2>}
                {dontMatch === true && <h2>passwords dont match</h2>}
                <form onSubmit={handleSubmit}>
                    <label className='form-line'>
                        Enter Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label className='form-line'>
                        Enter Password:
                        <input type="password" value={password1} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <label className='form-line'>
                        Confirm Password:
                        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                    </label>
                    <input className="btn btn-primary login-button" type="submit" value="Register" />
                    <p>Already have an account? <Button className="login-button" href="/">Login</Button></p>
                </form>
            </div>
        </>
    )
}

export default Register;