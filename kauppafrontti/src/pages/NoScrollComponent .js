import React, { useEffect, useRef } from 'react';

const NoScrollComponent = () => {
    const noScrollRef = useRef(null);

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
        };

        const element = noScrollRef.current;

        if (element) {
            element.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (element) {
                element.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <></>
    );
};

export default NoScrollComponent;
