import React from "react";
import styled from "styled-components";
import { CgAddR } from "react-icons/cg";

export default function PubProfile() {
    return (
        <ProfileBox>
            <IconWrapper>
                <CgAddR  />
            </IconWrapper>

            <PubImg src="data:image/png;base64,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"></PubImg>
            <PubName>스브스뉴스</PubName>
        </ProfileBox>
    );
}

const IconWrapper = styled.div`
    position: absolute;
    color: #AEAEB2; /* 색상 변경 */
    font-size: 1.5rem; /* 크기 증가 */
    z-index: 90; /* 이미지 위로 올리기 */
    display: flex; /* 아이콘을 중앙에 정렬 */
`;

const PubName = styled.div`
    text-overflow : ellipsis;

`;

const ProfileBox = styled.div`
    margin: 0 auto;
    justify-self: center;
    overflow: hidden;
    text-overflow: ellipsis; 
    white-space: nowrap;
    width: 7rem;
    height: 8.5rem;
    position : relative;


    @media (max-width: 600px) {
        width: 6.5rem; /* 작은 화면에서 너비 변경 */
        height: 7.5rem;
        padding: 0.5rem; /* 내부 패딩 조정 */
    } 
`;

const PubImg = styled.img`
    width : 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover; 
    border-radius : 0.5rem;
`;