import React from 'react';
import styled from 'styled-components';

export default function AdminArticle() {

    return (
        <div className='desktop-article pd10 aiCenter' >
            <img src="https://placehold.co/100x100" alt="Bootstrap"/>
            <div className='ml05' style={{width: '75%'}}>
                <h5 className='ellipsis'>AI로 ‘그놈 목소리’ 잡는다…KT, 규제샌드박스 실증특례 승인</h5>
                <p className='ellipsis'>KT는 인공지능(AI) 기술을 활용해 실시간 통화에서 보이스피싱을 자동 탐지하는 ‘KT 실시간</p>
                <div className='flex'>
                    <i class="bi bi-eye" />
                    <p className=' m0 ml05' >99,999</p>
                </div>
            </div>
        </div>
    );
}