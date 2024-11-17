import React from "react";
import styled from "styled-components";
import { CgAddR } from "react-icons/cg";

export default function PubProfile({ publisherImg, publisherName, publisherType, publisherUrl }) {
    return (
        <ProfileBox>
            <IconWrapper>
                <CgAddR  />
            </IconWrapper>

            <PubImg src={publisherImg}></PubImg>
            <PubName>{publisherName}</PubName>
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
    justify-content: center;
    align-items: center;
    text-align: center;

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