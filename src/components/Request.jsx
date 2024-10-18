import React from 'react';
import styled from 'styled-components';

export default function Request() {

    return (
        <div className='desktop-request pd10 aiFlexend'>
            <div className='flex'>
                <p>홍길동 기자</p>
                <p className='taRight'>23:59</p>
            </div>
            <h4 className='mb1 ellipsis' style={{height: '5rem'}}>인텔 "최신 AI 칩 가우디3 탑재 서버, 국내 상륙 임박"</h4>
            <div className='flex desktop-request-3buttons br10' style={{width: '70%'}}>
                <button>승인</button>
                <button>보류</button>
                <button>거절</button>
            </div>
        </div>
    );
}