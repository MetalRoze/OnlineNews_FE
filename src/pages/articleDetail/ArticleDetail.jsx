import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';
import ArticleComment from './ArticleComment';
import GoogleAdsense from '../../components/GoogleAdsense';
import {getRequest}  from '../../apis/axios';
import { useLocation } from 'react-router-dom';

const ArticleDetail = () => {
    const { articleId } = useParams();

    const [article, setArticle] = useState(null);
    
    const location = useLocation();
    const isArticleDetail = location.pathname.includes('articleDetail');

    const [isArticleLiked, setIsArticleLiked] = useState(false);
    const [isEmailSubscribed, setIsEmailSubscribed] = useState(true);

    const handleArticleLikeToggle = () => {
        setIsArticleLiked(prevState => {
            const newState = !prevState;
            setLike(prevCount => newState ? prevCount + 1 : prevCount - 1);
            return newState;
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscriptionToggle = () => {
        setIsModalOpen(true);
    };

    const handleSubscribe = () => {
        setIsSubscribed(true);
        setIsModalOpen(false);
    };

    const handleUnsubscribe = () => {
        setIsSubscribed(false);
        setIsModalOpen(false);
    };
    const handleEmailSubscribe = () => {
        setIsEmailSubscribed(true);
        setIsModalOpen(false);
    };

    const handleEmailUnsubscribe = () => {
        setIsEmailSubscribed(false);
        setIsModalOpen(false);
    };

    // 기사 가져오기
    const fetchArticle = async () => {
        getRequest('/api/article/select', { id: articleId })
            .then(response => {
                setArticle(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching subscriptions:', error);
            });
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    useEffect(() => {
        if (articleId) { 
            fetchArticle();
        }
    }, [articleId]);
    
    if (!article) {
        return <div>Loading...</div>; // 로딩 화면을 표시하거나, 로딩 상태에서 다른 처리를 할 수 있습니다.
    }
    return (
        <div>
            <ArticleHeader />
            <div className='mobile-container pd20'>
                <ArticleContent
                    article={article}
                    handleArticleLikeToggle={handleArticleLikeToggle}
                    handleSubscriptionToggle={handleSubscriptionToggle}
                    isArticleDetail={isArticleDetail}
                    isSubscribe={isSubscribed}
                    isArticleLiked={isArticleLiked}
                    isModalOpen={isModalOpen}
                    isEmailSubscribed={isEmailSubscribed}
                    setIsModalOpen={setIsModalOpen}
                    handleSubscribe={handleSubscribe}
                    handleUnsubscribe={handleUnsubscribe}
                    handleEmailSubscribe={handleEmailSubscribe}
                    handleEmailUnsubscribe={handleEmailUnsubscribe}
                />
                <ArticleComment />
                <GoogleAdsense
                    client="ca-pub-1195209293008237"
                    slot="3954159514"
                    format="fluid"
                    responsive="true"
                    layoutKey="-fz+6a+19-cg+hh"
                />
            </div>
        </div>
    );
};

export default ArticleDetail;
