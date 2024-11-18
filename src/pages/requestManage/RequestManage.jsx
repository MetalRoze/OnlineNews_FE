import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { convertStatusToKor, convertStatusToEng } from '../../utils/convertStatus';
import { getRequest, postRequest, deleteRequest } from '../../apis/axios';
import { DesktopList } from '../../components/DesktopList';

export default function RequestManage() {
    // const [activeTab, setActiveTab] = useState('allRequests');
    const [requests, setRequests] = useState(null);

    // const tabData = [
    //     { eventKey: 'allRequests', title: '전체요청', content: '전체 요청 내용' },
    //     { eventKey: 'approved', title: '승인', content: '승인된 요청 내용' },
    //     { eventKey: 'pending', title: '보류', content: '보류된 요청 내용' },
    //     { eventKey: 'unread', title: '미열람', content: '미열람된 요청 내용' },
    // ];

    const fetchRequests = async () => {
        getRequest('/api/request')
            .then(response => {
                setRequests(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching subscriptions:', error);
            });
    };

    useEffect(() => {
        fetchRequests();
    }, []);
    

    const headers = ["접수일자", "이름", "구분", "제목", "처리구분", "승인일자"];

    const contents = requests.map(request => ({
        접수일자: request.createdAt.split("T")[0], 
        이름: request.userName, 
        구분: "기자" ,
        제목: request.articleTitle,
        처리구분: convertStatusToKor(request.status), 
        승인일자: "",
    }));

    const columns = "1fr 0.8fr 0.8fr 2fr 1fr 1fr";

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container">
                <div className='flex aiCenter spaceBetween mb1'>
                    <h2> 승인요청내역 </h2>
                    {/* <div><DesktopTab tabData={tabData} setActiveTab={setActiveTab} /></div> */}
                </div>
                {/* <TotalCount>전체 {requests[activeTab].length}개</TotalCount> */}

                <DesktopList pathTo={'requestDetail'}  contents={contents} headers={headers} columns={columns} />
                {/* <MyPagination itemsCountPerPage={12} totalItemsCount={requests[activeTab].length} pageRangeDisplayed={5} /> */}
            </div>
        </div>
    );
}

export const PaginationContainer = styled.div`
  grid-column: 1 / -1; 
  display: flex;
  justify-content: center; 
  margin-top: 1rem; 
`;

export const TotalCount = styled.p`
    color : ${(props) => props.theme.colors.gray50};
`;
