import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
export default function Signin(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signinuser = async (username, password) => {
        try {
            // Make a POST request to the /login endpoint
            const response = await fetch('http://localhost:3001/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username: username,
                    password: password
                })
            });
            console.log("onnistu",response);
        } catch (error) {
            // Handle any errors that occur during the login process
            console.error('Error registering:', error.message);
            throw error;
        }
    };
    async function signkäsitely(){
        console.log("signin");
        try {
          const user =  await signinuser(username, password);
          console.log("registering was succesfull", user);
          alert("registering was succesfull");
          navigate("/login")
        } catch (error) {
            console.error('Failed to register:', error);
            alert("error registering")
        }
       
    }


    return(
        <div>
            <h2>Sign in</h2>
            <input className="Username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <p></p>
            <input className="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <p></p>
            <button className="loginbutton" onClick={signkäsitely}>sign in</button>
        </div>
    )
}