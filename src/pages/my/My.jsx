import React, { useState, useEffect } from "react";
import BasicArticle from "../../components/BasicArticle";
import MenuList from "../../components/MenuList";
import styled from "styled-components";
import SubPub from "./SubPub";
import { CgAddR } from "react-icons/cg"; // 아이콘 불러오기
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // axios 임포트

export default function My() {
    const [subscriptions, setSubscriptions] = useState([]); // 구독 정보를 저장할 상태

    const articles = Array(7).fill(0); // 배열 선언
    const subPubs = Array(7).fill(0); // 7개의 SubPub 컴포넌트를 생성
    const navigate = useNavigate();
    const [publishers, setPublishers] = useState([]); // API에서 가져온 데이터를 저장할 상태

    const handleSetPub = () => {
        navigate('/subManage');
    }

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        console.log('API URL:', apiUrl); // 확인


        // useEffect를 사용하여 컴포넌트가 마운트될 때 API 호출
        axios.get(`${apiUrl}/api/subscription`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldW5qdUBnbWFpbC5jb20iLCJyb2xlIjpbIlJPTEVfR0VORVJBTF9NRU1CRVIiXSwiZXhwIjoxNzMxMjI2Njc3LCJpYXQiOjE3MzEyMjMwNzd9.1p71Bgku3jas40NR9TToMgflCmy5bvcPkEFy2ZyJZZU`
            }
        })
        .then(response => {
            setSubscriptions(response.data);  // 받은 데이터로 subscriptions 상태 업데이트
        })
        .catch(error => {
            console.error('Error fetching subscriptions:', error);
        });
    }, []);  // 빈 배열을 의존성으로 사용하여 컴포넌트가 처음 렌더링될 때만 호출

    useEffect(() => {
        // subscriptions 값이 변경될 때마다 로그 출력
        console.log(subscriptions);
    }, [subscriptions]);  // subscriptions 상태가 바뀔 때마다 실행됨

    return (
        <div>
            <MenuList />
            <div className="flex column mobile-container">
                <h4 style={{ textAlign: 'left', width: '95%', marginLeft: "0.5rem", marginTop: "1rem" }}>My</h4>

                <div>
                    <CenteredContainer>
                        <GrayBox>
                            {subPubs.map((_, index) => (
                                <SubPub key={index} publisher={`신문사 ${index + 1}`} />
                            ))}
                            <AddIconBox>
                                <CgAddR size={28} onClick={handleSetPub} /> {/* 8번째 칸에 아이콘만 표시 */}
                            </AddIconBox>
                        </GrayBox>
                    </CenteredContainer>
                </div>

                <h4 style={{ textAlign: 'left', width: '95%', marginTop: "2rem", marginLeft: "0.5rem" }}>추천 기사</h4>

                {articles.map((_, index) => (
                    <div key={index}>
                        <BasicArticle />
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center; /* GrayBox를 부모 컨테이너에서 중앙 정렬 */ 
`;

const GrayBox = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4개의 동일 너비의 열 */
    gap: 1.0rem; /* 그리드 항목들 간의 간격 */ 
    background-color: #ccc;
    padding: 1.0rem;
    border-radius: 1rem;
    box-sizing: border-box; 
    width:95%;
`;

const AddIconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* AddIconBox는 배경이나 테두리 없이 아이콘만 표시 */
    width: 7rem; /* SubPub와 동일한 크기 */
    height: 4rem;
    cursor : pointer;
`;
