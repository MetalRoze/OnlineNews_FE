import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';
import ArticleComment from './ArticleComment';
import ArticleLikeShare from './ArticleLikeShare'
import GoogleAdsense from '../../components/GoogleAdsense';
import { getRequest, postRequest, deleteRequest } from '../../apis/axios';
import { useLocation } from 'react-router-dom';

const ArticleDetail = () => {
    const { articleId } = useParams();
    const location = useLocation();
    const isArticleDetail = location.pathname.includes('articleDetail');

    const [article, setArticle] = useState(null);


    const [isArticleLiked, setIsArticleLiked] = useState(false);
    const [likeId, setLikeId] = useState(null);
    const [isEmailSubscribed, setIsEmailSubscribed] = useState(true);

    // 기사 가져오기
    const fetchArticle = async () => {
        getRequest('/api/article/select', { id: articleId })
            .then(response => {
                setArticle(response.data[0]);
                console.log(response.data[0])
            })
            .catch(error => {
                console.error('Error fetching subscriptions:', error);
            });
    };
    // 좋아요
    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const response = await getRequest(`/api/article/${articleId}/like/check`);
                console.log(response.data);
                if (response.data) {
                    setIsArticleLiked(true);
                    setLikeId(response.data)
                } else {
                    console.log('없')
                }
            } catch (error) {
                console.error("Error checking like status", error);
            }
        };
        checkLikeStatus();
    }, [articleId]);
    const handleLike = async () => {
        try {
            const response = await postRequest(`/api/article/${articleId}/like`);
            setIsArticleLiked(true);
            setLikeId(response.data);

            setArticle(prevArticle => ({
                ...prevArticle,
                likes: prevArticle.likes + 1
            }));
        } catch (error) {
            console.error("Error adding like", error);
        }
    };
    const handleUnlike = async () => {
        try {
            console.log(likeId)
            if (likeId) {
                await deleteRequest(`/api/article/like/${likeId}/unlike`);
                setIsArticleLiked(false);
                setLikeId(null);

                setArticle(prevArticle => ({
                    ...prevArticle,
                    likes: prevArticle.likes - 1
                }));
            }
        } catch (error) {
            console.error("Error removing like", error);
        }
    };
    const handleArticleLikeToggle = () => {
        if (isArticleLiked) {
            handleUnlike();
        } else {
            handleLike();
        }
    };

    // 구독 팝업
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    useEffect(() => {
        console.log(isSubscribed);
    }, [isSubscribed]);
    const handleSubscriptionToggle = () => {
        setIsModalOpen(true);
    };
    const handleSubscribe = () => {
        setIsSubscribed(true);
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

    // 카카오톡 공유하기
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
        return <div>Loading...</div>;
    }
    return (
        <div>
            <ArticleHeader />
            <div className='mobile-container pd20'>
                <ArticleContent article={article} />
                {isArticleDetail && (
                    <ArticleLikeShare
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
                    ></ArticleLikeShare>)}
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
