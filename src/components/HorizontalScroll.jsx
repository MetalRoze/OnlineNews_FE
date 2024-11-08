import React, { useState, useRef } from 'react';

const HorizontalScrollContainer = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const scrollContainerRef = useRef(null);

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.clientX - startX;
        scrollContainerRef.current.scrollLeft = scrollLeft - x;
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            ref={scrollContainerRef}
            style={{
                display: 'flex',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                cursor: 'grab',
                gap: '10px'
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            {children}
        </div>
    );
};

export default HorizontalScrollContainer;
