import React, { useState } from 'react';
import Notification from './Notification';
import Sidebar from '../../components/Sidebar';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { StyledRequestListWrapper, PaginationContainer, TotalCount } from '../../pages/requestManage/RequestManage';

export default function DesktopNoti() {
    const [activeTab, setActiveTab] = useState('allNoties');

    const tabData = [
        { eventKey: 'allNoties', title: '전체알림', content: '전체알림' },
        { eventKey: 'requestNoti', title: '승인요청', content: '승인요청' },
        { eventKey: 'enrollNoti', title: '기자등록', content: '기자등록' },
        { eventKey: 'commentNoti', title: '댓글등록', content: '댓글등록' },
        { eventKey: 'replyNoti', title: '대댓글등록', content: '대댓글등록' },
    ];
    //대댓글, 구독출판사 새 기사: 사용자만/ 대댓글: 사용자, 기자(시민기자, 일반기자), 편집장/ 승인요청: 편집장만 / 기자등록: 편집장만
    const noties = {
        allNoties: [
            { id: 1, name: '김철수', type: '일반', comment: '좋은 기사 잘 봤습니다~', notiType: 'commentNoti' },
            { id: 2, name: '박영희', type: '기자', title: '인텔 "최신 AI 칩 가우디3 탑재 서버, 국내 상륙 임박"', notiType: 'requestNoti' },
            { id: 3, name: '이민수', type: '시민기자', title: '인텔 "최신 AI 칩 가우디3 탑재 서버, 국내 상륙 임박"', notiType: 'requestNoti' },
            { id: 4, name: '정유진', type: '시민기자', title: '시민기자 등록 요청입니다.', notiType: 'enrollNoti' },
            { id: 5, name: '김철수', type: '일반', reply: '우와 저도 같은 생각이에요~', notiType: 'replyNoti' }
        ],
        requestNoti: [
            { id: 2, name: '박영희', type: '기자', title: '인텔 "최신 AI 칩 가우디3 탑재 서버, 국내 상륙 임박"', notiType: 'requestNoti' },
            { id: 3, name: '이민수', type: '시민기자', title: '인텔 "최신 AI 칩 가우디3 탑재 서버, 국내 상륙 임박"', notiType: 'requestNoti' },
        ],
        enrollNoti: [
            { id: 4, name: '정유진', type: '시민기자', title: '시민기자 등록 요청입니다.', notiType: 'enrollNoti' },
        ],
        commentNoti: [
            { id: 1, name: '김철수', type: '일반', comment: '좋은 기사 잘 봤습니다~', notiType: 'commentNoti' }
        ],
        replyNoti: [
            { id: 5, name: '김철수', type: '일반', reply: '우와 저도 같은 생각이에요~', notiType: 'replyNoti' }
        ]
    };

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <Sidebar />
            <div className="desktop-container">
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
                        />
                    ))}
                </StyledNotiListWrapper>
                <PaginationContainer>
                    <MyPagination itemsCountPerPage={21} totalItemsCount={noties[activeTab].length} pageRangeDisplayed={5} />
                </PaginationContainer>
            </div>
        </div>
    );
}
const StyledNotiListWrapper = StyledRequestListWrapper;