import React, { useState, useEffect } from "react";
import SubPub from "./SubPub";
import styled from "styled-components";
import PubProfile from "./PubProfile";
import { getRequest, deleteRequest } from "../../apis/axios";

export default function SubManage() {
    const labels = ["전체", "종합지", "인터넷", "매거진", "방송/엔터", "경제지", "지역지"];
    const [selectedLabel, setSelectedLabel] = useState("전체");
    const [publishers, setPublishers] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    const labelToTypeMapping = {
        종합지: "GENERAL",
        인터넷: "INTERNET",
        매거진: "MAGAZINE",
        "방송/엔터": "ENTERTAINMENT",
        경제지: "ECONOMY",
        지역지: "LOCAL",
    };

    // 구독 데이터를 가져오는 함수
    const fetchMy = async () => {
        try {
            const response = await getRequest("/api/subscription");
            setSubscriptions(response.data);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        }
    };

    // 발행자 데이터를 가져오는 함수
    const fetchPublishers = async (type = null) => {
        try {
            const url = type ? `/api/publisher/type?pub_type=${type}` : "/api/publisher";
            const response = await getRequest(url);
            setPublishers(response.data);
        } catch (error) {
            console.error("Error fetching publishers:", error);
        }
    };

    // 구독 취소 요청
    const handleSubPubClick = async (publisherId) => {
        try {
            console.log(publisherId);
            await deleteRequest(`/api/subscription/unsubscribe/${publisherId}`);
            setSubscriptions((prev) =>
                prev.filter((sub) => sub.publisher_id !== publisherId)
            ); // 구독 상태 업데이트
            alert("구독이 취소되었습니다.");
        } catch (error) {
            console.error("Error unsubscribing:", error);
            alert("구독 취소에 실패했습니다.");
        }
    };

    // 라벨 클릭 시 호출되는 함수
    const handleLabelClick = (label) => {
        setSelectedLabel(label);
        const type = labelToTypeMapping[label] || null;
        fetchPublishers(type); // 타입에 따라 발행자 정보 요청
    };

    // 초기 데이터 로드
    useEffect(() => {
        fetchPublishers(); // 전체 발행자 정보 가져오기
        fetchMy(); // 구독 정보 가져오기
    }, []);

    return (
        <div className="mobile-container column">
            {/* 구독된 발행자 */}
            <CenteredContainer>
                <GrayBox>
                    {subscriptions.slice(0, 7).map((sub, index) => (
                          <SubPub
                          key={index}
                          publisher={sub.publisher_name}
                          onClick={() => handleSubPubClick(sub.publisher_id)} // 클릭 이벤트 전달
                      />
                    ))}
                </GrayBox>
            </CenteredContainer>

            {/* 카테고리 라벨 */}
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

            {/* 발행자 프로필 */}
            <ProfileContainer>
                {publishers.map((publisher) => (
                    <PubProfile
                        key={publisher.publihser_Id} // 고유 ID로 키 설정
                        publisherImg={publisher.publisher_img}
                        publisherName={publisher.publisher_name}
                        publisherType={publisher.publisher_type}
                        publisherUrl={publisher.publisher_url}
                        publisherId={publisher.publisher_id} // API 요청 시 사용
                        fetchMy={fetchMy} // 구독 상태 업데이트 함수 전달
                    />
                ))}
            </ProfileContainer>
        </div>
    );
}

// 스타일 정의
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
    margin: 0 auto 1rem auto;
    width: 90%;
    overflow-x: auto;
    white-space: nowrap;
    padding: 0.5rem 0;

    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer와 Edge */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
`;

const ProfileContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    width: 90%;
    margin: 0 auto;

    @media (max-width: 600px) {
        gap: 0.3rem;
    }
`;
