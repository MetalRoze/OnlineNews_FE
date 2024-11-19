import React, { useEffect, useState } from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";
import axios from "axios";

export default function Economy() {
    const [articles, setArticles] = useState([]);
    // const articles = Array(6).fill(0);
    useEffect(() => {
        // ECONOMY 카테고리에 해당하는 기사 데이터를 가져옵니다.
        const fetchArticles = async () => {
            try {
                const response = await axios.get("/api/article/select?category=ECONOMY");
                setArticles(response.data); // 가져온 데이터를 articles 상태에 저장
                console.log(articles);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className='flex column mobile-container m0 pd0'>
            <MenuList />
            <HeadlineArticle></HeadlineArticle>

            {/* <Divider />  */}

            {articles.map((article) => (
                <div key={article.id}>
                    <BasicArticle article={article} />
                    <hr />
                </div>
            ))}

            {/* {articles.map((_, index) => (
                <div>
                    <BasicArticle key={index} />
                    <hr></hr>
                </div>
            ))} */}
        </div>
    );
}

const Divider = styled.div`
    width: 100%;                 /* 전체 너비 사용 */
    height: 2px;                 /* 직선의 높이 (두께) */
    background-color: #ccc;      /* 직선의 색상 */
    margin: 10px 0;              /* 직선 위아래 여백 */
`;