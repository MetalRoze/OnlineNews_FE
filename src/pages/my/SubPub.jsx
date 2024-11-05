import React from "react";
import styled from "styled-components";

export default function SubPub({publisher}) {
    return (
        <WhiteBox>
            <Text>{publisher}</Text>
        </WhiteBox>
    );
}

const WhiteBox = styled.div`
    width: 7rem; /* 그리드 셀의 너비 */
    height: 4rem; /* 그리드 셀의 높이 */
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    box-sizing: border-box; /* 패딩, 보더 포함한 박스 크기 */
    padding: 1rem; /* 내부 패딩 추가 */
 
    @media (max-width: 600px) {
        width: 5.8rem; /* 작은 화면에서 너비 변경 */
        height: 3.2rem; /* 작은 화면에서 높이 변경 */
        padding: 0.5rem; /* 내부 패딩 조정 */
    } 
`;

const Text = styled.p`
    margin: 0; /* p 태그 기본 margin 제거 */
    text-align: center; /* 텍스트를 중앙 정렬 */
    font-size: 1rem; /* 원하는 글자 크기 조절 */
`;