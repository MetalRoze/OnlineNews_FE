import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { PaginationContainer, TotalCount } from '../../pages/requestManage/RequestManage';
import { getRequest } from '../../apis/axios';

export default function MobileNoti() {
    const [activeTab, setActiveTab] = useState('requestNoties');
    const [userGrade, setUserGrade] = useState();
    const [noties, setNoties] = useState([]);
    const [tabData, setTabData] = useState([]);

    const fetchMyGrade = async () => {
        try {
            const response = await getRequest('/api/user/checkUserType');
            console.log(response.data);
            setUserGrade(response.data);
            if (response.data === 'REPORTER' || response.data === 'INTERN_REPORTER' || response.data === 'CITIZEN_REPORTER') {
                setTabData([
                    { eventKey: 'requestNoties', title: '승인', content: '승인알림' },
                    { eventKey: 'commentNoties', title: '댓글', content: '댓글등록' },
                    { eventKey: 'likeNoties', title: '좋아요', content: '좋아요알림' },
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
        if (!userGrade) return;
        let endpoint = '';

        // 기자 알림
        if (userGrade === 'REPORTER' || userGrade === 'INTERN_REPORTER' || userGrade === 'CITIZEN_REPORTER') {
            if (status === 'requestNoties') {
                endpoint = '/api/notification/journalist/request';
            } else if (status === 'likeNoties') {
                endpoint = '/api/notification/journalist/like';
            } else if (status === 'commentNoties') {
                endpoint = '/api/notification/journalist/comment';
            }
        }
        else if (userGrade === 'GENERAL_MEMBER') {
            // 사용자 알림 나중에 함
        }

        try {
            const response = await getRequest(endpoint);
            setNoties(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('요청실패', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchMyGrade(); 
                if (userGrade) {     
                    await fetchNoties(userGrade, activeTab);
                }
            } catch (error) {
                console.error("데이터 가져오기 실패", error);
            }
        };
        fetchData();
    }, [userGrade, activeTab]);

    return (
        <div className="mobile-container">
            <DesktopTab tabData={tabData} setActiveTab={setActiveTab} />
            <TotalCount>전체 {noties.length}개</TotalCount>

            <StyledNotiListWrapper>
                {noties && noties.map((noti, index) => (
                    <Notification
                        key={index}
                        notiType={noti.type}
                        userName={noti.sentBy}
                        message={noti.notificationContent}
                        comment={noti.comment !== null ? noti.comment : null}
                        createdAt={noti.createdAt}
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
