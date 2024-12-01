import React, { useState, useEffect } from "react";
import BasicArticle from "../../components/BasicArticle";
import MenuList from "../../components/MenuList";
import styled from "styled-components";
import SubPub from "./SubPub";
import { CgAddR } from "react-icons/cg"; // 아이콘 불러오기
import { useNavigate } from 'react-router-dom';
import { getRequest, getCalculateRequest } from "../../apis/axios"; // getRequest 임포트 (이미 정의된 함수로 가정)
import KakaoAdFit from "../../components/KakaoAdFit";

export default function My() {
    const [subscriptions, setSubscriptions] = useState([]); // 구독 정보를 저장할 상태
    const [articles, setArticles] = useState([]);  // 추천 기사 데이터를 저장할 상태
    const navigate = useNavigate();

    const handleSetPub = () => {
        navigate('/subManage');
    };

    useEffect(() => {
        // 구독 정보를 가져오는 API 요청
        getRequest('/api/subscription')
            .then(response => {
                setSubscriptions(response.data); // 받은 데이터로 subscriptions 상태 업데이트
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching subscriptions:', error);
            });

        // 추천 기사를 가져오는 API 요청
        const fetchArticles = async () => {
            try {
                const calculateResponse = await getCalculateRequest();
                const articleIds = calculateResponse.data?.data || []; // ID 배열 추출

                // 각 ID에 대해 /api/article/select 호출
                const articlePromises = articleIds.map(id =>
                    getRequest('/api/article/select', { id })
                );

                // 모든 요청 결과를 병렬로 처리
                const articleResponses = await Promise.all(articlePromises);

                // 응답에서 data 추출
                const articlesData = articleResponses.map(response => response.data[0]); // Array에서 첫 번째 객체를 추출
                setArticles(articlesData);
                console.log('Fetched Articles:', articlesData);
            } catch (error) {
                console.error('Error fetching main articles:', error);
            }
        };

        fetchArticles(); // 컴포넌트 마운트 시 API 호출
    }, []); // 빈 배열을 의존성으로 사용하여 컴포넌트가 처음 렌더링될 때만 호출

    return (
        <div>
            <MenuList />
            <div className="flex column mobile-container">
                <h4 style={{ textAlign: 'left', width: '95%', marginLeft: "0.5rem", marginTop: "1rem" }}>My</h4>

                <div>
                    <CenteredContainer>
                        <GrayBox>
                            {subscriptions.map((subscription, index) => (
                                <SubPub
                                    key={index}
                                    publisher={subscription.publisher_name}
                                    onClick={null} // 명시적으로 클릭 이벤트를 전달하지 않음
                                />
                            ))}
                            <AddIconBox>
                                <CgAddR size={28} onClick={handleSetPub} />
                            </AddIconBox>
                        </GrayBox>

                    </CenteredContainer>
                </div>

                <KakaoAdFit />
                <h4 style={{ textAlign: 'left', width: '95%', marginTop: "2rem", marginLeft: "0.5rem" }}>추천 기사</h4>

                {articles.map((article, index) => (
                    <div key={article.id || index}>
                        <BasicArticle article={article} /> {/* article 데이터를 BasicArticle 컴포넌트에 전달 */}
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
