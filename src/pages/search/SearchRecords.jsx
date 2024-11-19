import React from "react";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";

export default function SearchRecords() {
    return (
        <StyledHeader className="mobile-header">
            <p style={{marginLeft:"0.5rem"}}>한국은행</p>
            <StyledCloseIcon onClick={{}}/>
        </StyledHeader>
    );
}

const StyledHeader = styled.div`
    display: flex;             /* Flexbox로 아이템 정렬 */
    justify-content: space-between; /* 양 끝으로 배치 */
    align-items: center;       /* 세로로 중앙 정렬 */
`;


const StyledCloseIcon = styled(CgClose)`
    margin-right: 0.5rem;        /* 원하는 margin 값 설정 */
    cursor: pointer;           /* 아이콘 클릭 가능하도록 설정 */
`;
