import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AdminRequest from '../../components/AdminRequest';
import AdminArticle from '../../components/AdminArticle';

export default function AdminMain() {
    const navigate = useNavigate();

    const goToRequest = () => {
        navigate('/requestManage');
    };
    const goToArticle = () => {
        navigate('/articleManage');
    };
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container aiCenter">
                <div style={{ height: '3rem' }}></div>
                <div className='flex column aiFlexstart' style={{ width: '78rem' }}>
                    <div className='flex aiCenter mb1'>
                        <h2 className='m0 mr05'>기사 요청 현황</h2>
                        <i className="bi bi-chevron-right" style={{ cursor: 'pointer' }} onClick={goToRequest} />
                    </div>
                    <StyledRequestListWrapper>
                        <AdminRequest type={'시민기자'} />
                        <AdminRequest />
                        <AdminRequest />
                        <AdminRequest  type={'시민기자'}/>
                        <AdminRequest />
                        <AdminRequest  type={'시민기자'}/>
                    </StyledRequestListWrapper>
                </div>
                <div style={{ height: '3rem' }}></div>

                <div className='flex column aiFlexstart' style={{ width: '78rem' }}>
                    <div className='flex aiCenter mb1'>
                        <h2 className='m0 mr05' style={{ alignSelf: "flex-start" }}>오늘 기사</h2>
                        <i className="bi bi-chevron-right" style={{ cursor: 'pointer' }} onClick={goToArticle} />
                    </div>
                    <StyledArticleListWrapper>
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                    </StyledArticleListWrapper>
                </div>
                <div style={{ height: '3rem' }}></div>
            </div>
        </div>
    );
}
const StyledRequestListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr); 
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;
const StyledArticleListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr); 
    grid-template-columns: repeat(2, 1fr);
`;