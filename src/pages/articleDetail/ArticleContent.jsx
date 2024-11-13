import React, { useState, useEffect } from 'react';
import SubscriptionModal from './SubscriptionModal';
import KakaoShare from '/src/utils/KakaoShare.jsx'; 

const ArticleContent = ({ 
    article,
    handleArticleLikeToggle,
    handleSubscriptionToggle,
    isArticleDetail,
    isModalOpen,
    isEmailSubscribed,
    isArticleLiked,
    isSubscribed,
    setIsModalOpen,
    handleSubscribe,
    handleUnsubscribe,
    handleEmailSubscribe,
    handleEmailUnsubscribe
}) =>{

    return (
        <div>
            <div>
                <img src="https://placehold.co/130x50" alt="Bootstrap" />
                <h1 className='mt1'>{article.title}</h1>
                <small className='mt1 gray40'>{article.createdAt}</small>
                <div className='mt1 taRight'>
                    <p className='mr1 inline'>{article.userName} 기자</p>
                    <img className='br50' src="https://placehold.co/50x50" alt="Author" />
                </div>
            </div>
            <hr style={{ margin: '1rem 0' }} />
            <div>
                {article.subtitle.split(',./').map((sub, index) => (
                    <h2 className='articleSubtitle' key={index}>{sub.trim()}</h2>  // 공백 제거
                ))}
                <br />

                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {isArticleDetail && (
                <>
                    <div className='mt1 flex'>
                        <img src="https://placehold.co/130x50" alt="Bootstrap" />
                        <div className='mlAuto'>
                            <p className='m0'>{article.userName} 기자 {article.userEmail}</p>
                            <small className='gray40'>{article.userBio}</small>
                        </div>
                    </div>
                    <a className='gray40 mt1'>{article.publisherUrl} &gt;</a>
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
                </>
            )}

        </div>
    );
};

export default ArticleContent;
