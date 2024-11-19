import React, { useState,useEffect} from 'react';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import styled from 'styled-components';
import { DesktopList } from '../../components/DesktopList';
import { getRequest } from '../../apis/axios';
import { convertUserGradeToKor } from '../../utils/convertUserGrade';


export default function StaffManage() {
    const [activeTab, setActiveTab] = useState('allStaffs');
    const [staffs, setStaffs] = useState([]);
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
           const params = grade === 'allStaffs' ? {} : { keyword: grade};
           const response = await getRequest(endpoint, params);
           setStaffs(response.data);
       } catch (error) {
           console.error('요청실패', error);
       }
   };

    useEffect(() => {
        fetchStaffs(activeTab);
    }, [activeTab]);

    const headers = ["구분", "이름", "전화번호", "이메일"];
    const contents = staffs.map((staff) => ({
        전화번호: staff.cp,
        이름: staff.name,
        구분: convertUserGradeToKor(staff.grade),
        이메일: staff.email,
        id: staff.id,
    }));

    const columns = "1fr 1fr 2fr 2fr";

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container">
                <div className='flex aiCenter spaceBetween mb1'>
                    <h2> 직원 </h2>
                    <div><DesktopTab tabData={tabData} setActiveTab={setActiveTab} /></div>
                </div>
                <TotalCount>전체 {staffs.length}개</TotalCount>

                <DesktopList pathTo={'staffDetail'} contents={contents} headers={headers} columns={columns} />
                <MyPagination itemsCountPerPage={12} totalItemsCount={staffs.length} pageRangeDisplayed={5} />
            </div>
        </div>
    );
};
const TotalCount = styled.p`
    color : ${(props) => props.theme.colors.gray50};
`;