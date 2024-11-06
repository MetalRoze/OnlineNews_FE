import React from 'react';
import styled from 'styled-components';

export default function AdminArticle() {

    return (
        <div className='desktop-item pd10 aiCenter' >

            <StyledArticleContentWrapper className='ml05' >
                <h5 className='ellipsis'>AI로 ‘그놈 목소리’ 잡는다…KT, 규제샌드박스 실증특례 승인</h5>
                <p className='ellipsis m0'>KT는 인공지능(AI) 기술을 활용해 실시간 통화에서 보이스피싱을 자동 탐지하는 ‘KT 실시간</p>
                <div className='flex'>
                    <i className="bi bi-eye" />
                    <p className=' m0 ml05' >99,999</p>
                </div>
            </StyledArticleContentWrapper>
            <img src="https://placehold.co/160x120" alt="Bootstrap" />
        </div>
    );
}
const StyledArticleContentWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1.5fr 1fr;
    justify-items: flex-start;
`;