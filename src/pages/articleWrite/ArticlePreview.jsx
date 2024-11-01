import React from 'react';
import { useLocation } from 'react-router-dom';

const ArticlePreview = () => {
    const location = useLocation();
    const { title, subtitle, content } = location.state || {};

    return (
        <div className='mobile-container'>
            <h2>{subtitle}</h2>
            <br />
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default ArticlePreview;
