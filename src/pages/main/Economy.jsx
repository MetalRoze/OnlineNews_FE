import React, { useEffect, useState } from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";
import { getRequest } from "../../apis/axios";

export default function Economy() {
    const [articles, setArticles] = useState([]);
    const [head, setHead] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 헤드라인 데이터 먼저 가져오기
                const headlineResponse = await getRequest("/api/main-article/category/headline?category=ECONOMY");

                if (headlineResponse && headlineResponse.data && headlineResponse.data.length > 0) {
                    console.log(headlineResponse.data);
                    setHead(headlineResponse.data);
                } else {
                    console.error("No headline data found.");
                }

                // 그 후 기사 데이터 가져오기
                const articleResponse = await getRequest("/api/article/rss/category?categoryName=ECONOMY");
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

            {/* Divider */}
            {/* <Divider />  */}

            {articles.map((article) => (  // map에서 'article'로 이름 변경
                <div key={article.id}>    {/* article.id로 고유값을 설정 */}
                    <BasicArticle article={article} />  {/* BasicArticle에 'article' prop 전달 */}
                    <hr />
                </div>
            ))}
        </div>
    );
}

const Divider = styled.div`
    width: 100%;                 /* 전체 너비 사용 */
    height: 2px;                 /* 직선의 높이 (두께) */
    background-color: #ccc;      /* 직선의 색상 */
    margin: 10px 0;              /* 직선 위아래 여백 */
`;
