import React, { useState } from 'react';
import Notification from './Notification';
import Sidebar from '../../components/Sidebar';

import { StyledRequestListWrapper, PaginationContainer, TotalCount } from '../../pages/requestManage/RequestManage';

export default function DesktopNoti() {
    
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <Sidebar />
            <div className="desktop-container">
                <Notification type={'시민기자'} userName={'김철수'} title={'인텔 “최신 AI 칩 가우디3 탑재 서버, 국내 상륙 입박”'}/>
                <br></br>
                <Notification type={'기자'} userName={'김철수'} title={'인텔 “최신 AI 칩 가우디3 탑재 서버, 국내 상륙 입박”'}/>
                <br></br>
                <Notification type={'일반'} userName={'김철수'} title={'인텔 “최신 AI 칩 가우디3 탑재 서버, 국내 상륙 입박”'}/>
            </div>
        </div>
    );
};
const StyledStaffListWrapper = StyledRequestListWrapper;
