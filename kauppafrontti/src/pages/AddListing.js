import { useState } from "react";
import "./AddListing.css";

export default function AddListing(){
    const [images, setImages] = useState([]);
    const [itemName, setItemName] = useState("")
    const [itemCategory, setCategory] = useState("Home and Garden")
    const [itemPrice, setItemPrice] = useState("")
    const [itemlocation, setItemLocation] = useState("")
    const [itemDescription, setItemDescription] = useState("")
    const [lastListingId, setLastListingId] = useState("")



    async function listingToDatabase() {
        console.log("iduser: " + localStorage.iduser);
        console.log(itemName, itemCategory, itemPrice, itemlocation, itemDescription);
    
        try {
            // Wait for the listingCall to complete and get the listing ID
            const listingId = await listingCall(); // Make sure this is not undefined
            console.log("lastListingId before image call: " + listingId);
    
            if (listingId) { // Ensure listingId is valid
                // Call savingImagesToDatabase with the correct listing ID
                await savingImagesToDatabase(listingId);
            } else {
                console.error("Invalid listingId received.");
            }
        } catch (error) {
            console.error("Error in listingToDatabase:", error);
        }
    }

    async function listingCall() {
        const listing = {
            iduser: localStorage.iduser,
            itemName: itemName,
            category: itemCategory,
            price: itemPrice,
            description: itemDescription,
            location: itemlocation,
        };
    
        const url = "http://localhost:3001/listing/postlisting";
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listing)
        };
        
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            const listingId = data.id; // Ensure that 'id' is available in the response
            console.log("Success: ", listingId);
            return listingId; // Return the ID
        } catch (error) {
            console.error('Error:', error);
            throw error; // Propagate the error to handle it in the calling function
        }
    }
    

    async function savingImagesToDatabase(listingId) {
        const id = parseInt(listingId, 10); // Convert to number if needed
        if (isNaN(id)) {
            console.error("Invalid listingId: Not a number.");
            return;
        }
    
        console.log("listings id where image: ", id);
        let i = 0;
        while (images.length > i) {
            const file = images[i];
            const url = `http://localhost:3001/images/upload/${id}`;
    
            const formData = new FormData();
            formData.append('file', file);
    
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Parse JSON response
                console.log('File upload successful:', data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
            i++;
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
    
    return(
        <div className="addlistingcontainer">
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

            <button onClick={listingToDatabase}>Add Listing</button>
            {images.length > 0 && (
                <div className="image-preview">
                    <h3>Chosen images</h3>
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index}`}
                            className="preview-image"
                            onClick={() => deleteImage(index)}
                        />
                        
                    ))}
                    </div>
            )}

            <button onClick={ () => console.log(images)}>testinappi</button>
        </div>
    )
}