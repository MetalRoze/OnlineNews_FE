import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar';
import Sidebar from '../../components/Sidebar';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import AdminRequest from '../../components/AdminRequest';

export default function RequestManage() {
    const [activeTab, setActiveTab] = useState('allRequests');

    const tabData = [
        { eventKey: 'allRequests', title: '전체요청', content: '전체 요청 내용' },
        { eventKey: 'approved', title: '승인', content: '승인된 요청 내용' },
        { eventKey: 'pending', title: '보류', content: '보류된 요청 내용' },
        { eventKey: 'unread', title: '미열람', content: '미열람된 요청 내용' },
    ];

    const requests = {
        allRequests: [1, 2, 3, 4, 5, 6],
        approved: [1, 2], 
        pending: [3],
        rejected: [4], 
        unread: [], 
    };
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container">
                <DesktopTab tabData={tabData} setActiveTab={setActiveTab} />
                <TotalCount>전체 {requests[activeTab].length}개</TotalCount>
                {/* <StyledRequestListWrapper>
                    {requests[activeTab].map((request) => (
                        <AdminRequest activeTab={activeTab} />
                    ))}
                    <PaginationContainer>
                        <MyPagination itemsCountPerPage={12} totalItemsCount={requests[activeTab].length} pageRangeDisplayed={5} />
                    </PaginationContainer>
                </StyledRequestListWrapper> */}
                <div style={{ height: '3rem' }}></div>
            </div>
        </div>
    );
}

export const StyledRequestListWrapper = styled.div`
  width: 52rem;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

export const PaginationContainer = styled.div`
  grid-column: 1 / -1; 
  display: flex;
  justify-content: center; 
  margin-top: 1rem; 
`;

export const TotalCount = styled.p`
    color : ${(props) => props.theme.colors.gray50};
`; 

