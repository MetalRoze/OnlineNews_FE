import React, { useState, useEffect } from "react";
import SubPub from "./SubPub";
import styled from "styled-components";
import PubProfile from "./PubProfile";

export default function SubManage() {
    const subPubs = Array(7).fill(0); // 7개의 SubPub 컴포넌트를 생성
    const pubProfiles = Array(12).fill(0); // 12개의 PubProfile 컴포넌트를 생성 (예시)
    const labels = ["전체", "종합지", "경제지", "매거진", "지역지", "전문지"];
    const [selectedLabel, setSelectedLabel] = useState("전체"); // 초기 값 '전체'

    const handleLabelClick = (label) => {
        setSelectedLabel(label);
        console.log(`${label} 클릭됨`);
    };

    useEffect(() => {
        setSelectedLabel("전체"); // 컴포넌트가 처음 렌더링될 때 '전체'를 선택
    }, []);

    return (
        <div className='mobile-container column'>
            <CenteredContainer>
                <GrayBox>
                    {subPubs.map((_, index) => (
                        <SubPub key={index} publisher={`신문사 ${index + 1}`} />
                    ))}
                </GrayBox>
            </CenteredContainer>

            <LabelContainer className="mt1 labels-container">
                {labels.map((label) => (
                    <Label
                        key={label}
                        isSelected={selectedLabel === label}
                        onClick={() => handleLabelClick(label)}
                    > 
                        {label}
                    </Label>
                ))}
            </LabelContainer>

            <ProfileContainer>
                {pubProfiles.map((_, index) => (
                    <PubProfile key={index} />
                ))}
            </ProfileContainer>
        </div>
    );
}

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
`;

const GrayBox = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    background-color: #ccc;
    padding: 1rem;
    border-radius: 1rem;
`;

const Label = styled.div`
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: ${(props) => (props.isSelected ? "blue" : "#F2F2F7")};
    color: ${(props) => (props.isSelected ? "white" : "black")};
    cursor: pointer;
    margin-right: 0.5rem;
    
    &:hover {
        opacity: 0.8;
    }
`;

const LabelContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 1rem;
`;

const ProfileContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4개씩 열 */
    gap: 1rem;
    width: 90%;
    // max-width: 48rem; 
    margin: 0 auto; /* 중앙 정렬 */

    @media (max-width: 600px) {
        gap: 0.3rem;
    }
    
`;
