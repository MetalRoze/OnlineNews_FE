import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { convertStatusToKor } from '../../utils/convertStatus';
import {convertToKor} from '../../utils/convertCategories';
import { DesktopList } from '../../components/DesktopList';
import { getRequest } from '../../apis/axios';

export default function ArticleManage() {
    const [activeTab, setActiveTab] = useState('createdAt');
    const [articles, setArticles] = useState([]);

    const tabData = [
        { eventKey: 'createdAt', title: '등록순', content: '등록 순서 정렬' },
        { eventKey: 'views', title: '조회순', content: '조회순 높은 순으로 정렬' },
    ];
    
    const fetchArticles = async (status) => {
        try {
            const response = await getRequest('api/article/select', {sortBy: status, sortDirection:"desc"});
            setArticles(response.data);
        } catch (error) {
            console.error('요청실패', error);
        }
    };
    const headers = ["입력일자", "이름", "구분", "제목", "수정일자"];
    const columns = "1fr 0.8fr 0.8fr 2fr 1fr";

    const contents = articles.map((article) => ({
    
        입력일자: article.createdAt.split("T")[0],
        이름: article.userName,
        구분: convertToKor(article.category),
        제목: article.title,
        수정일자: article.modifiedAt !==null ? article.modifiedAt.split("T")[0] : null,
        id: article.id,
    }));

    useEffect(() => {
        fetchArticles(activeTab);
    }, [activeTab]);

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container">
                <div className='flex aiCenter spaceBetween mb1'>
                    <h2>기사</h2>
                    <div><DesktopTab tabData={tabData} setActiveTab={setActiveTab} /></div>
                </div>
                <TotalCount>전체 {10}개</TotalCount>

                <DesktopList contents={contents} headers={headers} columns={columns} />
            
                 <MyPagination itemsCountPerPage={12} totalItemsCount={10} pageRangeDisplayed={5} />
            </div>
        </div>
    );
}

const TotalCount = styled.p`
    color : ${(props) => props.theme.colors.gray50};
`;

