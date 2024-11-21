import React, { useState, useEffect } from "react";
import SubPub from "./SubPub";
import styled from "styled-components";
import PubProfile from "./PubProfile";
import { getRequest } from '../../apis/axios';

export default function SubManage() {
<<<<<<< HEAD
    const [subscriptions, setSubscriptions] = useState([]); // 구독 정보를 저장할 상태
    const [publishers, setPublishers] = useState([]); // 발행자 정보를 저장할 상태
    const [selectedLabel, setSelectedLabel] = useState("전체"); // 선택된 라벨 상태
    const labels = ["전체", "종합지", "인터넷", "매거진", "방송/엔터", "전문지"]; // 라벨 목록
=======
    const subPubs = Array(7).fill(0); // 7개의 SubPub 컴포넌트를 생성
    const labels = ["전체", "종합지", "인터넷", "매거진", "방송/엔터", "경제지", "지역지"];
    const [selectedLabel, setSelectedLabel] = useState("전체"); // 초기 값 '전체'
    const [publishers, setPublishers] = useState([]);

>>>>>>> d2804b5f1164ef29057b54966df3a699ca93f87d
    const labelToTypeMapping = {
        종합지: "GENERAL",
        인터넷: "INTERNET",
        매거진: "MAGAZINE",
        "방송/엔터": "ENTERTAINMENT",
        경제지 : "ECONOMY",
        지역지 : "LOCAL"
    };

    // 구독 데이터를 가져오는 함수
    const fetchMy = async () => {
        try {
            const response = await getRequest('/api/subscription');
            setSubscriptions(response.data); // 받아온 구독 정보를 상태에 저장
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    }

    // 발행자 데이터를 가져오는 함수
    const fetchPublishers = async (type = null) => {
        try {
            const url = type ? `/api/publisher/type?pub_type=${type}` : '/api/publisher';
            const response = await getRequest(url);
            setPublishers(response.data); // 받아온 발행자 정보를 상태에 저장
        } catch (error) {
            console.error('Error fetching publishers:', error);
        }
    };

    // 라벨 클릭 시 호출되는 함수
    const handleLabelClick = (label) => {
        setSelectedLabel(label);
        console.log(`${label} 클릭됨`);
        // "전체"일 경우에는 전체 발행자 데이터를 가져오기
        if (label === "전체") {
<<<<<<< HEAD
            fetchPublishers();
=======
            axios.get("/api/publisher") // "전체"는 /api/publisher로 요청
                .then(response => {
                    setPublishers(response.data);  // 받은 데이터로 publishers 상태 업데이트
                    // console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching publishers:', error);
                });
>>>>>>> d2804b5f1164ef29057b54966df3a699ca93f87d
        } else {
            // 해당 라벨에 맞는 발행자 타입으로 API 호출
            const type = labelToTypeMapping[label];
            if (type) {
<<<<<<< HEAD
                fetchPublishers(type);
=======
                axios.get(`/api/publisher/type?pub_type=${type}`)
                    .then(response => {
                        setPublishers(response.data);  // 받은 데이터로 publishers 상태 업데이트
                        // console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching publishers:', error);
                    });
>>>>>>> d2804b5f1164ef29057b54966df3a699ca93f87d
            }
        }
    };

    // 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 설정
    useEffect(() => {
        fetchPublishers(); // 전체 발행자 정보 가져오기
        fetchMy(); // 구독 정보 가져오기
    }, []);  // 빈 배열을 의존성 배열로 사용

    // subscriptions 상태가 바뀔 때마다 최신 구독 정보를 로그로 출력
    useEffect(() => {
        console.log('Updated subscriptions:', subscriptions);
    }, [subscriptions]);

    // subPubs 배열을 subscriptions 데이터를 기반으로 만들어서 최대 7개만 보여주도록 설정
    const subPubs = subscriptions.slice(0, 7);

    return (
        <div className='mobile-container column'>
            <CenteredContainer>
                <GrayBox>
                    {subPubs.map((sub, index) => (
                        <SubPub key={index} publisher={sub.publisher_name} />
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
