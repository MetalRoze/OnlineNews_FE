import React, { useState, useEffect } from "react";
import BasicArticle from "../../components/BasicArticle";
import MenuList from "../../components/MenuList";
import styled from "styled-components";
import SubPub from "./SubPub";
import { CgAddR } from "react-icons/cg"; // 아이콘 불러오기
import { useNavigate } from 'react-router-dom';
import { getRequest } from "../../apis/axios"; // getRequest 임포트 (이미 정의된 함수로 가정)

export default function My() {
    const [subscriptions, setSubscriptions] = useState([]); // 구독 정보를 저장할 상태
    const [articles, setArticles] = useState([]);  // 추천 기사 데이터를 저장할 상태

    const subPubs = Array(7).fill(0); // 7개의 SubPub 컴포넌트를 생성
    const navigate = useNavigate();
    const [publishers, setPublishers] = useState([]); // API에서 가져온 데이터를 저장할 상태

    const handleSetPub = () => {
        navigate('/subManage');
    }

    useEffect(() => {
        // 구독 정보를 가져오는 API 요청
        getRequest('/api/subscription')
        .then(response => {
            setSubscriptions(response.data);  // 받은 데이터로 subscriptions 상태 업데이트
        })
        .catch(error => {
            console.error('Error fetching subscriptions:', error);
        });

        // 추천 기사를 가져오는 API 요청 (async/await 방식으로 처리)
        const fetchArticles = async () => {
            try {
                const articleResponse = await getRequest("/api/main-article");
                setArticles(articleResponse.data);  // 가져온 데이터를 articles 상태에 저장
                console.log(articleResponse.data);  // 가져온 데이터 확인
            } catch (error) {
                console.error('Error fetching main articles:', error);
            }
        };

        fetchArticles();  // 컴포넌트 마운트 시 API 호출

    }, []);  // 빈 배열을 의존성으로 사용하여 컴포넌트가 처음 렌더링될 때만 호출

    return (
        <div>
            <MenuList />
            <div className="flex column mobile-container">
                <h4 style={{ textAlign: 'left', width: '95%', marginLeft: "0.5rem", marginTop: "1rem" }}>My</h4>

                <div>
                    <CenteredContainer>
                        <GrayBox>
                            {subPubs.map((sub, index) => (
                                <SubPub key={index} publisher={sub.publisher_name} />
                            ))}
                            <AddIconBox>
                                <CgAddR size={28} onClick={handleSetPub} /> {/* 8번째 칸에 아이콘만 표시 */}
                            </AddIconBox>
                        </GrayBox>
                    </CenteredContainer>
                </div>

                <h4 style={{ textAlign: 'left', width: '95%', marginTop: "2rem", marginLeft: "0.5rem" }}>추천 기사</h4>

                {articles.map((article, index) => (
                    <div key={index}>
                        <BasicArticle article={article} />  {/* article 데이터를 BasicArticle 컴포넌트에 전달 */}
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
    width: 7rem; /* SubPub와 동일한 크기 */
    height: 4rem;
    cursor : pointer;
`;
