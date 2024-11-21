import React, { useState, useEffect } from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";
import { getRequest } from '../../apis/axios';

export default function Main() {
    const [head, setHead] = useState(null);
    const [articles, setArticles] = useState([]);  // 기본값을 빈 배열로 설정

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 헤드라인 데이터 먼저 가져오기
                const headlineResponse = await getRequest("/api/main-article/headline");

                if (headlineResponse && headlineResponse.data && headlineResponse.data.length > 0) {
                    setHead(headlineResponse.data[0]);
                } else {
                    console.error("No headline data found.");
                }

                // 그 후 기사 데이터 가져오기
                const articleResponse = await getRequest("/api/main-article");
                setArticles(articleResponse.data);  // 가져온 데이터를 articles 상태에 저장
                console.log(articleResponse.data);

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

            {/* 조건부 렌더링: articles가 배열인지 확인하고, 배열일 때만 map() 사용 */}
            {Array.isArray(articles) && articles.length > 0 ? (
                articles.map((article) => (
                    <div key={article.id}>
                        <BasicArticle article={article} />
                        <hr />
                    </div>
                ))
            ) : (
                <p>No articles available or loading...</p>
            )}
        </div>
    );
}

const Divider = styled.div`
    width: 100%;                 
    height: 2px;                 
    background-color: #ccc;      
    margin: 10px 0;              
`;
