
import React from 'react'
import { useUser } from '../context/useUser'
import { useNavigate } from "react-router-dom";
export default function Logout() {
    const { setUser } = useUser()
    const navigate = useNavigate();

    function loggingout(){
        setUser(null)
        localStorage.clear()
        alert("You are logged out")
        navigate("/")
    }
    
  return (
    <>
    <h2>Log out</h2>
    <button onClick={loggingout}>Log out</button>
    </>
  )
}