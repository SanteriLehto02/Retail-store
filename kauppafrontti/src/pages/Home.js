import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import Loader from "./Loader";

export default function Home() {
  const [username, setUsername] = useState('');
  const [listings, setListings] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [noListings, setNoListings] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    fetchListingsAndImages();
  }, []);

  async function fetchListingsAndImages() {
    const randomlista = await fetchListingData();
    console.log("lista listings", randomlista);
    if (randomlista.length > 0) {
      setLoadingState(false);
      setListings(randomlista);
      setNoListings(false);
    } else {
      setLoadingState(false);
      setNoListings(true);
    }
  }

  async function fetchListingData() {
    const url = `http://localhost:3001/listing/10newest`;
    let randomlista = [];
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Data", data);
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const imageUrl = await fetchListingImage(data[i].id) || "/noimage.jpeg";
          const name = data[i].itemName || "noname";
          const location = data[i].location;
          const idlisting = data[i].id;

          randomlista.push({
            name,
            imageUrl,
            location,
            idlisting
          });
        }
      }
      return randomlista;
    } catch (error) {
      console.error("Error fetching listings:", error);
      return [];
    }
  }

  async function fetchListingImage(idlisting) {
    const link = `http://localhost:3001/images/download/${idlisting}`;
    try {
      const response = await fetch(link);
      const data = await response.json();
      return data[0]?.url;
    } catch (error) {
      console.error("Error fetching image:", error);
      return undefined;
    }
  }

  return (
    <div className="homecontainer">
      {noListings ? (
        <h1>No listings</h1>
      ) : loadingState ? (
        <Loader />
      ) : (
        <>
          <div className="categoriescontainer">
            <Link to="/category/Home and Garden">
              <img
                src='data:image/png;base64,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'
                alt="Home and Garden"
              />
            </Link>
            <Link to="/category/Clothing and Style">
              <img
                src="https://www.pinclipart.com/picdir/big/565-5656035_clothing-icon-png-clothes-logo-icon-png-clipart.png"
                alt="Clothing and Style"
              />
            </Link>
            <Link to="/category/Sports and Outdoor Activities">
              <img
                src="https://cdn3.iconfinder.com/data/icons/line/36/hiker-512.png"
                alt="Sports and Outdoor Activities"
              />
            </Link>
            <Link to="/category/Technology and Gadgets">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAY1BMVEX///8AAAD5+fnd3d05OTlISEhMTEzg4OBycnJeXl7y8vIrKyuGhoZaWlr8/PwREREaGho0NDRkZGRBQUGWlpavr6/FxcV+fn7Pz89VVVXs7Oy8vLwiIiKoqKi1tbWdnZ2Ojo6o2E+fAAADiElEQVRoge2Z2ZajIBBALVcEE9xDXGL//1dOaWvcwGA05/TM9H3pdDRXhAKq1DD+dq7mO2ipi4y4zm5cv/Y03C68iZ3ruLn9BhXqX7U9A3BL7w0EAbhtu68EePm676T3XIFbbJ5humBv3Fz+QHKKn8RjSolW0wfbOiC3vkcuMwwvnA/m3TTM+KCcD/IiWoTK12G5kWdI2c4XkU1o2rE8LFdQfFLu/cp/5b/y/1VuNrH1MTnuYEYn3/7pHjkV+ZTSBZa1Xwl6XC7capVd8JbKF0flOd9IYeR2bbmJmcQ9TW+YCzVpT+MAj4PAwSPH5JSBgydSAJaLAQaVMK4U99eDcg4+hoixSP66Jrtnya1ZGhBap8oNM7s9yb6DcEOebOdkw4mDXMKGPIyJDvCWXJsfJ49yz3qJJ97r853R8q/J66alFrNTzpDnk8IgnZanJ8i92TI/LR+vMfCX5eS2PAeI+1IJF+RgeqjGlU21TU25KuUl9vhwnXBePe4ooBXyB0CjkBtij5xK9rOmq8i+XQzi+cEisNkU3HaZhFaOw5+u5GQcNc+GSBWvw50Ekq+7AcVNzl8dwb3uuWjfATYflWQgad0oj1dHAKLnZ6JKBHpi+XGlHMONmLSnll19pK3DZd8r5LROMNm43Hsw9KpUmUAWcVt5a8ulgRxKZmWBy3bO2rxEtr4LmZz66Bqe7iRRB955tWq7SCK7Sxsq6YOhCCRyjCwnfz7e6VsRj5PqCdGYREv5ZP5MrsjgsoxHlLsXNXeZ/AvltJhDhQ2uRC6oGk/W5yiPkiU2l8q3FnZTIZcik5NAzU3RLSxZDb285ToDyggJrFHOS+M6x7AkfV5qyE37+65n8iWeRG5spkZ9UlR2tQvZL99m2EOxnhjn34ny9Xp3opxHS8Lz5DI+K18vr0VyVp8DSZcE1dvR0vGIkWzH9N8j77rIvn5GnrahgjlCgGnII1vQsP1yBmycPe3CbXSbhTRa7jvlXReEAxWCf7B7SLF4y0QbeVa1iefI+9e5zWn3bK2kfIZJWLhCer3dDVcgCPr57GKX+vXPdMEtilj98xcL0zlHp5TQpUDf859grDLOAdOoZ2MvAFrPQLTxgQ9pMU2Abyb/u0kBHv1HCyfnufJs7GdRjfvrOTw+KcciN+jz3Jq/eou5FwvXnPEF7DrrPYQ5XdX9cyMRAzDz+zfk9/RsN7Lvdf1P5w/j9lM4a4LB3AAAAABJRU5ErkJggg=="
                alt="Technology and Gadgets"
              />
            </Link>
            <Link to="/category/Automotive">
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/564/515/original/car-icon-vector.jpg"
                alt="Automotive"
              />
            </Link>
            <Link to="/category/Pets">
              <img
                src="https://static.thenounproject.com/png/11640-200.png"
                alt="Pets"
              />
            </Link>
            <Link to="/category/Hobbies and Crafts">
              <img
                src="https://static.thenounproject.com/png/3404169-200.png"
                alt="Hobbies and Crafts"
              />
            </Link>
            <Link to="/category/Travel and Adventure">
              <img
                src="https://cdn2.iconfinder.com/data/icons/travel-178/100/Adventure-01-1024.png"
                alt="Travel and Adventure"
              />
            </Link>
            <Link to="/category/Kids and Parents">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/720/392/original/parents-and-a-kid-icon-family-illustration-isolated-on-white-background-free-vector.jpg"
                alt="Kids and Parents"
              />
            </Link>
            <Link to="/category/Entertainment and Music">
              <img
                src="https://toppng.com/uploads/preview/music-player-icon-png-11552246948miugzadkxs.png"
                alt="Entertainment and Music"
              />
            </Link>
            <Link to="/category/Antique and Art">
              <img
                src="https://cdn1.iconfinder.com/data/icons/art-and-craft-3-solid/64/art-05-512.png"
                alt="Antique and Art"
              />
            </Link>
          </div>

          <div className="homelistingcontainer">
            {listings.map((listing) => (
              <Link
                to={`/listing/${listing.idlisting}`}
                key={listing.idlisting}
                className="listingdiv"
              >
                <div className="Homekuva">
                  <img src={listing.imageUrl} alt={listing.name} />
                </div>
                <div className="sijainti">
                  <h2>{listing.location}</h2>
                </div>
                <div className="tuotteennimi">
                  <h2>{listing.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
