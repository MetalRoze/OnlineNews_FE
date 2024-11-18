import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { convertStatusToKor, convertStatusToEng } from '../../utils/convertStatus';
import { getRequest } from '../../apis/axios';
import { DesktopList } from '../../components/DesktopList';

export default function RequestManage() {
    const [activeTab, setActiveTab] = useState('allRequests');
    const [requests, setRequests] = useState([]);

    const tabData = [
        { eventKey: 'allRequests', title: '전체요청' },
        { eventKey: 'approved', title: '승인' },
        { eventKey: 'rejected', title: '거절' },
        { eventKey: 'holding', title: '보류' },
    ];

    const fetchRequests = async (status) => {
        try {
            const endpoint = status === 'allRequests' 
                ? '/api/request' 
                : '/api/request/status';
            const params = status === 'allRequests' ? {} : { keyword: status };
            const response = await getRequest(endpoint, params);
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        fetchRequests(activeTab);
    }, [activeTab]);

    const headers = ["접수일자", "이름", "구분", "제목", "처리구분", "승인일자"];

    const contents = requests.map((request) => ({
        접수일자: request.createdAt.split("T")[0],
        이름: request.userName,
        구분: "기자",
        제목: request.articleTitle,
        처리구분: convertStatusToKor(request.status),
        승인일자: "",
    }));

    const columns = "1fr 0.8fr 0.8fr 2fr 1fr 1fr";

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container">
                <div className="flex aiCenter spaceBetween mb1">
                    <h2>승인요청내역</h2>
                    <div><DesktopTab  tabData={tabData}  activeTab={activeTab} setActiveTab={setActiveTab} /></div>
                </div>
                <TotalCount>전체 {requests.length}개</TotalCount>

                <DesktopList pathTo={'requestDetail'} contents={contents} headers={headers} columns={columns}/>
                <MyPagination itemsCountPerPage={12} totalItemsCount={requests.length} pageRangeDisplayed={5} />
            </div>
        </div>
    );
}

export const TotalCount = styled.p`
    color: ${(props) => props.theme.colors.gray50};
`;
