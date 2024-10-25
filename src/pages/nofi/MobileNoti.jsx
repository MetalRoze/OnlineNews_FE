import React, { useState } from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { PaginationContainer, TotalCount } from '../../pages/requestManage/RequestManage';

export default function MobileNoti() {
    const [activeTab, setActiveTab] = useState('allNoties');

    const tabData = [
        { eventKey: 'allNoties', title: '전체알림', content: '전체알림' },
        { eventKey: 'commentNoti', title: '댓글등록', content: '댓글등록' },
        { eventKey: 'replyNoti', title: '대댓글등록', content: '대댓글등록' },
    ];
    const noties = {
        allNoties: [
            { id: 1, name: '김철수', type: '일반', comment: '좋은 기사 잘 봤습니다~', notiType: 'commentNoti' },
            { id: 2, name: '김철수', type: '일반', comment: '좋은 기사 잘 봤습니다~', notiType: 'commentNoti' },
            { id: 3, name: '김철수', type: '일반', comment: '좋은 기사 잘 봤습니다~', notiType: 'commentNoti' },
            { id: 4, name: '김철수', type: '일반', reply: '우와 저도 같은 생각이에요~', notiType: 'replyNoti' },
            { id: 5, name: '김철수', type: '일반', reply: '우와 저도 같은 생각이에요~', notiType: 'replyNoti' },
            { id: 6, name: '김철수', type: '일반', reply: '우와 저도 같은 생각이에요~', notiType: 'replyNoti' }
        ],
        commentNoti: [
            { id: 1, name: '김철수', type: '일반', comment: '좋은 기사 잘 봤습니다~', notiType: 'commentNoti' },
            { id: 2, name: '김철수', type: '일반', comment: '좋은 기사 잘 봤습니다~', notiType: 'commentNoti' },
            { id: 3, name: '김철수', type: '일반', comment: '좋은 기사 잘 봤습니다~', notiType: 'commentNoti' },
        ],
        replyNoti: [
            { id: 4, name: '김철수', type: '일반', reply: '우와 저도 같은 생각이에요~', notiType: 'replyNoti' },
            { id: 5, name: '김철수', type: '일반', reply: '우와 저도 같은 생각이에요~', notiType: 'replyNoti' },
            { id: 6, name: '김철수', type: '일반', reply: '우와 저도 같은 생각이에요~', notiType: 'replyNoti' }
        ]
    };

    return (
        <div className="mobile-container">
            <DesktopTab tabData={tabData} setActiveTab={setActiveTab} />
            <TotalCount>전체 {noties[activeTab].length}개</TotalCount>
            <StyledNotiListWrapper>
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
            </StyledNotiListWrapper>
            <PaginationContainer>
                <MyPagination itemsCountPerPage={10} totalItemsCount={noties[activeTab].length} pageRangeDisplayed={5} />
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