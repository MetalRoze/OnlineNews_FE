import React from 'react';
import Label from '../components/Label';

export default function AdminRequest({ type }) {
    return (
        <div className='desktop-request pd10 aiCenter'>
            <div className='flex spaceBetween mb1' style={{ width: '100%' }}>
                <div className='flex' style={{gap:'0.5rem'}}>
                    <p className='m0'>홍길동 기자</p>
                    {type === '시민기자' && <Label text="시민" />}
                </div>
                <p className='m0'>23:59</p>
            </div>
            <h4 className='ellipsis'>인텔 "최신 AI 칩 가우디3 탑재 서버, 국내 상륙 임박" 승인요청입니다.</h4>
        </div>
    );
}