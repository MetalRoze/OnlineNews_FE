import React, { useState } from 'react';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import styled from 'styled-components';
import { DesktopList } from '../../components/DesktopList';


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
    const headers = ["구분", "이름", "전화번호", "이메일"];
    const contents = [
        {
            구분: "시민",
            이름: "홍길동",
            전화번호: "010-2843-9317",
            수정일자: "wlstj9317@naver.com"
        },
        {
            구분: "시민",
            이름: "홍길동",
            전화번호: "010-2843-9317",
            수정일자: "wlstj9317@naver.com"
        },
    ];
    const columns = "1fr 1fr 2fr 2fr";

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container">
                <div className='flex aiCenter spaceBetween mb1'>
                    <h2> 직원 </h2>
                    <div><DesktopTab tabData={tabData} setActiveTab={setActiveTab} /></div>
                </div>
                <TotalCount>전체 {staffs[activeTab].length}개</TotalCount>

                <DesktopList contents={contents} headers={headers} columns={columns} />
                <MyPagination itemsCountPerPage={12} totalItemsCount={staffs[activeTab].length} pageRangeDisplayed={5} />
            </div>
        </div>
    );
};
const TotalCount = styled.p`
    color : ${(props) => props.theme.colors.gray50};
`;