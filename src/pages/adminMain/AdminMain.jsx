import React from 'react';
import Sidebar from '../../components/Sidebar';
import MyCalendar from '../../components/Calendar';
import AdminRequest from '../../components/AdminRequest';
import AdminArticle from '../../components/AdminArticle';
import styled from 'styled-components';

export default function AdminMain() {
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <Sidebar />
            <div className="desktop-container">
                <MyCalendar />
                <div style={{ height: '3rem' }}></div>
                
                <div className='flex column aiFlexstart' style={{width: '78rem'}}>
                    <h2 className='mb1'>기사 요청 현황</h2>
                    <StyledRequestListWrapper>
                        <AdminRequest />
                        <AdminRequest />
                        <AdminRequest />
                        <AdminRequest />
                        <AdminRequest />
                        <AdminRequest />
                    </StyledRequestListWrapper>
                    <button style={{ width: '6rem', alignSelf: 'center' }}>더보기</button>
                </div>
                <div style={{ height: '3rem' }}></div>
                
                <div className='flex column aiFlexstart' style={{width: '78rem'}}>
                    <h2 className='mb1' style={{ alignSelf: "flex-start" }}>오늘 기사</h2>
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
                    <button style={{ width: '6rem', alignSelf: 'center' }}>더보기</button>
                </div>
                <div style={{ height: '3rem' }}></div>
            </div>
        </div>
    );
}
const StyledRequestListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr); 
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
`;
const StyledArticleListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr); 
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
`;