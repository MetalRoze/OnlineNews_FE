import React, { useState, useEffect } from "react";
import BasicArticle from "../../components/BasicArticle";
import MenuList from "../../components/MenuList";
import styled from "styled-components";
import SubPub from "./SubPub";
import { IoIosSettings } from "react-icons/io";
import { CgAddR } from "react-icons/cg"; // 아이콘 불러오기
import { useNavigate } from 'react-router-dom';
import { getRequest, getCalculateRequest } from "../../apis/axios"; // getRequest 임포트 (이미 정의된 함수로 가정)
import KakaoAdFit from "../../components/KakaoAdFit";
import MyPagination from "../../components/Pagination";
import PubProfile from "./PubProfile";

export default function My() {
    const [subscriptions, setSubscriptions] = useState([]); // 구독 정보를 저장할 상태
    const [articles, setArticles] = useState([]);  // 추천 기사 데이터를 저장할 상태
    const [subscribedArticles, setSubscribedArticles] = useState([]); // 구독 기사 데이터를 저장할 상태
    const [isRecommendedArticles, setIsRecommendedArticles] = useState(true); // 추천 기사와 구독 기사 토글 상태
    const [pagination, setPagination] = useState({
        currentPage: 1,  // 추천 기사 페이지
        subscribedPage: 1, // 구독 기사 페이지
    });
    const [itemsCountPerPage] = useState(8); // 한 페이지에 보이는 아이템 개수
    const navigate = useNavigate();
    const [error, setError] = useState(null); // 에러 메시지 상태

    // 페이지 변경 핸들러
    const handlePageChange = (page) => setPagination(prev => ({ ...prev, currentPage: page }));
    const handleSubscribedPageChange = (page) => setPagination(prev => ({ ...prev, subscribedPage: page }));

    // 구독 관리 페이지로 이동
    const handleSetPub = () => {
        navigate('/subManage');
    };

    useEffect(() => {
        // 구독 정보를 가져오는 API 요청
        const fetchSubscriptions = async () => {
            try {
                const response = await getRequest('/api/subscription');
                setSubscriptions(response.data); // 받은 데이터로 subscriptions 상태 업데이트

                console.log("구독 : ", response.data);
                // 구독 기사 가져오기
                const subscribedArticlePromises = response.data.map(subscription =>
                    getRequest(`/api/article/rss/${subscription.publisher_id}`)
                );
                const subscribedArticleResponses = await Promise.all(subscribedArticlePromises);
                const subscribedArticlesData = subscribedArticleResponses.map(response => response.data).flat(); // 평탄화
                setSubscribedArticles(subscribedArticlesData);
            } catch (error) {
                setError("구독 정보를 불러오는 데 실패했습니다.");
                console.error('Error fetching subscriptions:', error);
            }
        };

        // 추천 기사를 가져오는 API 요청
        const fetchArticles = async () => {
            try {
                const calculateResponse = await getCalculateRequest();
                const articleIds = calculateResponse.data?.data || [];
                const articlePromises = articleIds.map(id => getRequest('/api/article/select', { id }));
                const articleResponses = await Promise.all(articlePromises);
                const articlesData = articleResponses.map(response => response.data[0]);
                setArticles(articlesData);
            } catch (error) {
                setError("추천 기사를 불러오는 데 실패했습니다.");
                console.error('Error fetching main articles:', error);
            }
        };

        fetchSubscriptions(); // 구독 정보 및 기사 가져오기
        fetchArticles(); // 추천 기사 가져오기
    }, []);

    // 현재 페이지에 맞는 추천 기사 데이터 추출
    const startIdx = (pagination.currentPage - 1) * itemsCountPerPage;
    const endIdx = startIdx + itemsCountPerPage;
    const currentArticles = articles.slice(startIdx, endIdx);

    // 구독 기사에서 현재 페이지의 기사 추출
    const subscribedStartIdx = (pagination.subscribedPage - 1) * itemsCountPerPage;
    const subscribedEndIdx = subscribedStartIdx + itemsCountPerPage;
    const currentSubscribedArticles = subscribedArticles.slice(subscribedStartIdx, subscribedEndIdx);

    const renderArticles = () => {
        if (isRecommendedArticles) {
            return currentArticles.length > 0 ? (
                currentArticles.map((article, index) => (
                    <div key={article.id || index}>
                        <BasicArticle article={article} />
                        <hr />
                    </div>
                ))
            ) : (
                <CenteredText> 좋아요 한 기사가 없습니다. </CenteredText>
            );
        } else {
            return currentSubscribedArticles.length > 0 ? (
                currentSubscribedArticles.map((article, index) => (
                    <div key={index}>
                        <BasicArticle article={article} />
                        <hr />
                    </div>
                ))
            ) : (
                <CenteredText> 구독한 기사가 없습니다. </CenteredText>
            );
        }
    };

    return (
        <div>
            <MenuList />
            <div className="flex column mobile-container">
                <div className="flex aiCenter" >
                    <h4 style={{ textAlign: 'left', marginLeft: "1rem" }}>My</h4>
                    <AddIconBox>
                        <IoIosSettings size={28} onClick={handleSetPub} style={{ marginRight: "4rem", marginBottom: "0.3rem" }} />
                    </AddIconBox>
                </div>

                <div>
                    <CenteredContainer>
                        <GrayBox>
                            {subscriptions.map((subscription, index) => (
                                // <SubPub
                                //     key={index}
                                //     publisher={subscription.publisher_name}
                                //     onClick={null} // 명시적으로 클릭 이벤트를 전달하지 않음
                                // />
                                <PubProfile
                                    key={subscription.publihser_Id} // 고유 ID로 키 설정
                                    publisherImg={subscription.publisher_img}
                                    publisherName={null}
                                    publisherType={null}
                                    publisherUrl={null}
                                    publisherId={subscription.publisher_id} // API 요청 시 사용
                                />
                            ))}

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

                {error ? (
                    <CenteredText>{error}</CenteredText>
                ) : (
                    renderArticles()
                )}

                {isRecommendedArticles && articles.length > 0 && (
                    <MyPagination
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={articles.length}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                    />
                )}

                {!isRecommendedArticles && subscribedArticles.length > 0 && (
                    <MyPagination
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={subscribedArticles.length}
                        pageRangeDisplayed={5}
                        onPageChange={handleSubscribedPageChange}
                    />
                )}

            </div>
        </div>
    );
}

const CenteredText = styled.h5`
    display: flex;
    flex-direction: column;
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
    justify-content: center;
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
    margin-bottom : 1rem;
    height: 150px; /* 세로 높이 조정 */
    margin-top : 0rem;
`;

const AddIconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7rem; /* SubPub와 동일한 크기 */
    height: 4rem;
    cursor : pointer;
`;
