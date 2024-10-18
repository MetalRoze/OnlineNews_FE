import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArticleHeader from './ArticleHeader';

 

const ArticleDetail = () => {
    const navigate = useNavigate(); 
    return (
        <div> 
            <ArticleHeader/> 
            <div className='mobile-container'>


            </div>
        </div>

    );
};

export default ArticleDetail;
