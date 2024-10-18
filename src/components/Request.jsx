import React from 'react';
import styled from 'styled-components';

export default function Request() {

    return (
        <StyledRequestWrapper className='flex column pd10 aiFlexend'>
            {/* <div className='flex mb1' style={{border: '1px solid black'}}>
                
                <p className='m0' style={{border: '1px solid black'}}>10:30</p>
            </div> */}
            <h3 className='mb1'  style={{border: '1px solid black'}}>인텔 "최신 AI 칩 가우디3 탑재 서버, 국내 상륙 임박"</h3>
            <div className='flex desktop-3buttons br10' style={{width: '70%'}}>
                <button>승인</button>
                <button>보류</button>
                <button>거절</button>
            </div>
        </StyledRequestWrapper>
    );
}
const StyledRequestWrapper = styled.div`
    width: 25rem;
    background-color: ${(props) => props.theme.colors.gray10};
`;