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
                const response = await getRequest("/api/article/select?category=ECONOMY");
                setArticles(response.data); // 데이터 저장
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            }
        };
    
        fetchArticles();
    }, []);
    
    useEffect(() => {
        // console.log(articles); // articles 상태가 업데이트 된 후에 출력
    }, [articles]);
    
    return (
        <div className='flex column mobile-container m0 pd0'>
            <MenuList />
            <HeadlineArticle></HeadlineArticle>

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
