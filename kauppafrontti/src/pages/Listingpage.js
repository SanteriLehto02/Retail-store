
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./Listingpage.css";
import Popup from "./Popup";

export default function Listingpage(){
    const { idlisting } = useParams();
    const [listings, setListings] = useState([])
    const [images, setImages] = useState([])
    const [imagesamount,setImagesAmount] = useState()
    const [imageSelected,setImageSelected] = useState(1)
    const [triggerState, setTrigger] = useState(false);
    const [listingiduser,setListingIduser] = useState("")
    const [messageText,setMessageText] = useState("")
    const [idowner,setIdowner] = useState("")
    const navigate = useNavigate();



    useEffect(() => {
        toimiskotalleen();
    }, [idlisting]); 

    async function toimiskotalleen() {
        const randomlista = await fetchdata();
        let imagedata = await fetchListingImage(idlisting);
        console.log(imagedata);
        if (imagedata.length < 1) {
            imagedata[0] = "/noimage.jpeg"
        }
        console.log(imagedata);
        
        console.log(randomlista);
        setListings(randomlista);
        setImages(imagedata)
        setImagesAmount(imagedata.length)
    }

    async function fetchdata(){
        
        const listingdata = await fetchListingdata(); 
        const idlisting = listingdata.id;
        const itemName = listingdata.itemName;
        const category = listingdata.category;
        const price = listingdata.price;
        const description = listingdata.description;
        const location = listingdata.location;
        const listedAt = formatDate(listingdata.listedAt)
        setListingIduser(listingdata.iduser)
        const name = await fetchname(listingdata.iduser)

       
       
       return [{idlisting,itemName,category,price,description,location,listedAt,name}]
      
    }
    async function fetchListingdata(){
        try {
            
            const url = `http://localhost:3001/listing/byid/${idlisting}`
            const response = await fetch(url)
            const data = await response.json()
            //console.log(data);
            return data
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchname(iduser){
        try {
            
            const url = `http://localhost:3001/user/byid/${iduser}`
            const response = await fetch(url)
            const data = await response.json()
            //console.log(data);
            return data.username
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchListingImage(id){
        //console.log(idlisting);
        const link = `http://localhost:3001/images/download/${id}`;
    
        try {
         
          const response = await fetch(link)
          const data = await response.json()
          const dataList = []
          for(let i = 0;i < data.length; i++){
            dataList.push(data[i].url)
          }
          //const imageUrl = data[0].url;
          return dataList
        } catch (error) {
          
        }
    }

    function switchImages(value){
        if (value === "<" & imageSelected > 1) {
            let num = imageSelected -1
            setImageSelected(num)
        }
        
        else if( value === ">" & imageSelected < imagesamount){
            let num = imageSelected + 1
            setImageSelected(num)
        }
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    async function sendMessage(idchat){
        if (localStorage.iduser != null) {
            
        
        if(localStorage.iduser != listingiduser){

        
        const message = {
            idsender: localStorage.iduser,
            idlisting: idlisting,
            idreceiver: listingiduser,
            messageText: messageText,
            state: "unread",
            idchat: idchat

            
        };
        //listedAt: "2024-05-27T12:00:00"
        const url = "http://localhost:3001/message/post";
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        };
        
        await fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                window.alert("message send")
                return response.json();
            })
            .then(data => {
                
                console.log('Success:', data );
                
                
            })
            .catch(error => {
                console.error('Error:', error);
            });

        }
        else{
            window.alert("can't send message to own listing")
        }
        }else{
            window.alert("you need to be logged in to send message")
            navigate("/login")
        }
    }
    async function testifcontacted() {
        try {
          const response = await fetch(`http://localhost:3001/chat/testifcontected/${localStorage.iduser}/${idlisting}`);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          // Since we're expecting a boolean, parse the response as text first
          const text = await response.text();
          
          // Convert the text to boolean
          const result = text === 'true';
          console.log("bolean from server: " + result);
          
          if (result) {
            window.alert("you have already contacted the listing")
            // Handle the case where the chat exists
          } else {
            console.log('Chat does not exist');
          let idchat = await createChat();
           if (idchat > 0) {
            sendMessage(idchat);
           }else{
            console.log("id chat does not exist");
            
           }
            
            // Handle the case where the chat does not exist
          }
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }
      
     async function createChat() {

        const chat = {
            idowner: listingiduser,
            idsender: localStorage.iduser,
            idlisting: idlisting
        };

        try {
            const response = await fetch('http://localhost:3001/chat/postchat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chat),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Chat created:', data);
            console.log('Chat id:', data.id);
            return data.id
        } catch (error) {
            console.error('Error creating chat:', error);
        }
    }
    
   
    
      
    
    return(
        
        <div className="listingpagecontainer">
        <div className="imagediv">
        <button value="<" className="button-left" onClick={() => switchImages("<")}>&lt;</button>
         <img src={images[imageSelected-1]}></img>
         <button value="<" className="button-right" onClick={() => switchImages(">")}>&gt;</button>
         <div className="imageamount">{imageSelected}/{imagesamount}</div>
        </div>
        {listings.length > 0 ? (
                <>
                    <h1>{listings[0].itemName}</h1>
                    <p>myydään</p>
                    <h4>{listings[0].price}</h4>
                    <button className="messagebutton" onClick={() =>setTrigger(true)}>Lähetä viesti</button>
                    <hr></hr>
                    <p>{listings[0].description}</p>
                    <p>{listings[0].location}</p>
                    <hr></hr>
                    <p>{listings[0].listedAt}</p>
                    <p>{listings[0].name}</p>
                </>
            ) : (
                <p>Loading...</p> 
            )}
            <Popup trigger={triggerState}>
                <>
                <textarea onChange={(e) =>setMessageText(e.target.value)}></textarea>
                <button className='popupnappit' onClick={() =>testifcontacted()}>sendMessage</button>
                <button className='popupnappit' onClick={() =>setTrigger(false)}>Close</button>
                </>
            </Popup>
        </div>
        
    )
}