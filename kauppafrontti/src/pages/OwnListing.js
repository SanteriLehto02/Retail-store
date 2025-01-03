import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OwnListing.css";


export default function OwnListing(){
    const { idlisting } = useParams();
    const [images, setImages] = useState([]);
    const [itemName, setItemName] = useState("")
    const [itemCategory, setCategory] = useState("Home and Garden")
    const [itemPrice, setItemPrice] = useState("")
    const [itemlocation, setItemLocation] = useState("")
    const [itemDescription, setItemDescription] = useState("")
    const [lastListingId, setLastListingId] = useState("")
    const [messageInfo, setMessageInfo] = useState([])
    const [triggerState, setTrigger] = useState(false);
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [idchatForMessage,setIdchatForMessage] = useState("")
    const [oldImages,setOldImages] = useState([])
    const navigate = useNavigate();
    
    useEffect(() => {
       setteri()
       
    }, [idlisting]);

    
    async function setteri(){
        const response =  await fetchOriginalListing()
       setItemName(response.itemName)
        setCategory(response.category)
        setItemPrice(response.price)
        setItemLocation(response.location)
        setItemDescription(response.description)
        await  getImages(idlisting)
        const listingownerid = response.iduser;
        


       let idusers = await idsenderId(idlisting)
       
       let i = 0
       let messagepreinfo = []
       while (idusers.length > i){
          let idchat = idusers[i].idchat
          
          
         
         
            let sender = ""
          
         
          const username =   await getSendername(idusers[i].idsender)
          
          messagepreinfo.push({ username, sender,idchat });

          i++
       }
       setMessageInfo(messagepreinfo)
    }   
    async function listingToDatabase(){
       
        
       await listingCall();
       
       await savingImagesToDatabase()
        
       window.location.href = window.location.href;
        /*await getImages(idlisting)

        oldImages.forEach((image, index) => {
            console.log(`Item ${index}:`, {
                id: typeof image.id,
                idlisting: typeof image.idlisting,
                path: typeof image.path,
                url: typeof image.url
            });
        });
        
        */
    }

    async function listingCall(){
        const listing = {
            id: idlisting,
            iduser: localStorage.iduser,
            itemName: itemName,
            category: itemCategory,
            price: itemPrice,
            description: itemDescription,
            location: itemlocation,
            
        };
        //listedAt: "2024-05-27T12:00:00"
        console.log("listing updated");
        
        const url = "http://localhost:3001/listing/postlisting";
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listing)
        };
        
        await fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const lisitngidgamingid = data.id
                setLastListingId(lisitngidgamingid)
                console.log('Success:', lisitngidgamingid);
                setImages([])
                alert("Listing updated")
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
        
    }

    async function savingImagesToDatabase(){
        const id = idlisting
       
        let i = 0;
        while(images.length > i) {
         
            const file = images[i]
           
            const url = `http://localhost:3001/images/upload/${id}`;
            

            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await fetch(url,{
                    method: 'POST',
                    body: formData
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response;
                console.log('File upload successful:', data);
              // await setOldImages(prevOldImages => [...prevOldImages, data]);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
            i++
            
            
        }
    }
    

    async function getImages(id){
        try {
            const url = `http://localhost:3001/images/download/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log("old images data!!!!:" ,data);
            
            setOldImages(data)
            console.log("image data:",data);
            
        } catch (error) {
            
        }
    }
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prevImages => [...prevImages, ...files]);
        e.target.value = null; // Reset the file input
    };

    const deleteImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    }
    const nameChange = (e) =>{
        setItemName(e.target.value)
    }
    const categoryChange = (e) =>{
        setCategory(e.target.value)
    }    
    
   async function fetchOriginalListing(){
        try {
            
            const url = `http://localhost:3001/listing/byid/${idlisting}`
            const response = await fetch(url)
            const data = await response.json()
           
            return data
        } catch (error) {
            console.log(error);
        }
    }

    async function idsenderId(idlisting){
        const link = `http://localhost:3001/chat/${idlisting}`;
        let lista = []
        try {
            
            const uniqueSenders = new Set();
          const response = await fetch(link)
          const data = await response.json()
         
          let i = 0
          while (i < data.length) {
            const idsender = data[i].idsender
            const idchat = data[i].id
            lista.push({idsender, idchat})
            i++
          }
          
          return lista
          
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
  

    async function deleteListing() {
        const url = `http://localhost:3001/listing/delete/${idlisting}`
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                console.log('listing deleted successfully');
                // Handle the success case, update UI if necessary
            } else if (response.status === 404) {
                console.log('listing not found');
                // Handle the case where the item was not found
            } else {
                console.error('Failed to delete listing');
                // Handle other errors
            }
        } catch (error) {
            
        }
    }

    async function deleteImageFromDatabase(id) {
        // eslint-disable-next-line no-restricted-globals
        const confirmDelete = confirm("Do you want to delete this image?");
        
        if (confirmDelete) {
            try {
                const link = `http://localhost:3001/images/delete/${id}`;
                
                const response = await fetch(link)
                
                if (response.ok) {
                    console.log("Image deleted successfully");
                   await getImages(idlisting)
                    // Optionally, refresh your UI here
                    
                } else {
                    console.error("Failed to delete image:", response.statusText);
                }
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        } else {
            console.log("et poistanu"); // User canceled
        }
    }
    
    return(
        <div className="addlistingcontainer">
            <h1>Change listing info</h1>
            <div className="listingdata">
            <input value={itemName} onChange={nameChange} className="listingitem" placeholder="item name"></input>
            <select value={itemCategory} onChange={categoryChange} className="listingitem">
            <option value="Home and Garden">Home and Garden</option>
            <option value="Clothing and Style">Clothing and Style</option>
            <option value="Sports and Outdoor Activities">Sports and Outdoor Activities</option>

            <option value="Technology and Gadgets">Technology and Gadgets</option>

            <option value="Automotive">Automotive</option>

            <option value="Pets">Pets</option>

            <option value="Hobbies and Crafts">Hobbies and Crafts</option>

            <option value="Travel and Adventure">Travel and Adventure</option>
            <option value="Kids and Parents">Kids and Parents</option>

            <option value="Entertainment and Music">Entertainment and Music</option>

            <option value="Antique and Art">Antique and Art </option>
            </select>
            <input value={itemPrice} className="listingitem" placeholder="price"  onChange={(e) => setItemPrice(e.target.value)}></input>
            <input value={itemlocation}className="listingitem" placeholder="location" onChange={(e) => setItemLocation(e.target.value)}></input>
            <textarea value={itemDescription}className="listingitem" placeholder="description" type="text" onChange={(e) => setItemDescription(e.target.value)}></textarea>
           


            <input type="file" multiple onChange={handleImageChange} ></input>

            
            </div>

            <button onClick={listingToDatabase}>Update listing</button>
            {oldImages.length > 0 && (
                <div className="image-preview">
                    <h3>Old images</h3>
                    {oldImages.map((oldimage, index) => (
                        <img
                            key={index}
                            src={oldimage.url}
                            alt={index}
                            className="preview-image"
                            onClick={async () => deleteImageFromDatabase(oldimage.id)}
                        />
                        
                    ))}
                    </div>
            )}
            {images.length > 0 && (
            <div className="image-preview">
                <h3>Newly Chosen Images</h3>
                {images.map((image, index) => (
                    <img
                        key={`new-${index}`}
                        src={URL.createObjectURL(image)}  // Display preview of new images
                        alt={`New Preview ${index}`}
                        className="preview-image"
                        onClick={() => deleteImage(index)}
                    />
                ))}
            </div>
            )}
    

            
            <button onClick={ () => console.log(images)}>testinappi</button>
            <button onClick={() => deleteListing()}>Delete listing</button>
            
            
        </div>
        
    )
    
}