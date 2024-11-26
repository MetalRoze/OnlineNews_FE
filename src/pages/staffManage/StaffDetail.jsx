import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminArticle from '../adminMain/AdminArticle';
import SearchBar from '../../components/SearchBar';
import MyPagination from '../../components/Pagination';
import ProfileInfo from './ProfileInfo';
import BackgroundImage from '../../assets/staffDetailBackground.png';
import { getRequest } from '../../apis/axios';
import { useParams } from 'react-router-dom';

export default function StaffDetail() {

    const { id } = useParams();
    const [articles, setArticles] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUserInfo = async (userId) => {
        try {
            getRequest(`/api/user/${userId}`)
            .then(response => {
                setUserInfo({
                    name: response.data.name,
                    bio: response.data.bio,
                    publisher: response.data.publisher,
                    email: response.data.email,
                    phoneNumber: response.data.cp, 
                    gender: response.data.sex, 
                    profileImg:response.data.img
                });
            })
            .catch(error => {
                console.error("회원 정보 불러오기 실패", error);
            });
        } catch (error) {
            console.error('사용자 요청실패', error);
        }
    };
    //최신기사 api
    const fetchArticles = async (id) => {
        try {
            const response = await getRequest('/api/article/select', { userId: id, sortBy: "createdAt", sortDirection: "desc" });
            if (response.data !== "검색 결과가 없습니다.") {
                setArticles(response.data);
            }
        } catch (error) {
            console.error('요청실패', error);
        }
    };

    useEffect(() => {
        fetchUserInfo(id);
        fetchArticles(id);
    }, [id]);

    const startIdx = (currentPage - 1) * 8;
    const endIdx = startIdx + 8;
    const currentArticles = articles.slice(startIdx, endIdx);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container aiCenter" style={{ padding: 0 }}>
                <StyledBackground>
                    {userInfo && (
                        <>
                            <h1>{userInfo.name}</h1>
                            <p className='mb2'>{userInfo.email}</p>
                        </>
                    )}
                </StyledBackground>
                <div className='desktop-detail aiCenter boxShadow'>
                    {userInfo && <ProfileInfo user={userInfo} />}
                    <div className='flex aiCenter spaceBetween pd10 mt2' style={{ width: '100%' }}>
                        <h2 className='m0'>최신기사</h2>
                        <SearchBar />
                    </div>
                    <StyledArticleListWrapper className='mt1'>
                        {currentArticles && currentArticles.length > 0 ? (
                            currentArticles.map((article, index) => (
                                <AdminArticle key={index} article={article} />
                            ))
                        ) : (
                            <div className="taCenter mb05" style={{ width: '100%' }}>
                                요청이 없습니다.
                            </div>
                        )}
                    </StyledArticleListWrapper>
                    <div style={{ height: '3rem' }} />

                    {articles.length !== 0 && (
                        <MyPagination itemsCountPerPage={8} totalItemsCount={articles.length} pageRangeDisplayed={5} onPageChange={handlePageChange} />
                    )}
                    <div style={{ height: '2rem' }} />
                </div>
            </div>
        </div >
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
