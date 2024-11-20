import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { PaginationContainer, TotalCount } from '../../pages/requestManage/RequestManage';
import { getRequest } from '../../apis/axios';

export default function MobileNoti() {
    const [activeTab, setActiveTab] = useState('allNoties');
    const [user, setUser] = useState(null);
    const [tabData, setTabData] = useState([]);

    const fetchMyInfo = async () => {
        try {
            const response = await getRequest('/api/user/myPage');
            console.log(response.data);
        } catch (error) {
            console.error('요청실패', error);
        }
    };
    const fetchMyGrade = async () => {
        try {
            const response = await getRequest('/api/user/checkUserType');
            console.log(response.data);
            if (response.data === 'REPORTER' || response.data=== 'INTERN_REPORTER' || response.data=== 'CITIZEN_REPORTER' ) {
                setTabData([
                    { eventKey: 'approveNoti', title: '승인알림', content: '승인알림' },
                    { eventKey: 'commentNoti', title: '댓글등록', content: '댓글등록' },
                    { eventKey: 'likeNoti', title: '좋아요알림', content: '좋아요알림' },
                ]);
            } else {
                setTabData([
                    { eventKey: 'commentNoti', title: '댓글', content: '댓글알림' },
                    { eventKey: 'replyNoti', title: '대댓글', content: '대댓글알림' },
                ]);
            }
        } catch (error) {
            console.error('요청실패', error);
        }
    };
    useEffect(() => {
        fetchMyGrade();
        fetchMyInfo();
    }, []);
    return (
        <div className="mobile-container">
            <DesktopTab tabData={tabData} setActiveTab={setActiveTab} />
            <TotalCount>전체 개</TotalCount>
            {/* <StyledNotiListWrapper>
                {noties[activeTab].map((noti) => (
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
            </StyledNotiListWrapper> */}
            {/* <PaginationContainer>
                <MyPagination itemsCountPerPage={10} totalItemsCount={noties[activeTab].length} pageRangeDisplayed={5} />
            </PaginationContainer> */}
        </div>
    );
}
const StyledNotiListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
`;