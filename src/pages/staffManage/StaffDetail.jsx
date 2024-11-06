import React, { useState } from 'react';
import AdminArticle from '../../components/AdminArticle';
import SearchBar from '../../components/SearchBar';
import styled from 'styled-components';
import BackgroundImage from '../../assets/staffDetailBackground.png';
import MyPagination from '../../components/Pagination';

export default function StaffDetail() {

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container aiCenter" style={{padding: 0}}>
                <StyledBackground>
                    <h1>홍길동 기자</h1>
                    <p className='mb2'>example@example.com</p>
                </StyledBackground>
                <div className='desktop-staff-detail aiCenter boxShadow'>
                    <StyledProfileWrapper>
                        <img src="https://placehold.co/150x200" alt="Bootstrap" />
                        <ProfileInfoTable>
                            <tbody>
                                <tr>
                                    <td>이름</td>
                                    <td>홍길동</td>
                                </tr>
                                <tr>
                                    <td>부서</td>
                                    <td>경제</td>
                                </tr>
                                <tr>
                                    <td>구분</td>
                                    <td>일반기자</td>
                                </tr>
                                <tr>
                                    <td>전화번호</td>
                                    <td>010-1234-5678</td>
                                </tr>
                                <tr>
                                    <td>이메일</td>
                                    <td>example@example.com</td>
                                </tr>
                            </tbody>
                        </ProfileInfoTable>
                    </StyledProfileWrapper>

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
                    <div style={{height: '3rem'}}/>
                    <MyPagination itemsCountPerPage={5} totalItemsCount={20} pageRangeDisplayed={5} />
                    <div style={{height: '2rem'}}/>
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
const StyledProfileWrapper = styled.div`
    display:flex;
    width: 100%;
    align-items:center;
    padding: 1rem;
    gap:1rem;
    background-color: ${(props) => props.theme.colors.white};
`;

const ProfileInfoTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    td {
        padding: 0.5rem;
        border-bottom: 1px solid ${(props) => props.theme.colors.gray20};
    }

    td:first-child {
        width: 5rem; 
        color: ${(props) => props.theme.colors.gray60};
    }
`;

const StyledArticleListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    width: 100%;
`;