
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Account.css";
import Loader from "./Loader";


export default function Account(){
    const[listings, setListings] = useState([])
    const [messages, setMessages] = useState([])
    const [messageInfo, setMessageInfo] = useState([])
    const [triggerState, setTrigger] = useState(false);
    const [idchatForMessage,setIdchatForMessage] = useState("")
    const [newMessage, setNewMessage] = useState("")
    const [idlisting,setidlisting]   = useState("")
    const [loadingState,setLoadingState] = useState(true)


    useEffect(() => {
        
       käsittely();
      
       console.log(listings);
       setLoadingState(false)
    }, []);
    


    async function käsittely(){
       let response =  await getUrListings()
        //console.log(response);
        setListings(response)
        
    }
    async function getUrListings(){
        let randomlista = []
        try {
            const url = `http://localhost:3001/listing/byiduser/${localStorage.iduser}`
            console.log(url);
            let i = 0
            const response = await fetch(url)
            const data = await response.json()
            console.log(data);
            while(i < data.length){
                let imageUrl = await fetchListingImage(data[i].id)
                if(imageUrl === undefined){
                    imageUrl = "/noimage.jpeg"
                }
                let name = data[i].itemName
                if(name === ""){
                    name = "noname"
                }
                let idlisting = data[i].id
                let location = data[i].location
                let price = data[i].price
                
               // console.log(unreadmessagesvalue);
                
                i++
                randomlista.push({
                    name,
                    idlisting,
                    location,
                    imageUrl,
                    price,
                    
                    

                })
    
            }
            return randomlista
        } catch (error) {
            throw error
        }
        
    } 
    
    async function fetchListingImage(idlisting){
        //console.log(idlisting);
        const link = `http://localhost:3001/images/download/${idlisting}`;
    
        try {
         
          const response = await fetch(link)
          const data = await response.json()
          const imageUrl = data[0].url;
          return imageUrl
        } catch (error) {
          
        }
      }

    
    
    async function getSendername(id){
        try {
            const link = `http://localhost:3001/user/byid/${id}`;
            const response = await fetch(link)
          const data = await response.json()
         
          return data.username
        } catch (error) {
            
        }
    }
    
    return (
        <div className="page-container">
          {loadingState ? (
            <Loader />
          ) : (
            <div className="content-container">
              <h2>Account</h2>
              <p>Manage listings</p>
              <div className="ownlistings">
                {listings.map((listing, index) => (
                  <Link
                    to={`/ownlisting/${listing.idlisting}`}
                    key={index}
                    className="listingdiv"
                  >
                    <div>
                      <img src={listing.imageUrl} alt="movieimge" />
                    </div>
                    <div className="tuotteennimi">
                      <h2>{listing.name}</h2>
                    </div>
                    {listing.unreadmessagesvalue > 0 && (
                      <Link to={"/"}>
                        <p className="unreadmessages">{listing.unreadmessagesvalue}</p>
                      </Link>
                    )}
                  </Link>
                ))}
              </div>
              <h2>Listings Contacted</h2>
              <div>
                <h2>Messages</h2>
                {messageInfo.map((messageInfo, index) => (
                  <div
                    className="messagebox"
                    onClick={() => {
                      setTrigger(true);
                      
                    }}
                  >
                    <h3 className="mesagesender">{messageInfo.username}</h3>
                    {messageInfo.sender === "you" && messageInfo.messageState === "read" ? (
                      <div className="checkmark green">&#10003;</div>
                    ) : null}
                    {messageInfo.sender === "you" && messageInfo.messageState === "unread" ? (
            <div className="checkmark light-grey">&#10003;</div>
                    ) : null}
                    <h5>{messageInfo.latstMessage}</h5>
                    {messageInfo.sender !== "you" ? (
               <h5 className="messagestatus">{messageInfo.messageState}</h5>
                    ) : null}
                </div>
                ))}
           </div>
            <Link to={"/addlisting"}>
                <button>Add listing</button>
            </Link>
            <Link to={"/logout"}>
                <button>Log out</button>
            </Link>
            <Link to={"/deleteaccount"}>
                <button>Delete Account</button>
            </Link>
           
            </div>
          )}
        </div>
      );
      
}