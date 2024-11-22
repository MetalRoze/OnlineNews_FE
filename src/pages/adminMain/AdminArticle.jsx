import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function AdminArticle({ article, pathTo }) {
    const navigate = useNavigate();
    
    const navigateToPath = (pathTo) => {
        navigate(pathTo);
    };
    return (
        <div className='desktop-item pd10 aiCenter pointer' onClick={() => navigateToPath(pathTo)}>

            <StyledArticleContentWrapper className='ml05' >
                <h5 className='ellipsis'>{article.title}</h5>
                <p className='ellipsis m0'>{article.subtitle}</p>
                <div className='flex'>
                    <i className="bi bi-eye" />
                    <p className=' m0 ml05' >{article.views}</p>
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