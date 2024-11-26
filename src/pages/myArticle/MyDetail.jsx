import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleContent from '../articleDetail/ArticleContent';
import { getRequest, postRequest } from '../../apis/axios';

function MyDetail() {
    const navigate = useNavigate();

    const { articleId } = useParams();
    const [article, setArticle] = useState();

    const clickEdit = () => {
        navigate(`/articleWrite/${articleId}`);
    };

    const clickOriginal = () => {
        navigate(`/articleDetail/${articleId}`);
    };

    const clickPrivate = () => {
        const isConfirmed = window.confirm('기사 비공개를 요청하시겠습니까?');
        if (isConfirmed) {
            postRequest(`/api/request/${articleId}/convert-private`)
                .then(response => {
                    console.log(response.data.code);
                    if (response.data.code === '200') {
                        const mergedSubTitles = subTitles.join(',./');
                        navigate('/main');
                    }
                })
                .catch(error => {
                    console.error("비공개 요청 실패", error);
                });
        }
    };

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

    const convertState = (englishState) => {
        switch (englishState) {
            case "PENDING":
                return "승인대기";
            case "APPROVED":
                return "승인됨";
            case "HOLDING":
                return "보류됨";
            case "REJECTED":
                return "거절됨";
            default:
                throw new Error("유효하지 않은 카테고리입니다.");
        }
    };

    useEffect(() => {
        if (articleId) {
            fetchArticle();
        }
    }, [articleId]);

    if (!article) {
        return <div>Loading...</div>;
    }
    return (
        <div className='mobile-container'>
            <div className='flex spaceBetween mb1'>
                <div className='flex'>
                    <a onClick={clickEdit} className='mr1 pointer'>수정</a>
                    <a onClick={clickPrivate} className='mr1 pointer'>비공개</a>
                    <a onClick={clickOriginal} className='pointer pointer'>원문보기</a>
                </div>
                <div className='flex' style={{
                    backgroundColor: "var(--color-blue)",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    color: "var(--color-white)",
                }}>{convertState(article.state)}</div>
            </div>
            <ArticleContent article={article}></ArticleContent>
        </div>
    );
}

export default MyDetail;
