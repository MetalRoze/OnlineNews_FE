import React, { useState } from 'react';
import styled from 'styled-components';
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
                <div className='flex aiCenter spaceBetween mb1'>
                    <h2> 승인요청내역 </h2>
                    <div><DesktopTab tabData={tabData} setActiveTab={setActiveTab} /></div>
                </div>
                <TotalCount>전체 {requests[activeTab].length}개</TotalCount>

                {/* list */}
                <ul >
                    <RequestListItem>
                        <ListHeader>
                            {/* 젤 상단 */}
                            <ListHeaderItem>접수일자</ListHeaderItem>
                            <ListHeaderItem>이름</ListHeaderItem>
                            <ListHeaderItem>구분</ListHeaderItem>
                            <ListHeaderItem>제목</ListHeaderItem>
                            <ListHeaderItem>처리구분</ListHeaderItem>
                            <ListHeaderItem>승인일자</ListHeaderItem>
                        </ListHeader>
                    </RequestListItem>
                </ul>
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
const RequestListItem = styled.li`
    list-style: none;
`;
const ListHeader = styled.div`
    border-top: 3px solid ${(props) => props.theme.colors.black};
    display:grid;
    grid-template-columns: 1fr 0.8fr 0.8fr 2fr 1fr 1fr;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray50};
    padding: 10px;
`;
const ListHeaderItem = styled.div`
    display:block;
    align-items: center;
    text-align: center;
`;