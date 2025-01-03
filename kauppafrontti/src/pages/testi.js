import React, { useState, useEffect } from 'react';

const ImageComponent = () => {
    const [image,setImage] = useState("http://localhost:3001/images/d5d8545d-3410-4861-a85f-a36a6f3d2b4e-testikuva1.jfif")

    return (
        <div>
            <img src={image} alt="Test Image" />
        </div>
    );
};

export default ImageComponent;