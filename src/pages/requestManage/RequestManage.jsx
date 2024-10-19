import React from 'react';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar';
import Sidebar from '../../components/Sidebar';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';

export default function RequestManage() {
    const tabData = [
        { eventKey: 'allRequests', title: '전체요청', content: '전체 요청 내용' },
        { eventKey: 'approved', title: '승인', content: '승인된 요청 내용' },
        { eventKey: 'pending', title: '보류', content: '보류된 요청 내용' },
        { eventKey: 'rejected', title: '거절', content: '거절된 요청 내용' },
        { eventKey: 'unread', title: '미열람', content: '미열람된 요청 내용' },
    ];
    const tabData2 = [
        { eventKey: 'allRequests', title: '전체직원', content: '전체 직원' },
        { eventKey: 'approved', title: '기자', content: '기자' },
        { eventKey: 'pending', title: '일반기자', content: '일반기자' },
    ];
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <Sidebar />
            <div className="desktop-container">
                <SearchBar />
                <div style={{ height: '3rem' }}></div>
                <DesktopTab tabData={tabData} />
                <TotalCount>전체 99개</TotalCount>
                <StyledRequestListWrapper>
                    <AdminRequest />
                    <AdminRequest />
                    <AdminRequest />
                    <AdminRequest />
                    <AdminRequest />
                    <AdminRequest />
                    <AdminRequest />
                    <AdminRequest />
                    <AdminRequest />
                    <AdminRequest />
                </StyledRequestListWrapper>
                <div style={{ height: '3rem' }}></div>
                <MyPagination itemsCountPerPage={5} totalItemsCount={300} pageRangeDisplayed={5}/>
            </div>
        </div>
    );
}

const StyledRequestListWrapper = styled.div`
  width: 52rem;
  display: grid;
  grid-template-rows: repeat(5, 1fr); 
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;
const TotalCount = styled.p`
    color : ${(props) => props.theme.colors.gray50};
`;