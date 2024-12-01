import React, { useState, useEffect } from 'react';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import styled from 'styled-components';
import { DesktopList } from '../../components/DesktopList';
import { getRequest } from '../../apis/axios';
import { convertUserGradeToKor } from '../../utils/convertUserGrade';


export default function StaffManage() {
    const [activeTab, setActiveTab] = useState('allStaffs');
    const [staffs, setStaffs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const tabData = [
        { eventKey: 'allStaffs', title: '전체기자', content: '전체기자' },
        { eventKey: 'REPORTER', title: '기자', content: '기자' },
        { eventKey: 'INTERN_REPORTER', title: '인턴기자', content: '인턴기자' },
        { eventKey: 'CITIZEN_REPORTER', title: '시민기자', content: '시민기자' },
    ];
    //staff api
    const fetchStaffs = async (grade) => {
        try {
            const endpoint = grade === 'allStaffs'
                ? '/api/user/publisher'
                : '/api/user/publisher/grade';
            const params = grade === 'allStaffs' ? {} : { keyword: grade };
            const response = await getRequest(endpoint, params);
            setStaffs(response.data);
        } catch (error) {
            console.error('요청실패', error);
        }
    };

    useEffect(() => {
        fetchStaffs(activeTab);
        setCurrentPage(1);
    }, [activeTab]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIdx = (currentPage - 1) * 12;
    const endIdx = startIdx + 12;
    const currentStaffs = staffs.slice(startIdx, endIdx);

    const headers = ["구분", "이름", "전화번호", "이메일"];
    const contents = currentStaffs.map((staff) => ({
        구분: convertUserGradeToKor(staff.grade),
        이름: staff.name,
        전화번호: staff.cp,
        이메일: staff.email,
        id: staff.id,
    }));

    const columns = "1fr 1fr 2fr 2fr";

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container">
                <div className='flex aiCenter spaceBetween mt1'>
                    <TotalCount>전체 {staffs.length}개</TotalCount>
                    <div><DesktopTab tabData={tabData} setActiveTab={setActiveTab} /></div>
                </div>
                <DesktopList pathTo={'staffDetail'} contents={contents} headers={headers} columns={columns} />
                {staffs.length === 0 && (
                    <div className="taCenter mb05" style={{ width: '100%' }}>
                        직원이 없습니다.
                    </div>
                )}
                {staffs.length !== 0 && (
                    <MyPagination itemsCountPerPage={12} totalItemsCount={staffs.length} pageRangeDisplayed={5} onPageChange={handlePageChange} />
                )}
            </div>
        </div>
    );
};
const TotalCount = styled.p`
    color : ${(props) => props.theme.colors.gray50};
`;