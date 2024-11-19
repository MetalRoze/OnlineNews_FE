import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AdminRequest from '../../components/AdminRequest';
import AdminArticle from '../../components/AdminArticle';
import { getRequest } from '../../apis/axios';

export default function AdminMain() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    const goToRequest = () => {
        navigate('/requestManage');
    };
    const goToArticle = () => {
        navigate('/articleManage');
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
                        <AdminRequest type={'시민기자'} />
                        <AdminRequest />
                        <AdminRequest />
                        <AdminRequest type={'시민기자'} />
                        <AdminRequest />
                        <AdminRequest type={'시민기자'} />
                    </StyledRequestListWrapper>
                </div>
                <div style={{ height: '3rem' }}></div>

                <div className='flex column aiFlexstart' style={{ width: '78rem' }}>
                    <div className='flex aiCenter mb1'>
                        <h2 className='m0 mr05' style={{ alignSelf: "flex-start" }}>오늘 기사</h2>
                        <i className="bi bi-chevron-right" style={{ cursor: 'pointer' }} onClick={goToArticle} />
                    </div>
                    <StyledArticleListWrapper>
                        {articles && articles.length >=8 && articles.slice(0, 8).map((article, index) => (
                            <AdminArticle key={index} article={article} />
                        ))}
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