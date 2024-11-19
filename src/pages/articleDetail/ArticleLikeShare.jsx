import React, { useState, useEffect } from 'react';
import SubscriptionModal from './SubscriptionModal';
import KakaoShare from '/src/utils/KakaoShare.jsx';
import blackLogo from '../../assets/myeongbo_black.svg';

const ArticleLikeShare = ({
    article,
    handleArticleLikeToggle,
    handleSubscriptionToggle, 
    isModalOpen,
    isEmailSubscribed,
    isArticleLiked,
    isSubscribed,
    setIsModalOpen,
    handleSubscribe,
    handleUnsubscribe,
    handleEmailSubscribe,
    handleEmailUnsubscribe
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
            <button
                className={`mt2 ${isSubscribed ? 'unsubsButton' : 'subsButton'}`}
                onClick={() => {
                    if (isSubscribed) {
                        handleSubscriptionToggle();
                    } else {
                        handleSubscribe();
                    }
                }}
            >
                {isSubscribed && isEmailSubscribed !== null && (
                    <i className={`bi ${isEmailSubscribed ? 'bi-envelope-check' : 'bi-envelope-x-fill'}`}></i>
                )}
                &nbsp;{isSubscribed ? '구독중' : '구독'}
            </button>

            <hr className='mt1' style={{ margin: '1rem 0' }} />

            <div className='flex'>
                <div>
                    <i
                        className={`bi block taCenter ${isArticleLiked ? 'bi-heart-fill blue' : 'bi-heart'}`}
                        onClick={handleArticleLikeToggle}
                    ></i>
                    <small className='taCenter block'>{article.likes}</small>
                </div>
                <KakaoShare title={article.title} content={article.subtitle} link="articleDetail" THU="http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png" />
            </div>

            <SubscriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onEmailSubscribe={handleEmailSubscribe}
                onEmailUnsubscribe={handleEmailUnsubscribe}
                onUnsubscribe={handleUnsubscribe}
            />

        </div>
    );
};

export default ArticleLikeShare;
