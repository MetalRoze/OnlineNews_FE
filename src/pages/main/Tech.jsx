import React, { useEffect, useState } from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";
import { getRequest } from "../../apis/axios";

export default function Economy() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await getRequest("/api/article/select?category=SCIENCE_TECH");
                
                // 응답이 올바른 배열인지 확인
                if (Array.isArray(response.data)) {
                    setArticles(response.data); // 데이터 저장
                } else {
                    console.error("응답 데이터가 배열이 아닙니다:", response.data);
                }
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            }
        };
    
        fetchArticles();
    }, []);
    
    useEffect(() => {
        console.log(articles); // articles 상태가 업데이트 된 후에 출력
    }, [articles]);

    // articles가 배열일 경우에만 map 호출
    return (
        <div className='flex column mobile-container m0 pd0'>
            <MenuList />
            {head ? <HeadlineArticle head={head} /> : <p>Loading headline...</p>}

            {/* Divider */}
            {/* <Divider /> */}

            {Array.isArray(articles) && articles.length > 0 ? (
                articles.map((article) => (  // map에서 'article'로 이름 변경
                    <div key={article.id}>    {/* article.id로 고유값을 설정 */}
                        <BasicArticle article={article} />  {/* BasicArticle에 'article' prop 전달 */}
                        <hr />
                    </div>
                ))
            ) : (
                <p>아직 불러올 기사들이 없습니다.</p>
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
