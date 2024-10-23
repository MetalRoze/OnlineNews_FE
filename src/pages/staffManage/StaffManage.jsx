import React, { useState } from 'react';
import Staff from './Staff';
import Sidebar from '../../components/Sidebar';
import SearchBar from '../../components/SearchBar';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { StyledRequestListWrapper, PaginationContainer, TotalCount } from '../../pages/requestManage/RequestManage';

export default function StaffManage() {
    const [activeTab, setActiveTab] = useState('allStaffs');

    const tabData = [
        { eventKey: 'allStaffs', title: '전체직원', content: '전체 직원' },
        { eventKey: 'staff', title: '기자', content: '기자' },
        { eventKey: 'jeneralStaff', title: '시민기자', content: '시민기자' },
    ];

    const staffs = {
        allStaffs: [
            { id: 1, name: '김철수', email: 'kim@example.com', phone: '010-1234-5678', type: '일반' },
            { id: 2, name: '박영희', email: 'park@example.com', phone: '010-9876-5432', type: '기자' },
            { id: 3, name: '이민수', email: 'lee@example.com', phone: '010-1111-2222', type: '시민기자' },
            { id: 4, name: '최지우', email: 'choi@example.com', phone: '010-3333-4444', type: '일반' },
            { id: 5, name: '한지민', email: 'han@example.com', phone: '010-5555-6666', type: '기자' },
            { id: 6, name: '정유진', email: 'jung@example.com', phone: '010-7777-8888', type: '시민기자' }
        ],
        staff: [
            { id: 2, name: '박영희', email: 'park@example.com', phone: '010-9876-5432', type: '기자' },
            { id: 5, name: '한지민', email: 'han@example.com', phone: '010-5555-6666', type: '기자' }
        ],
        jeneralStaff: [
            { id: 3, name: '이민수', email: 'lee@example.com', phone: '010-1111-2222', type: '시민기자' },
            { id: 6, name: '정유진', email: 'jung@example.com', phone: '010-7777-8888', type: '시민기자' }
        ]
    };

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <Sidebar />
            <div className="desktop-container">
                <SearchBar />
                <DesktopTab tabData={tabData} setActiveTab={setActiveTab} />
                <TotalCount>전체 {staffs[activeTab].length}개</TotalCount>
                <StyledStaffListWrapper>
                    {staffs[activeTab].map((staff) => (
                        <Staff
                            key={staff.id}
                            activeTab={activeTab}
                            type={staff.type}
                            staffName={staff.name}
                            address={staff.email}
                            phoneNumber={staff.phone}
                        />
                    ))}
                    <PaginationContainer>
                        <MyPagination itemsCountPerPage={12} totalItemsCount={staffs[activeTab].length} pageRangeDisplayed={5} />
                    </PaginationContainer>
                </StyledStaffListWrapper>

            </div>
        </div>
    );
};
const StyledStaffListWrapper = StyledRequestListWrapper;
