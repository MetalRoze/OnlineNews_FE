import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const HeaderWrapper = styled.div`
    width: 600px;
    padding: 10px 20px; 
    background-color: var(--color-blue);
    color: var(--color-white); 
`;
const WhiteLink = styled(Link)`
    color: var(--color-gray30); 
    text-decoration: none; 
    font-size: 1.125rem;
    font-weight: 600;

    &:hover {
        color: var(--color-white); 
        text-decoration: none; 
    }

    &:focus, &:active {
        color: var(--color-white); 
        text-decoration: none; 
    }
`;

const ArticleHeader = () => {
    const navigate = useNavigate();

    return (
        <div>
            <HeaderWrapper>
                <div className='flex' style={{alignItems:"left"}}>
                    <div>
                        <i onClick={() => navigate(-1)} className="bi bi-chevron-left"
                            style={{ fontSize: '24px', cursor: 'pointer', marginRight: '10px' }} ></i></div>
                    <h2 className='mAuto'>왕왕일보</h2>
                </div>
                <hr></hr>
                <div className='flex spaceBetween white'>  
                        <WhiteLink>IT</WhiteLink>
                        <WhiteLink>사설/칼럼</WhiteLink>
                        <WhiteLink>세계</WhiteLink>
                        <WhiteLink>정치</WhiteLink>
                        <WhiteLink>경제</WhiteLink>
                        <WhiteLink>사회</WhiteLink> 
                        <WhiteLink>생활</WhiteLink> 
                </div>
            </HeaderWrapper>

            <div className='mobile-container'>


            </div>
        </div>

    );
};

export default ArticleHeader;
