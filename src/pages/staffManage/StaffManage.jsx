import React from 'react';
import Staff from './Staff';
import Sidebar from '../../components/Sidebar';
export default function StaffManage() {
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <Sidebar />
            <div className="desktop-container">
                <Staff staffName={'김철수'} address={'ddd@naver.com'} phoneNumber={'010-2843-9317'}/>
            </div>
        </div>
    );
};