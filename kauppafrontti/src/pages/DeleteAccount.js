import React from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/useUser';
import "./DeleteAccount.css";
export default function DeleteAccount() {
    const { setUser } = useUser()
    const navigate = useNavigate();

    async function deleteAccount() {
        console.log(localStorage.iduser);
        
        const url = `http://localhost:3001/user/delete/${localStorage.iduser}`
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                console.log('user deleted successfully');
                setUser(null)
                localStorage.clear()
                alert('user deleted successfully')
                navigate("/")
                
            } else if (response.status === 404) {
                console.log('user not found');
              
            } else {
                console.error('Failed to delete user');
                
            }
        } catch (error) {
            
        }
        
    }
    
  return (
    <div>
    <button className='deleteAccountButton' onClick={() => deleteAccount()}>Delete Account</button>
    </div>
  )
}
