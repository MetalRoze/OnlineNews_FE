import React, { useState, useEffect } from 'react';
import KakaoShare from '/src/utils/KakaoShare.jsx';
import blackLogo from '../../assets/myeongbo_black.svg';

const ArticleLikeShare = ({
    article,
    handleArticleLikeToggle,
    isArticleLiked,
}) => {
    const handleLogoClick = () => {
        navigate('/');
    };
    return (
        <div>
            <div className='mt1 flex'>
                <img src={blackLogo} alt="Bootstrap" className='logo block' style={{ width: '5rem', cursor: 'pointer' }} onClick={handleLogoClick} />
                <div className='mlAuto'>
                    <p className='m0'>{article.userName} 기자 {article.userEmail}</p>
                    <small className='gray40'>{article.userBio}</small>
                </div>
            </div>
            <a href={article.publisherUrl} className='gray40 mt1'>{article.publisherUrl} &gt;</a>

            <hr className='mt1' style={{ margin: '1rem 0' }} />

            <div className='flex'>
                <div>
                    <i
                        className={`bi block taCenter ${isArticleLiked ? 'bi-heart-fill blue' : 'bi-heart'}`}
                        onClick={handleArticleLikeToggle}
                    ></i>
                    <small className='taCenter block'>{article.likes}</small>
                </div>
                <KakaoShare title={article.title} content={article.subtitle.split(',./')[0]} link={`articleDetail/${article.id}`} THU={article.images[0]} />
            </div>

        </div>
    );
};

export default ArticleLikeShare;
