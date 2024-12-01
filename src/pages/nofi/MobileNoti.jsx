import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { TotalCount } from '../../pages/requestManage/RequestManage';
import { getRequest } from '../../apis/axios';

export default function MobileNoti() {
    const [activeTab, setActiveTab] = useState('commentNoties');
    const [userGrade, setUserGrade] = useState();
    const [noties, setNoties] = useState([]);
    const [tabData, setTabData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchMyGrade = async () => {
        try {
            const response = await getRequest('/api/user/checkUserType');
            console.log(response.data);
            setUserGrade(response.data);
            if (response.data === 'REPORTER' || response.data === 'INTERN_REPORTER' || response.data === 'CITIZEN_REPORTER') {
                setTabData([
                    { eventKey: 'commentNoties', title: '댓글', content: '댓글등록' },
                    { eventKey: 'likeNoties', title: '좋아요', content: '좋아요알림' },
                    { eventKey: 'requestNoties', title: '승인', content: '승인알림' },
                ]);
            } else {
                setTabData([
                    { eventKey: 'commentNoties', title: '대댓글', content: '대댓글알림' },
                    { eventKey: 'likeNoties', title: '좋아요', content: '좋아요알림' },
                ]);
            }
        } catch (error) {
            console.error('요청실패', error);
        }
    };

    const fetchNoties = async (userGrade, status) => {
        if (!userGrade) return;
        const endpoint = '/api/notification';
        let param = {};

        if (status === 'requestNoties') {
            param = { type: 'request' };
        } else if (status === 'likeNoties') {
            param = { type: 'like' };
        } else if (status === 'commentNoties') {
            param = { type: 'comment' };
        }
        try {
            const response = await getRequest(endpoint, param);
            const reversedData = Array.isArray(response.data) ? response.data.reverse() : [];
            setNoties(reversedData);
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
        setCurrentPage(1);
    }, [userGrade, activeTab]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIdx = (currentPage - 1) * 8;
    const endIdx = startIdx + 8;
    const currentNoties = noties.slice(startIdx, endIdx);

    return (
        <div className="mobile-container">
            <DesktopTab tabData={tabData} setActiveTab={setActiveTab} />
            <TotalCount>전체 {noties.length}개</TotalCount>

            <StyledNotiListWrapper>
                {currentNoties.length > 0 && currentNoties.map((noti, index) => (
                    <Notification
                        key={index}
                        type={noti.type}
                        userName={noti.sentBy}
                        message={noti.notificationContent}
                        comment={noti.comment !== null ? noti.comment : null}
                        createdAt={noti.createdAt}
                        width={'100%'}
                    />
                ))}
                {noties.length === 0 && <div className='taCenter mt1'>알림이 없습니다.</div>}
            </StyledNotiListWrapper>

            {noties.length !== 0 && (
                <MyPagination itemsCountPerPage={8} totalItemsCount={noties.length} pageRangeDisplayed={5} onPageChange={handlePageChange} />
            )}
        </div>
    );
}

const StyledNotiListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
`;
