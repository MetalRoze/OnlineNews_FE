import React, { useState } from 'react';
import styled from 'styled-components';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';
import ArticleComment from './ArticleComment';

const ArticleDetail = () => {

    return (
        <div>
            <ArticleHeader />
            <div className='mobile-container pd20'>
                <ArticleContent />
                <ArticleComment />
            </div>
        </div>
    );
};

export default ArticleDetail;
