import React, { useState, useEffect } from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";
import { getRequest } from '../../apis/axios';
import KakaoAdFit from "../../components/KakaoAdFit";

export default function Main() {
    const [head, setHead] = useState(null);
    const [articles, setArticles] = useState([]);  // 기본값을 빈 배열로 설정

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 헤드라인 데이터 먼저 가져오기
                const headlineResponse = await getRequest("/api/main-article/headline");

                if (headlineResponse && headlineResponse.data && headlineResponse.data.length > 0) {
                    console.log("headline:", headlineResponse.data[0]);
                    setHead(headlineResponse.data[0]);
                } else {
                    console.error("No headline data found.");
                }

                // 그 후 기사 데이터 두 개의 카테고리에서 가져오기
                const opinionResponse = await getRequest("/api/main-article/category?category=OPINION");
                const lifeCultureResponse = await getRequest("/api/main-article/category?category=LIFE_CULTURE");
                const socialResponse = await getRequest("/api/main-article/category?category=SOCIAL");
                const enterResponse = await getRequest ("api/main-article/category?category=ENTERTAINMENT");
                const techResponse = await getRequest ("api/main-article/category?category=SCIENCE_TECH");
                const politicsResponse = await getRequest ("api/main-article/category?category=POLITICS");
                const economyResponse = await getRequest ("api/main-article/category?category=ECONOMY");



                // 두 개의 응답 데이터를 하나로 합치기
                const combinedArticles = [
                    ...opinionResponse.data,
                    ...lifeCultureResponse.data,
                    ...socialResponse.data,
                    ...enterResponse.data,
                    ...techResponse.data,
                    ...politicsResponse.data,
                    ...economyResponse.data
                ];

                // 합쳐진 기사 데이터를 상태에 저장
                setArticles(combinedArticles);
                console.log("Fetched Articles:", combinedArticles);

            } catch (error) {
                console.error("Failed to fetch articles:", error);
                setArticles([]);  // 오류가 발생한 경우에도 빈 배열로 설정
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex column mobile-container m0 pd0'>
            <MenuList />

            {head ? <HeadlineArticle head={head} /> : <p>Loading headline...</p>}

            <KakaoAdFit />
            {
                Array.isArray(articles) && articles.length > 0 ? (
                    articles.map((article, index) => (
                        <div key={article.id}>
                            <BasicArticle article={article} />
                            <hr />
                            {(index + 1) % 5 === 0 && <KakaoAdFit />}
                        </div>
                    ))
                ) : (
                    <p>No articles available or loading...</p>
                )
            }
        </div >
    );
}

const Divider = styled.div`
    width: 100%;                 
    height: 2px;                 
    background-color: #ccc;      
    margin: 10px 0;              
`;
