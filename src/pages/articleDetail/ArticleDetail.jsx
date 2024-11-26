import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';
import ArticleComment from './ArticleComment';
import ArticleLikeShare from './ArticleLikeShare';
import { getRequest, postRequest, deleteRequest } from '../../apis/axios';
import { useLocation } from 'react-router-dom';
import { convertToIdx } from '../../utils/convertCategories';

const ArticleDetail = () => {
    const { articleId } = useParams();
    const location = useLocation();
    const isArticleDetail = location.pathname.toLowerCase().includes('articledetail');

    const [article, setArticle] = useState(null);
    const [isArticleLiked, setIsArticleLiked] = useState(false);
    const [likeId, setLikeId] = useState(null);
    const [categoryIdx, setCategoryIdx] = useState();

    // 기사 가져오기
    const fetchArticle = async () => {
        getRequest('/api/article/select', { id: articleId })
            .then(response => {
                setArticle(response.data[0]);
                setCategoryIdx(convertToIdx(response.data[0].category));
            })
            .catch(error => {
                console.error('Error fetching subscriptions:', error);
            });
    };

    // 좋아요 상태 확인
    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const response = await getRequest(`/api/article/${articleId}/like/check`);
                if (response.data) {
                    setIsArticleLiked(true);
                    setLikeId(response.data);
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

    // 카카오톡 스크립트 로드
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    // 기사 가져오기
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
            <ArticleHeader id={categoryIdx} />
            <div className='mobile-container pd20'>
                <ArticleContent article={article} />

                {isArticleDetail && (
                    <ArticleLikeShare
                        article={article}
                        handleArticleLikeToggle={handleArticleLikeToggle}
                        isArticleLiked={isArticleLiked}
                    />
                )}

                <ArticleComment articleId={articleId} />
            </div>
        </div>
    );
};

export default ArticleDetail;
