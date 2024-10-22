import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import SearchBar from '../../components/SearchBar';
import DesktopTab from '../../components/DesktopTab';
import AdminArticle from '../../components/AdminArticle';
import MyPagination from '../../components/Pagination';

export default function ArticleManage() {
    const [activeTab, setActiveTab] = useState('sortByCreate');

    const tabData = [
        { eventKey: 'sortByCreate', title: '등록순', content: '등록 순서 정렬' },
        { eventKey: 'sortByView', title: '조회순', content: '조회순 높은 순으로 정렬' },
        { eventKey: 'sortByLike', title: '좋아요순', content: '좋아요 높은 순으로 정렬' },
    ];

    const requests = {
        sortByCreate: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        sortByView: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        sortByLike:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    };
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <Sidebar />
            <div className="desktop-container">
                <SearchBar />
                <div style={{ height: '3rem' }}></div>
                <DesktopTab tabData={tabData} setActiveTab={setActiveTab} />
                <TotalCount>전체 {requests[activeTab].length}개</TotalCount>
                <StyledArticleListWrapper>
                    {requests[activeTab].map((request) => (
                        <AdminArticle activeTab={activeTab} />
                    ))}
                    <PaginationContainer>
                        <MyPagination itemsCountPerPage={21} totalItemsCount={requests[activeTab].length} pageRangeDisplayed={5} />
                    </PaginationContainer>
                </StyledArticleListWrapper>
            </div>
        </div>
    );
}
const StyledArticleListWrapper = styled.div`
  width: 52rem;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const PaginationContainer = styled.div`
  grid-column: 1 / -1; 
  display: flex;
  justify-content: center; 
  margin-top: 1rem; 
`;

const TotalCount = styled.p`
    color : ${(props) => props.theme.colors.gray50};
`;

