import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/useUser';
import "./Login.css";
export default function Login(){
    const { login } = useUser()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    

    async function loginkäsittely(){
        console.log("login");
        try {
            const data = {"username": username, "password": password}
            const response = await login(data)
        } catch (error) {
            console.error('Login error:', error.message);
        }
    
    };

    return(
        <div className='login'>
        <div className="Logincontainer">
            <h2>welcome back!</h2>
            <input className="Username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <p></p>
            <input className="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <p></p>
            <button className="loginbutton" onClick={loginkäsittely}> Login</button>
            <p></p>
        </div>
        <Link className='signButton' to="/signin"><button>Signin</button></Link>
        </div>
    )

}