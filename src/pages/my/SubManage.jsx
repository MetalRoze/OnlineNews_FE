import React, { useState, useEffect } from "react";
import SubPub from "./SubPub";
import styled from "styled-components";
import PubProfile from "./PubProfile";
import axios from "axios";

export default function SubManage() {
    const subPubs = Array(7).fill(0); // 7개의 SubPub 컴포넌트를 생성
    const labels = ["전체", "종합지", "인터넷", "매거진", "방송/엔터", "경제지", "지역지"];
    const [selectedLabel, setSelectedLabel] = useState("전체"); // 초기 값 '전체'
    const [publishers, setPublishers] = useState([]);

    const labelToTypeMapping = {
        종합지: "GENERAL",
        인터넷: "INTERNET",
        매거진: "MAGAZINE",
        "방송/엔터": "ENTERTAINMENT",
        경제지 : "ECONOMY",
        지역지 : "LOCAL"
    };

    const handleLabelClick = (label) => {
        setSelectedLabel(label);
        console.log(`${label} 클릭됨`);
    
        // "전체"를 선택한 경우, 모든 데이터를 가져오는 요청
        if (label === "전체") {
            axios.get("/api/publisher") // "전체"는 /api/publisher로 요청
                .then(response => {
                    setPublishers(response.data);  // 받은 데이터로 publishers 상태 업데이트
                    // console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching publishers:', error);
                });
        } else {
            // 선택한 label에 맞는 type에 대해 API 요청
            const type = labelToTypeMapping[label]; // 클릭한 label에 해당하는 Type 찾기
    
            if (type) {
                axios.get(`/api/publisher/type?pub_type=${type}`)
                    .then(response => {
                        setPublishers(response.data);  // 받은 데이터로 publishers 상태 업데이트
                        // console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching publishers:', error);
                    });
            }
        }
    };
    

    useEffect(() => {
        setSelectedLabel("전체"); // 컴포넌트가 처음 렌더링될 때 '전체'를 선택

        axios.get("/api/publisher")
            .then(response => {
                setPublishers(response.data);  // 받은 데이터로 subscriptions 상태 업데이트
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching subscriptions:', error);
            });
    }, []);  // 빈 배열을 의존성으로 두어 한 번만 실행되도록 설정

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
                {publishers.map((publisher, index) => (
                    <PubProfile
                        key={index}
                        publisherImg={publisher.publisher_img}
                        publisherName={publisher.publisher_name}
                        publisherType={publisher.publisher_type}
                        publisherUrl={publisher.publisher_url} />
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
    justify-content: start;
    margin: 0 auto 1rem auto; // 중앙 정렬
    width: 90%; // 너비를 80%로 줄이기
    overflow-x: auto;
    white-space: nowrap;
    padding: 0.5rem 0;
    margin-top : 0.5rem;
    
    /* 모든 브라우저에서 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer와 Edge */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
`;



const ProfileContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4개씩 열 */
    gap: 1rem;
    width: 90%;
    margin: 0 auto;

    @media (max-width: 600px) {
        gap: 0.3rem;
    }
`;
