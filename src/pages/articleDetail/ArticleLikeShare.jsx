import React, { useState, useEffect } from 'react';
import KakaoShare from '/src/utils/KakaoShare.jsx';
import blackLogo from '../../assets/myeongbo_black.svg';
import KakaoAdFit from '../../components/KakaoAdFit'
import profileIcon from '../../assets/profileDefault.png';

const ArticleLikeShare = ({
    article,
    handleArticleLikeToggle,
    isArticleLiked,
}) => {
    const handleLogoClick = () => {
        navigate('/');
    };
    return (
        <div className='mt1'>
            <div className='mlAuto flex'>
                <img className='profile50 mr05' src={article.userImg || profileIcon} />
                <div>
                    <p className='m0'>{article.userName} 기자 {article.userEmail}</p>
                    <small className='gray40'>{article.userBio}</small>
                </div>
                <img src={blackLogo} alt="Bootstrap" className='mlAuto' style={{ width: '5rem', cursor: 'pointer' }} onClick={handleLogoClick} />
            </div>

            <hr className='mt1' style={{ margin: '1rem 0' }} />

            <div className='flex mt1 mb1'>
                <div>
                    <i
                        className={`bi block taCenter ${isArticleLiked ? 'bi-heart-fill blue' : 'bi-heart'}`}
                        onClick={handleArticleLikeToggle}
                    ></i>
                    <small className='taCenter block'>{article.likes}</small>
                </div>
                <KakaoShare title={article.title} content={article.subtitle.split(',./')[0]} link={`articleDetail/${article.id}`} THU={article.images[0]} />
            </div>
            <div className='jfCcenter flex'>
                <KakaoAdFit adType={'large'} />
            </div>
        </div>
    );
};

export default ArticleLikeShare;
