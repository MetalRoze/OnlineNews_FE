import React, { useState } from 'react';
import Notification from './Notification';
import Sidebar from '../../components/Sidebar';
import DesktopTab from '../../components/DesktopTab';

export default function DesktopNoti() {
    const [activeTab, setActiveTab] = useState('allNoties');

    const tabData = [
        { eventKey: 'allNoties', title: '전체알림', content: '전체알림' },
        { eventKey: 'requestNoti', title: '승인요청', content: '승인요청' },
        { eventKey: 'enrollNoti', title: '기자등록', content: '기자등록' },
        { eventKey: 'commentNoti', title: '댓글등록', content: '댓글등록' },
        { eventKey: 'replyNoti', title: '대댓글등록', content: '대댓글등록' },
    ];

    const noties = {
        allNoties: [
            { id: 1, name: '김철수', type: '일반', comment: '좋은 기사 잘 봤습니다~' },
            { id: 2, name: '박영희', type: '기자', title: '인텔 "최신 AI 칩 가우디3 탑재 서버, 국내 상륙 임박"' },
            { id: 3, name: '이민수', type: '시민기자', title: '인텔 "최신 AI 칩 가우디3 탑재 서버, 국내 상륙 임박"' },
            { id: 4, name: '정유진', type: '시민기자', title: '시민기자 등록 요청입니다.' },
            { id: 5, name: '김철수', type: '일반', reply: '우와 저도 같은 생각이에요~' }
        ],
        requestNoti: [
            { id: 2, name: '박영희', type: '기자', title: '인텔 "최신 AI 칩 가우디3 탑재 서버, 국내 상륙 임박"' },
            { id: 3, name: '이민수', type: '시민기자', title: '인텔 "최신 AI 칩 가우디3 탑재 서버, 국내 상륙 임박"' },
        ],
        enrollNoti: [
            { id: 4, name: '정유진', type: '시민기자', title: '시민기자 등록 요청입니다.' },
        ],
        commentNoti: [
            { id: 1, name: '김철수', type: '일반', comment: '좋은 기사 잘 봤습니다~' }
        ],
        replyNoti: [
            { id: 5, name: '김철수', type: '일반', reply: '우와 저도 같은 생각이에요~' }
        ]
    };
    const getNotiType = (eventKey) => {
        switch (eventKey) {
            case 'requestNoti':
                return 'requestNoti';
            case 'enrollNoti':
                return 'enrollNoti';
            case 'commentNoti':
                return 'commentNoti';
            case 'replyNoti':
                return 'replyNoti';
            
        }
    };
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <Sidebar />
            <div className="desktop-container">
                <DesktopTab tabData={tabData} setActiveTab={setActiveTab} />

                {noties[activeTab].map((noti) => (
                    <Notification
                    notiType={getNotiType(activeTab)}
                    type={noti.type}
                    userName={noti.name}
                    title={noti.title}
                    comment={noti.comment}
                    reply= {noti.reply}
                />
                ))}
            </div>
        </div>
    );
}
