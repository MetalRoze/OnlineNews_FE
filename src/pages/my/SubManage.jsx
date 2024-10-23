import React from "react";
import SubPub from "./SubPub";
import styled from "styled-components";

export default function SubManage() {
    const subPubs = Array(7).fill(0); // 7개의 SubPub 컴포넌트를 생성


    return (
        <div className='mobile-header column'>
            <CenteredContainer>
                <GrayBox>
                    {subPubs.map((_, index) => (
                        <SubPub key={index} publisher={`신문사 ${index + 1}`} />
                    ))}
                </GrayBox>
            </CenteredContainer>

        </div>
    );
}

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center; /* GrayBox를 부모 컨테이너에서 중앙 정렬 */
    width: 100%; /* 부모 컨테이너 전체 너비 */
    margin-top : 1rem;
`;

const GrayBox = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4개의 동일 너비의 열 */
    gap: 1.0rem; /* 그리드 항목들 간의 간격 */
    width: auto; /* 너비를 부모의 중앙 정렬에 맞춤 */
    background-color: #ccc;
    padding: 1.0rem;
    border-radius: 1rem;
    box-sizing: border-box;
    max-width: 48rem; /* 그레이 박스의 최대 너비 제한 */
`;