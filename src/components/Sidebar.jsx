import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="desktop-sidebar">
            <img src="https://placehold.co/100x50" alt="Bootstrap" className='logo' />
            <div className='list'>
                <div className='ul'>
                    <Link to="/articleManage"><i className="bi bi-search mr15 mb1"></i>기사 검색</Link>
                    <Link to="/staffManage"><i className="bi bi-people mr15 mb1"></i>직원 관리</Link>
                    <Link to="/requestManage"><i className="bi bi-question-circle mr15 mb1"></i>요청 관리</Link>
                    <Link to="/desktopNoti"><i className="bi bi-bell mr15 mb1"></i>알림</Link>
                    <Link to="/adminMypage"><i className="bi bi-person mr15"></i>내 정보</Link>
                </div>
            </div>
            <div style={{ flex: "1" }}></div>
            <div className='logout'>
                <Link to="/"><i className="bi bi-box-arrow-right mr15"></i>로그아웃</Link>
            </div>
        </div>
    );
};

export default Sidebar;
