import React from 'react';
import styled from 'styled-components';

export default function AdminArticle(article) {
    return (
        <div className='desktop-item pd10 aiCenter' >

            <StyledArticleContentWrapper className='ml05' >
                <h5 className='ellipsis'>{article.article.title}</h5>
                <p className='ellipsis m0'>{article.article.subtitle}</p>
                <div className='flex'>
                    <i className="bi bi-eye" />
                    <p className=' m0 ml05' >{article.article.views}</p>
                </div>
            </StyledArticleContentWrapper>
            <img src="https://placehold.co/160x120" alt="Bootstrap" />
        </div>
    );
}
const StyledArticleContentWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1.5fr 1fr;
    justify-items: flex-start;
`;