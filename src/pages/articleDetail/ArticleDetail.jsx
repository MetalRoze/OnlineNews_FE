import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';
import ArticleComment from './ArticleComment';
import GoogleAdsense from '../../components/GoogleAdsense';
import { getRequest }  from '../../apis/axios';  // api.js에서 getRequest 임포트

// const ArticleDetail = () => {
//     const article = {
//         title: "기사 제목",
//         date: "2024.11.10 오전 10:00",
//         authorName: "홍길동",
//         authorEmail: "hong@yu.com",
//         publisherUrl: "www.yu.ac.kr",
//         authorDescription: "간단한 소개",
//         subtitles: "소제목1,./소제목2,./소제목3",
//         content: [
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//             "https://placehold.co/300x200",
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//         ]
//     };

const ArticleDetail = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);  // article 상태
    const [loading, setLoading] = useState(true);  // 로딩 상태
    const [error, setError] = useState(null);  // 오류 상태
    
    const fetchArticle = async () => {
        try {
          setLoading(true);
          const response = await getRequest('/api/article/select', { id: articleId });
          console.log(response.data)
          setArticle(response);  // 받은 데이터로 상태 업데이트
        } catch (error) {
          setError('기사 정보를 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (articleId) {
            console.log(articleId)
            fetchArticle();
        }
    }, [articleId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <div>
            <ArticleHeader />
            <div className='mobile-container pd20'>
                <ArticleContent article={article} />
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
