import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';
import ArticleComment from './ArticleComment';
import GoogleAdsense from '../../components/GoogleAdsense';
import {getRequest}  from '../../apis/axios';

const ArticleDetail = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    
    const fetchArticle = async () => {
        getRequest('/api/article/select')
            .then(response => {
                setArticle(response.data[0]);
                console.log(article)
            })
            .catch(error => {
                console.error('Error fetching subscriptions:', error);
            });
    };

    useEffect(() => {
        if (articleId) { 
            fetchArticle();
        }
    }, [articleId]);

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
