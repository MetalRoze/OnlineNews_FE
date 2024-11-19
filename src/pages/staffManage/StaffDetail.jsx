import React from 'react';
import styled from 'styled-components';
import AdminArticle from '../../components/AdminArticle';
import SearchBar from '../../components/SearchBar';
import MyPagination from '../../components/Pagination';
import ProfileInfo from './ProfileInfo'; 
import BackgroundImage from '../../assets/staffDetailBackground.png';

export default function StaffDetail() {
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container aiCenter" style={{ padding: 0 }}>
                <StyledBackground>
                    <h1>홍길동 기자</h1>
                    <p className='mb2'>example@example.com</p>
                </StyledBackground>
                <div className='desktop-detail aiCenter boxShadow'>
                    <ProfileInfo /> 
                    <div className='flex aiCenter spaceBetween pd10' style={{ width: '100%' }}>
                        <h2 className='m0'>최신기사</h2>
                        <SearchBar />
                    </div>
                    <StyledArticleListWrapper className='mt1'>
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                    </StyledArticleListWrapper>
                    <div style={{ height: '3rem' }} />
                    <MyPagination itemsCountPerPage={5} totalItemsCount={20} pageRangeDisplayed={5} />
                    <div style={{ height: '2rem' }} />
                </div>
            </div>
        </div>
    );
}

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

const StyledArticleListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    width: 100%;
`;
