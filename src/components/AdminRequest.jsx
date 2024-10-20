import React from 'react';

export default function AdminRequest({ activeTab }) {
    return (
        <div className='desktop-request pd10 aiFlexend'>
            <div className='flex spaceBetween' style={{ width: '100%' }}>
                <p>홍길동 기자</p>
                <p>23:59</p>
            </div>
            <h4 className='mb1 ellipsis' style={{ height: '5rem' }}>인텔 "최신 AI 칩 가우디3 탑재 서버, 국내 상륙 임박"</h4>
            {(activeTab === 'unread' || activeTab === 'allRequests') &&(
                <div className='flex desktop-request-3buttons br10' style={{ width: '70%' }}>
                    <button>승인</button>
                    <button>보류</button>
                    <button>거절</button>
                </div>
            )}

            {(activeTab === 'pending' || activeTab === 'rejected') && (
                <div className='flex desktop-request-3buttons-check br10' style={{ width: '70%' }}>
                    <button>승인</button>
                    <button className={activeTab === 'pending' ? 'pending' : ''}>보류</button>
                    <button className={activeTab === 'rejected' ? 'rejected' : ''}>거절</button>
                </div>
            )}
            {activeTab === 'approved' && (
                <button className='desktop-request-privatebutton'>비공개</button>
            )}

        </div>
    );
}