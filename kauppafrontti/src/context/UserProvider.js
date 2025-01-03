import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userid, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const login = async (data) => {
    console.log("testi");
    try {  
        const response = await fetch('http://localhost:3001/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                username: data.username,
                password: data.password
            })
        });
        
       

        if (response.ok) {
            const token = await response.text();
            if(token !== "Login failed"){
              const testi = await getIduser(data.username);
              alert("login was succesful");
              console.log(testi);
              setToken(token)
              console.log("userid userprovider:: "+ testi);
              
              setUser({ ...data, token: token, userid: testi });
              localStorage.setItem('username', data.username)
              localStorage.setItem('token', token)
              localStorage.setItem('iduser',testi)
              
              navigate(-1)
          }else{
            alert("login failed")
          }
            return token;
        } else {
            const errorText = await response.text();
            console.log('Error response text:', errorText);
            alert("login failed")
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('Error logging in:', error.message);
        throw error;
    }
};
/*
  async function getIduser(username){
    try {
      const url = `http://localhost:3001/user/${username}`;
      const data = await fetch(url);
      data = data.json()
      console.log(data);
      return data.id
    } catch (error) {
      console.log(error);
    }
  }
*/
async function getIduser(username) {
  try {
      const url = `http://localhost:3001/user/${username}`;
      //const url = `http://localhost:3001/user/sami`;
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data.id;
  } catch (error) {
      console.log('Error fetching user ID:', error);
  }
}
  return (
    <UserContext.Provider
      value={{ user, setUser, userid, token, login}}
    >
      {children}
    </UserContext.Provider>
  );
}