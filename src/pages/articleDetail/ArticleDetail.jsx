import React, { useState } from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';
import ArticleComment from './ArticleComment';
import GoogleAdsense from '../../components/GoogleAdsense';

const ArticleDetail = () => {
    const article = {
        title: "기사 제목",
        date: "2024.11.10 오전 10:00",
        authorName: "홍길동",
        authorEmail: "hong@yu.com",
        publisherUrl: "www.yu.ac.kr",
        authorDescription: "간단한 소개",
        subtitles: "소제목1,./소제목2,./소제목3",
        content: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "https://placehold.co/300x200",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ]
    };
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
