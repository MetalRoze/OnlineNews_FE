import React from 'react';
import styled from 'styled-components';
import BackgroundImage from '../../assets/staffDetailBackground.png';
import ArticleDetail from '../articleDetail/ArticleDetail';
import { useParams } from 'react-router-dom';

export default function RequestDetail() {
    const { id } = useParams();
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container aiCenter" style={{ padding: 0}}>
                <StyledBackground>
                    <h1>홍길동 기자</h1>
                    <p className='mb2'>example@example.com</p>
                </StyledBackground>
                <div className='desktop-detail aiCenter boxShadow' style={{width: 'fit-content'}}>
                    <div className='pd20'>
                        {/* <ArticleDetail /> */}
                    </div>
                    <div className='flex desktop-request-3buttons br10'>
                        <button>승인</button>
                        <button>보류</button>
                        <button>거절</button>
                    </div>
                    <div style={{ height: '2rem' }} />
                </div>
            </div>
        </div>
    );
};
const StyledBackground = styled.div`
    width: 100%;
    height: 35vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(${BackgroundImage});
    background-size: cover;
    background-position: center;
    margin-bottom: -3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
`;
