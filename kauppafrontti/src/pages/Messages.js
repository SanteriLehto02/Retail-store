import { useEffect, useState } from "react";
import Loader from "./Loader";
import "./Messages.css";
import Popup from "./Popup";
export default function Messages() {
  const [listings, setListings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInfo, setMessageInfo] = useState([]);
  const [triggerState, setTrigger] = useState(false);
  const [idchatForMessage, setIdchatForMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [socket, setSocket] = useState(null);
  const [chatsIdlisting, setChatsIdlisting] = useState("")
  const [idreceiver, setIdreceiver] = useState("")
  const [messageSentTo, setMessageSentTo] = useState("")
  const [currentListingId, setCurrentListingId] = useState("")
// seuraavaksi idreciever oikein ku lähettää socekilla viestin!!!!
  useEffect(() => {
    käsittely();
    messageSetter();
  }, []);

  async function käsittely() {
    let response = await getUrListings();
    console.log("response:", response);
    
    setListings(response);
  }

  async function getUrListings() {
    let randomlista = [];
    try {
      const url = `http://localhost:3001/listing/byiduser/${localStorage.iduser}`;
      console.log(url);
      let i = 0;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      while (i < data.length) {
        let name = data[i].itemName || "noname";
        let idlisting = data[i].id;
        let location = data[i].location;
        let price = data[i].price;
        //let unreadmessagesvalue = await unreadMessages(idlisting);
        let imageData = await getListingImage(idlisting)

        let listingChatsInfo = await getListinChats(idlisting)
        console.log("listingChats: ", listingChatsInfo);
        
        //let listingChatsInfo = []



        console.log("imageData:",imageData);
        
        let imageUrl = imageData[0].url
        console.log(data[i]);
        
        console.log("iamgeUrl:",imageUrl);
        /*
        if (unreadmessagesvalue !== 0) {
          console.log(unreadmessagesvalue);
        }
        */
        i++;
        randomlista.push({
          name,
          idlisting,
          location,
          price,
          imageUrl,
          listingChatsInfo
        });
      }

      return randomlista;
    } catch (error) {
      throw error;
    }
  }
  async function getListinChats(id) {
    const link = `http://localhost:3001/chat/${id}`;
    try {
      const response = await fetch(link)
      const data = await response.json()
      let firstMessage = getFirstMessageChat(data)
      console.log("firstMessage",firstMessage);
      
      return firstMessage
    } catch (error) {
      
    }
  }
  async function getFirstMessageChat(data) {
    let i = 0;
    console.log("äääääääääääääääääääääääääääääääääääääääääääääääääääääääääääääää", data);
    let firstMessages = [];
    
    while (i < data.length) {  // Corrected loop condition
      const link = `http://localhost:3001/message/chat/${data[i].id}`;
      let contacterName = await getSendername(data[i].idsender)
      try {
        const response = await fetch(link);
        const joo = await response.json();
        console.log("first message data", joo);
  
        // Make sure the response is not empty before accessing joo[0]
        if (joo.length > 0) {
          console.log("data.idsender", joo[0].idsender);
          
          // Fetch the sender's name
          let name = await getSendername(joo[0].idsender);
          console.log("name: ", name);
          
          // Add the name as a new property to the message object
          joo[0].senderName = name;
          joo[0].contacterName = contacterName;
          // Push the modified first message (with the sender's name) to the array
          firstMessages.push(joo[0]);
        }
        
        console.log("firstMessages:", firstMessages);
        i++;
      } catch (error) {
        console.error("Error fetching first message:", error);  // Log the error
      }
    }
    
    return firstMessages;
  }
  
  async function getListingImage(idlisting) {
    console.log(idlisting);
    idlisting = parseInt(idlisting)
    const link = `http://localhost:3001/images/download/${idlisting}`;
    try {
      const response = await fetch(link)
      const data = await response.json()
      console.log("image data og:",data);
      return data
    }catch(error){

    }
  }
  async function unreadMessages(idlisting){
    const link = `http://localhost:3001/message/${idlisting}`;
    try {
        const lista = []
      const response = await fetch(link)
      const data = await response.json()
      //console.log(data);
      let i = 0
      while (i < data.length) {
        if (data[i].state === "unread" & data[i].idreceiver == localStorage.iduser) {
            lista.push(data[i].state)
        }
        i++
      }
      //console.log(data.state);
      return lista.length
      
    } catch (error) {
      
    }
}
  async function messageSetter() {
    const idusers = await getUrListingContacts(localStorage.iduser);
    let i = 0;
    console.log("Listing I have contacted data: " + JSON.stringify(idusers, null, 2));

    
    let messagepreinfo = [];
    if (idusers.length > 0) {
      
    
    while (idusers.length > i) {
      let idchat = idusers[i].id;
      const latstMessageData = await getLatestMessage(idchat);
      console.log("mesage debug bruh"+latstMessageData);
      if (latstMessageData != "") {
        
     
      const latstMessage = latstMessageData[0].messageText;
      console.log("line 87 "+latstMessage);
      
      let messageState = latstMessageData[0].state;
      let idsender = latstMessageData[0].idsender;
      
      let sender = idsender === localStorage.iduser ? "you" : "him";
      console.log("idsender: " + idusers[i].idsender);
      const listingData = await getContactedListinginfo(idusers[i].idlisting) 
      console.log("listingData: "+ JSON.stringify(listingData, null, 2));
      const listingName = listingData.itemName
      const listingId = listingData.id
      if (idsender == localStorage.idsender) {
        console.log("gfdddddddddddddddddddddddddddddddddddddddddddddddddddddd",idsender);
        setIdreceiver(latstMessageData[0].iduser)
        
        
      }else{
        console.log("gfdddddddddddddddddddddddddddddddddddddddddddddddddddddd::    gfdddddddddddddddddddddddddddddddddddddddddddddddddddddd",idsender)
        setIdreceiver(idsender)
        
      }
      console.log("reciever:", idreceiver);
      
      const username = await getSendername(idsender);

      messagepreinfo.push({
        username,
        latstMessage,
        messageState,
        sender,
        idchat,
        listingName,
        listingId
      });
      }
      i++;
    }
    console.log("viestit: ",messagepreinfo);
    
    setMessageInfo(messagepreinfo);
    }
  }

  async function getSendername(id) {
    try {
      const link = `http://localhost:3001/user/byid/${id}`;
      const response = await fetch(link);
      const data = await response.json();
      return data.username;
    } catch (error) {
      console.error(error);
    }
  }

  async function getUrListingContacts(idsender) {
    try {
      const url = `http://localhost:3001/chat/idsender/${idsender}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("contacts data", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getContactedListinginfo(idlisting) {
    console.log("getContactedListinginfo: "+idlisting);
    
    try {
      const link = `http://localhost:3001/listing/byid/${idlisting}`;
      const response = await fetch(link);
      const data = await response.json();
      console.log("yeah :: "+data);
      
      return data;
    }catch{

    }
  }
  async function getLatestMessage(idchat) {
    try {
      const link = `http://localhost:3001/message/chat/${idchat}`;
      const response = await fetch(link);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function messagesData(idchat) {
    try {
      const link = `http://localhost:3001/message/chat/allmessages/${idchat}`;
      const response = await fetch(link);
      const data = await response.json();
      let lista = [];
      let i = 0;

      while (i < data.length) {
        const idsender = data[i].idsender;
        const messageTime = data[i].messageTime;
        const messageText = data[i].messageText;
        const idmessage = data[i].id;
        setChatsIdlisting(data[i].idlisting)
        console.log("data[i].idlisting: "+ data[i].idlisting);
        console.log("data[i]: "+ JSON.stringify(data[i], null, 2));
        
        console.log("line 153 "+messageText);
        i++;
        lista.push({ idsender, messageTime, messageText, idmessage });
      }
      return lista;
    } catch (error) {
      console.error(error);
    }
  }
  async function getCahtinfo(id) {
    const link = `http://localhost:3001/chat/chatid/${id}`;
    try {
      const response = await fetch(link)
      const data = await response.json()
      console.log("caht info data",data);
      
      
      return data
    } catch (error) {
      
    }
  }
  async function setChat(idchat,listingId) {
    setIdchatForMessage(idchat);
    
    console.log("idchat::::::::::::::::::::::",idchat);
    console.log("idchat::::::::::::::::::::::",idchat);
    console.log("idchat::::::::::::::::::::::",idchat);
    console.log("idchat::::::::::::::::::::::",idchat);
    console.log("idchat::::::::::::::::::::::",idchat);
    console.log("idchat::::::::::::::::::::::",idchat);

    let chatInfo = await getCahtinfo(idchat)
    console.log("chatInfo: ",chatInfo);
    if (chatInfo.idowner != localStorage.iduser) {
      setMessageSentTo(chatInfo.idowner)
    }else{
      setMessageSentTo(chatInfo.idsender)
    }
    setCurrentListingId(chatInfo.idlisting)
    const data = await messagesData(idchat);
    //setCurrentListingId(listingId)
    let i = 0;
    while (data.length > i) {
      await setAllMessagesToRead(data[i], idchat,listingId);
      i++;
    }
    //alustaa datan popup ikkunaan
    setMessages(data);
    console.log("messages for popup: " + JSON.stringify(messages, null, 2));

    
    setSocketConnection();
  }

  function setSocketConnection(){
    const ws = new WebSocket(`ws://localhost:3001/ws/messages?userId=${localStorage.iduser}`);
        
    ws.onopen = () => {
        console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        setMessages(prevMessages => [...prevMessages, receivedMessage]);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    setSocket(ws);

    return () => ws.close();
  }
  async function setAllMessagesToRead(data, idchat,listingId) {
    const sender = data.idsender;
    const id = data.idmessage;
    const messageTime = data.messageTime;
    const messageText = data.messageText;
    console.log("line 182: " + messageText)
    console.log("to read: " ,listingId);
    
    if (sender !== localStorage.iduser) {
      if (localStorage.iduser != null) {
        const message = {
          id: id,
          idsender: sender,
          messageText: messageText,
          idreceiver: localStorage.iduser,
          idlisting: listingId,
          state: "read",
          messageTime: messageTime,
          idchat: idchat,
        };

        const url = "http://localhost:3001/message/post";

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        };

        await fetch(url, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
          })
          .then(() => {
            setNewMessage("");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        window.alert("can't send message to own listing");
      }
    } else {
      console.log("own message");
    }
  }

  
  async function createChat() {
    //send message to socket and add it to the messages 
        /*
        idmessage: 296
        idsender: 29
        messageText: "moi"
        messageTime: "2024-09-21T0
        */
        
        const message22 = {
          idsender: localStorage.iduser,
          idlisting: currentListingId,
          idreceiver: messageSentTo,
          messageText: newMessage,
          state: "unread",
          idchat: idchatForMessage
   
      };
      console.log("message22: ",message22);
      
      const newestMessage = messages.length > 0 ? messages[messages.length - 1] : null;
      const newMessageToMessages = {
        idsender: localStorage.iduser,
        messageTime: getCurrentTimeWithOffset(),
        messageText: newMessage,
        idmessage: newestMessage + 1
      }
      socket.send(JSON.stringify(message22));
      setMessages((prevMessages) => [...prevMessages, newMessageToMessages]);
      
      setNewMessage("")
  }
  function getCurrentTimeWithOffset() {
    const now = new Date();
    
    const offsetMinutes = now.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const minutesPart = Math.abs(offsetMinutes) % 60;
    
    const sign = offsetMinutes > 0 ? '-' : '+';
    const formattedOffset = `${sign}${String(offsetHours).padStart(2, '0')}:${String(minutesPart).padStart(2, '0')}`;
    
    const localISOTime = now.toISOString().slice(0, -1);  // Remove the 'Z'
    
    return `${localISOTime}${formattedOffset}`;
  }
  
  async function sendMessage(){
    if (newMessage.length > 0) {
        
    
    if (localStorage.iduser != null) {
        
    
        
            
        

        
        const message = {
            idsender: localStorage.iduser,
            idlisting: 5,
            idreceiver: 13,
            messageText: newMessage,
            state: "unread",
            idchat: idchatForMessage

            
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
                
                
                setNewMessage("")
                
                
            })
            .catch(error => {
                console.error('Error:', error);
            });

        }
        else{
            window.alert("can't send message to own listing")
        }
        
    }else{
        window.alert("message is empty")
    }
}
  return (
    <div className="page-container">

      {loadingState ? (
        <Loader />
      ) : (
        <div className="content-container">
          <h1>{localStorage.username}</h1>
          <h2>Account</h2>
          <p>Manage listings</p>
          <div className="lisitingbacground">
          <div className="ownlistingsmessages">
            {listings.map((listing, index) => (
              <div className="kuvajatitle"  key={index}>
                <div className="kuva">
                <img src={listing.imageUrl} alt="movieimge" />
              </div><div className="tuotteennimi">
                  <h2>{listing.name}</h2>
                </div>
                <div className="otherSide">
                {listing.listingChatsInfo.flat().map((info, index) => (
                <div className="messagebox" key={index}
                onClick={() => {
                  setTrigger(true);
                  setChat(info.idchat,listing.id,);
                }}>
                    <h3 className="mesagesender">{info.contacterName}</h3>
                    <span className="message-sender-label">
                    
                      {info.idsender == localStorage.iduser ? "Me" : "Other"}
                    </span>
                    {info.idsender != localStorage.iduser ? (
                      info.messageState == "read" ? (
                        <div className="checkmark green">&#10003;</div>
                      ) : (
                        <div className="checkmark light-grey">&#10003;</div>
                      )
                    ) : null}
                          
                    <h5>{info.messageText}</h5>
                    <h5 className="messagestatus">{info.state}</h5>
                </div>
                ))}
            </div>
                </div>
            ))}
            
            </div>
          </div>

          <h2>Listings Contacted</h2>
          <div className="">
            <h2>Messages</h2>
            {messageInfo.map((info, index) => (
              <div
                key={index}
                className="messagebox"
                onClick={() => {
                  setTrigger(true);
                  setChat(info.idchat,info.listingId,);
                }}
              >
                <h3>{info.listingName}</h3>
                <h3 className="mesagesender">{info.username}</h3>
                {info.sender === "you" && info.messageState === "read" ? (
                  <div className="checkmark green">&#10003;</div>
                ) : null}
                {info.sender === "you" && info.messageState === "unread" ? (
                  <div className="checkmark light-grey">&#10003;</div>
                ) : null}
                <h5>{info.latstMessage}</h5>
                {info.sender !== "you" ? (
                  <h5 className="messagestatus">{info.messageState}</h5>
                ) : null}
              </div>
            ))}

            <Popup trigger={triggerState}>
              <div className="chat-container">
                <div className="messages-container">
                  {messages.map((message, index) =>
                    message.idsender != localStorage.iduser ? (
                      <div key={index} className="hismessagebox">
                        {message.messageText}
                      </div>
                    ) : (
                      <div key={index} className="youmessagebox">
                        {message.messageText}
                      </div>
                    )
                  )}
                </div>
                <div className="newmessage">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button onClick={() => createChat()}>Send</button>
                </div>
              </div>
              <p>tekstiä tähän</p>
              <button onClick={() => {setTrigger(false);setMessages([])}}>Close</button>
            </Popup>
          </div>
        </div>
      )}
    </div>
  );
  
}


