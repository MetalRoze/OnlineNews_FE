import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AdminRequest from './AdminRequest';
import AdminArticle from './AdminArticle';
import { getRequest } from '../../apis/axios';

export default function AdminMain() {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [articles, setArticles] = useState([]);

    const goToRequest = () => {
        navigate('/requestManage');
    };
    const goToArticle = () => {
        navigate('/articleManage');
    };

    const fetchRequests = async () => {
        try {
            const response = await getRequest("api/request/status", { keyword: 'pending' });
            setRequests(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('요청실패', error);
        }
    };

    const fetchArticles = async () => {
        try {
            const response = await getRequest('api/article/select', { sortBy: "createdAt", sortDirection: "desc" });
            setArticles(response.data);
        } catch (error) {
            console.error('요청실패', error);
        }
    };

    useEffect(() => {
        fetchRequests();
        fetchArticles();
    }, []);

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
                        {requests ? (
                            requests.length > 6
                                ? requests.slice(0, 6).map((request, index) => (
                                    <AdminRequest key={index} request={request} pathTo={`/requestManage/requestDetail/${request.id}`} width={'100%'}/>
                                ))
                                : requests.map((request, index) => (
                                    <AdminRequest key={index} request={request} pathTo={`/requestManage/requestDetail/${request.id}`} />
                                ))
                        ) : (
                            <p>요청이 없습니다.</p>
                        )}
                    </StyledRequestListWrapper>
                </div>
                <div style={{ height: '3rem' }}></div>

                <div className='flex column aiFlexstart' style={{ width: '78rem' }}>
                    <div className='flex aiCenter mb1'>
                        <h2 className='m0 mr05' style={{ alignSelf: "flex-start" }}>오늘 기사</h2>
                        <i className="bi bi-chevron-right" style={{ cursor: 'pointer' }} onClick={goToArticle} />
                    </div>
                    <StyledArticleListWrapper>
                        {articles ? (
                            articles.length > 8
                                ? articles.slice(0, 8).map((article, index) => (
                                    <AdminArticle key={index} article={article} pathTo={`../articleDetail/${article.id}`} />
                                ))
                                : articles.map((article, index) => (
                                    <AdminArticle key={index} article={article} pathTo={`../articleDetail/${article.id}`} />
                                ))
                        ) : (
                            <p>기사가 없습니다.</p>
                        )}
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
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    align-self: center;
`;
const StyledArticleListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 1fr); 
    grid-template-columns: repeat(2, 1fr);
`;