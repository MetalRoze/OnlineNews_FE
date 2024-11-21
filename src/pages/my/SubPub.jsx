import React from "react";
import styled from "styled-components";

export default function SubPub({ publisher, onClick }) {
    return (
        <WhiteBox
            onClick={onClick || null} // onClick이 없으면 클릭 불가능
            isClickable={!!onClick}  // 클릭 가능 여부를 스타일로 전달
        >
            <Text>{publisher}</Text>
        </WhiteBox>
    );
}

const WhiteBox = styled.div`
    width: 7rem;
    height: 4rem;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    box-sizing: border-box;
    padding: 1rem;
    cursor: pointer; /* 클릭 가능 시 커서 변경 */
    
    &:hover {
        background-color: #f0f0f0; /* 클릭 가능 시 호버 효과 */
    }

    @media (max-width: 600px) {
        width: 5.8rem;
        height: 3.2rem;
        padding: 0.5rem;
    } 
`;

const Text = styled.p`
    margin: 0;
    text-align: center;
    font-size: 1rem;
`;
