import React, { useState } from 'react';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { DesktopList } from '../../components/DesktopList';
import styled from 'styled-components';

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

    const headers = ["생성일자", "구분", "이름", "내용"];
    const contents = [
        {
            생성일자: "2023-10-01",
            구분: "승인요청",
            이름: "홍길동",
            내용: "어쩌고 승인요청입니다."
        },
        {
            생성일자: "2023-10-01",
            구분: "기자등록",
            이름: "홍길동",
            내용: "홍길동 시민기자 등록 요청입니다."
        },
    ];
    const columns = "1fr 0.8fr 0.8fr 2fr";

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container">
                <div className='flex aiCenter spaceBetween mb1'>
                    <h2>알림</h2>
                    <div><DesktopTab tabData={tabData} setActiveTab={setActiveTab} /></div>
                </div>
                <TotalCount>전체 {noties[activeTab].length}개</TotalCount>

                <DesktopList contents={contents} headers={headers} columns={columns} />
            
                 <MyPagination itemsCountPerPage={12} totalItemsCount={noties[activeTab].length} pageRangeDisplayed={5} />
            </div>
        </div>
    );
}
const TotalCount = styled.p`
    color : ${(props) => props.theme.colors.gray50};
`;
