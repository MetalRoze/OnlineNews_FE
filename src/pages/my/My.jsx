import React, { useState, useEffect } from "react";
import BasicArticle from "../../components/BasicArticle";
import MenuList from "../../components/MenuList";
import styled from "styled-components";
import SubPub from "./SubPub";
import { CgAddR } from "react-icons/cg"; // 아이콘 불러오기
import { useNavigate } from 'react-router-dom';
import { getRequest, getCalculateRequest } from "../../apis/axios"; // getRequest 임포트 (이미 정의된 함수로 가정)
import KakaoAdFit from "../../components/KakaoAdFit";
import MyPagination from "../../components/Pagination";

export default function My() {
    const [subscriptions, setSubscriptions] = useState([]); // 구독 정보를 저장할 상태
    const [articles, setArticles] = useState([]);  // 추천 기사 데이터를 저장할 상태
    const [subscribedArticles, setSubscribedArticles] = useState([]); // 구독 기사 데이터를 저장할 상태
    const [isRecommendedArticles, setIsRecommendedArticles] = useState(true); // 추천 기사와 구독 기사 토글 상태
    const navigate = useNavigate();

    const [itemsCountPerPage] = useState(8); // 한 페이지에 보이는 아이템 개수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSetPub = () => {
        navigate('/subManage');
    };

    useEffect(() => {
        // 구독 정보를 가져오는 API 요청
        getRequest('/api/subscription')
            .then(response => {
                setSubscriptions(response.data); // 받은 데이터로 subscriptions 상태 업데이트
                console.log(response.data);
                
                // 구독 기사 가져오기
                const fetchSubscribedArticles = async () => {
                    try {
                        const subscribedArticlePromises = response.data.map(subscription =>
                            getRequest(`/api/article/rss/${subscription.publisher_id}`)
                        );

                        // 모든 구독 기사 요청 병렬 처리
                        const subscribedArticleResponses = await Promise.all(subscribedArticlePromises);

                        // 구독 기사 데이터 추출
                        const subscribedArticlesData = subscribedArticleResponses.map(response => response.data);
                        setSubscribedArticles(subscribedArticlesData);
                        console.log('Fetched Subscribed Articles:', subscribedArticlesData);
                    } catch (error) {
                        console.error('Error fetching subscribed articles:', error);
                        setSubscribedArticles([]);
                    }
                };

                fetchSubscribedArticles(); // 구독 기사 가져오기 호출
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
                setArticles([]);
            }
        };

        fetchArticles(); // 컴포넌트 마운트 시 API 호출
    }, []); // 빈 배열을 의존성으로 사용하여 컴포넌트가 처음 렌더링될 때만 호출

    const startIdx = (currentPage - 1) * itemsCountPerPage;
    const endIdx = startIdx + itemsCountPerPage;
    const currentArticles = articles.slice(startIdx, endIdx);

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
                
                {/* 추천 기사와 구독 기사 제목을 클릭할 수 있도록 수정 */}
                <div style={{ textAlign: "left", width: "95%", marginTop: "2rem", marginLeft: "0.5rem" }}>
                    <TitleTab 
                        isActive={isRecommendedArticles}
                        onClick={() => setIsRecommendedArticles(true)}
                    >
                        추천 기사
                    </TitleTab>
                    <TitleTab 
                        isActive={!isRecommendedArticles}
                        onClick={() => setIsRecommendedArticles(false)}
                    >
                        구독 기사
                    </TitleTab>
                </div>

                <h4 style={{ textAlign: 'left', width: '95%', marginTop: "2rem", marginLeft: "0.5rem" }}>
                    {isRecommendedArticles ? "추천 기사" : "구독 기사"}
                </h4>

                {isRecommendedArticles ? (
                    Array.isArray(articles) && articles.length > 0 ? (
                        currentArticles.map((article, index) => (
                            <div key={article.id || index}>
                                <BasicArticle article={article} /> {/* article 데이터를 BasicArticle 컴포넌트에 전달 */}
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p> 좋아요 한 기사가 없습니다. </p>
                    )
                ) : (
                    // 구독 기사 렌더링
                    subscribedArticles.map((articlesList, index) => (
                        <div key={index}>
                            <h5>{subscriptions[index]?.publisher_name}</h5>
                            {Array.isArray(articlesList) && articlesList.length > 0 ? (
                                articlesList.map((article, articleIndex) => (
                                    <div key={articleIndex}>
                                        <BasicArticle article={article} /> {/* 구독 기사 */}
                                    </div>
                                ))
                            ) : (
                                <CenteredText> 구독한 기사가 없습니다. </CenteredText>
                            )}
                            <hr />
                        </div>
                    ))
                )}

                {articles.length > 0 && isRecommendedArticles && (
                    <MyPagination
                        itemsCountPerPage={8}
                        totalItemsCount={articles.length}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}

const CenteredText = styled.h5`
    display: flex;
    flex-direction: column;  // 이미지와 텍스트를 세로로 정렬
    justify-content: center;
    align-items: center;
    height: 200px;
    text-align: center;
    color: #000;
`;


const TitleTab = styled.div`
    display: inline-block;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-right: 1rem;
    background-color: ${(props) => (props.isActive ? "#ccc" : "#fff")};
    border-radius: 5px;
    font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
    transition: background-color 0.3s, font-weight 0.3s;
`;

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
