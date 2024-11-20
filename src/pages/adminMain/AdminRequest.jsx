import React from 'react';
import Label from '../../components/Label';
import styled from 'styled-components';
import { convertUserGradeNumToKor } from '../../utils/convertUserGrade';

export default function AdminRequest({ request }) {
    console.log(request);
    return (
        <div className='desktop-item pd10 aiCenter' >
            <StyledArticleContentWrapper>
                <div className='flex spaceBetween' style={{ width: '100%' }}>
                    <div className='flex ' style={{ gap: '0.5rem' }} >
                        <h5 className='m0'>{request.userName} 기자</h5>
                        {convertUserGradeNumToKor(request.userGrade) === '시민기자' && <Label text="시민" />}
                    </div>
                    <p className='m0'>{request.createdAt.split("T")[0]}</p>
                </div>
                <p className='ellipsis m0 mt1'>{request.requestTitle === null ? "아무말이나 하고 있습니다. 지금 db에는 아무 requestTitle이 없어서 너무 못생겼습니다.dddddddddddddddddd" : request.requestTitle}</p>
            </StyledArticleContentWrapper>

        </div>
    );
}
const StyledArticleContentWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1.5fr;
    justify-items: flex-start;
`;