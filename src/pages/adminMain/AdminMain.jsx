import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AdminRequest from './AdminRequest';
import AdminArticle from './AdminArticle';
import { DesktopList } from '../../components/DesktopList';
import { getRequest } from '../../apis/axios';
import { convertStatusToKor} from '../../utils/convertStatus';
import {convertToKor} from '../../utils/convertCategories';

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

    const currentRequests = requests.slice(0, 5);

    const reqHeaders = ["접수일자", "이름", "구분", "제목", "처리구분", "승인일자"];
    const reqColumns = "1fr 0.8fr 0.8fr 2fr 1fr 1fr";

    const reqContents = currentRequests.map((request) => ({
        접수일자: request.createdAt.split("T")[0],
        이름: request.userName,
        구분: request.type,
        제목: request.requestTitle,
        처리구분: convertStatusToKor(request.status),
        승인일자: request.confirmedAt !== null ? request.confirmedAt.split("T")[0]: null,
        id: request.id,
    }));

    const aHeaders = ["입력일자", "이름", "구분", "제목", "수정일자","작업"];
    const aColumns = "1fr 0.8fr 0.8fr 2fr 1fr 0.8fr";
    const currentArticles = articles.slice(0,10);

    const aContents = currentArticles.map((article) => ({
        입력일자: article.createdAt.split("T")[0],
        이름: article.userName,
        구분: convertToKor(article.category),
        제목: article.title,
        수정일자: article.modifiedAt !==null ? article.modifiedAt.split("T")[0] : null,
        id: article.id,
        작업: "헤드라인",
    }));


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
                    {requests && requests.length>0 ? (
                            <DesktopList pathTo={'../requestManage/requestDetail'} contents={reqContents} headers={reqHeaders} columns={reqColumns} />
                        ) : (
                            <div className='taCenter' style={{width: '100%'}}>요청이 없습니다.</div>
                        )}
                </div>
                <div style={{ height: '3rem' }}></div>

                <div className='flex column aiFlexstart' style={{ width: '78rem' }}>
                    <div className='flex aiCenter mb1'>
                        <h2 className='m0 mr05' style={{ alignSelf: "flex-start" }}>오늘 기사</h2>
                        <i className="bi bi-chevron-right" style={{ cursor: 'pointer' }} onClick={goToArticle} />
                    </div>
                    {articles && articles.length>0 ? (
                            <DesktopList pathTo={'../articleDetail'} contents={aContents} headers={aHeaders} columns={aColumns} />
                        ) : (
                            <div className='taCenter' style={{width: '100%'}}>기사가 없습니다.</div>
                        )}
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