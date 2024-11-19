import React, { useState } from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';
import ArticleComment from './ArticleComment';
import GoogleAdsense from '../../components/GoogleAdsense';

const ArticleDetail = () => {

    return (
        <div>
            <ArticleHeader />
            <div className='mobile-container pd20'>
                <ArticleContent />
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
