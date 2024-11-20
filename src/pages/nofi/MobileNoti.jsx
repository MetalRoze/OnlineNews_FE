import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { PaginationContainer, TotalCount } from '../../pages/requestManage/RequestManage';
import { getRequest } from '../../apis/axios';

export default function MobileNoti() {
    const [activeTab, setActiveTab] = useState('allNoties');
    const [userGrade,setUserGrade] = useState();
    const [noties, setNoties] = useState([]);
    const [tabData, setTabData] = useState([]);

    const fetchMyGrade = async () => {
        try {
            const response = await getRequest('/api/user/checkUserType');
            console.log(response.data);
            setUserGrade(response.data);
            if (response.data === 'REPORTER' || response.data=== 'INTERN_REPORTER' || response.data=== 'CITIZEN_REPORTER' ) {
                setTabData([
                    { eventKey: 'allNoties', title: '전체', content: '전체알림' },
                    { eventKey: 'REPORTER_APPROVAL_ACCEPTED', title: '승인', content: '승인알림' },
                    { eventKey: 'REPORTER_COMMENT', title: '댓글', content: '댓글등록' },
                    { eventKey: 'REPORTER_LIKE', title: '좋아요', content: '좋아요알림' },
                ]);
            } else {
                setTabData([
                    { eventKey: 'allNoties', title: '전체', content: '전체알림' },
                    { eventKey: 'commentNoti', title: '댓글', content: '댓글알림' },
                    { eventKey: 'USER_REPLY', title: '대댓글', content: '대댓글알림' },
                    { eventKey: 'USER_LIKE', title: '좋아요', content: '좋아요알림' },
                ]);
            }
        } catch (error) {
            console.error('요청실패', error);
        }
    };

    const fetchNoties = async (userGrade, status) => {
        try {
            const endpoint = status === 'allNoties'
                ? '/api/notification/journalist'
                : '/api/notification/journalist/type';
            const params = status === 'allNoties' ? {} : { type: status };
            const response = await getRequest(endpoint, params);
            setNoties(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('요청실패', error);
        }
    };

    useEffect(() => {
        fetchMyGrade();
        fetchNoties(userGrade, activeTab);
    }, [activeTab]);
    return (
        <div className="mobile-container">
            <DesktopTab tabData={tabData} setActiveTab={setActiveTab} />
            <TotalCount>전체 개</TotalCount>
            <StyledNotiListWrapper>
                {noties.map((noti) => (
                    <Notification
                        notiType={noti.notiType}
                        type={noti.type}
                        userName={noti.name}
                        title={noti.title}
                        comment={noti.comment}
                        reply={noti.reply}
                        width={'100%'}
                    />
                ))}
            </StyledNotiListWrapper>
            <PaginationContainer>
                <MyPagination itemsCountPerPage={10} totalItemsCount={noties.length} pageRangeDisplayed={5} />
            </PaginationContainer>
        </div>
    );
}
const StyledNotiListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
`;