import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./CategoryPage.css"
export default function CategoryPage(){
    const { category } = useParams();
    const [listings,setListings] = useState([])

    useEffect(() => {
        fetchListingsAndImages()
        
        
      }, []);
    async function fetchListingsAndImages(){
        // console.log("fetchii");
         const randomlista = await fetchListingdata()
         console.log(randomlista);
         setListings(randomlista)
    }
    async function fetchListingdata(){
        
        const url = `http://localhost:3001/listing/bycategory/${category}`
        let randomlista = []
        try {
          let i = 0
          const response = await fetch(url)
          const data = await response.json()
          console.log(data);
          let name = data.itemName
          console.log("??");
          while(i < data.length){
            console.log("???");
            
            let imageUrl = await fetchListingImage(data[i].id)
            if(imageUrl === undefined){
              imageUrl = "/noimage.jpeg"
            }
            
            let name = data[i].itemName
            if(name === ""){
              name = "noname"
            }
            let location = data[i].location
            // console.log(name);
            //console.log(imageUrl);
            let idlisting = data[i].id
            console.log(name,
                imageUrl,
                location,
                idlisting);
                console.log("?");
                
            i++ 
           
            
            randomlista.push({
              name,
              imageUrl,
              location,
              idlisting
            })
            
          }
          console.log(randomlista);
          
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
    return(
        <div>
            
            <h1 className="categoryH1">{category}</h1>
            <div className="homelistingcontainer">
        {listings.map((listing, index) => (
        <Link to={`/listing/${listing.idlisting}`} key={index} className="listingdiv">
          <div className="kuva">
            <img src={listing.imageUrl} alt="movieimge" />
          </div>
          <div className="sijainti"><h2>{listing.location}</h2></div>
          <div className="tuotteennimi"><h2>{listing.name}</h2></div>
        </Link>
      ))}
      </div>
        </div>
    )
}