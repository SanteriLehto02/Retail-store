import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/useUser';
import "./Navbar.css";
export default function Navbar(){
    const { user } = useUser()

    useEffect (() => {
        const storedUsername = localStorage.getItem('username');
        console.log(localStorage.getItem('iduser'));
        console.log(storedUsername);
    }, []);
  
    return(
    <div className="Navbar">
    <nav>
        <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/addlisting">New listing</Link>
            </li>
            <li>
            <Link to="/messages">Messages</Link>
            </li>
            <li>
            <div id='logindiv'>
                <ul>
                    <li>
                        {localStorage.getItem('iduser') === null ? (
                            <Link to="/login">Kirjaudu</Link>
                            
                        ) : (
                            <Link to="/account">Account</Link>
                        )}
                    </li>
                </ul>
            </div>
            </li>
        </ul>

    </nav>
    </div>
    );
}