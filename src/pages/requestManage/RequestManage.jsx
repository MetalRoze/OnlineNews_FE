import React from 'react';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar';
import Sidebar from '../../components/Sidebar';
import DesktopTab from '../../components/DesktopTab';

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
                <DesktopTab tabData={tabData}/>
                
            </div>
        </div>
    );
}
const StyledRequestWrapper = styled.div`
  
`;
