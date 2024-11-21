import React, { useState, useEffect } from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";
import axios from "axios";
import { getRequest } from '../../apis/axios';

export default function Main() {
    const [head, setHead] = useState(null);
    const [articles, setArticles] = useState([]);
    // const articles = Array(6).fill(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const headlineResponse = await getRequest("/api/main-article/headline");
                setHead(headlineResponse.data); // 가져온 데이터를 head 상태에 저장
                console.log("Headline:", headlineResponse.data);

                const articleResponse = await getRequest("/api/main-article");
                setArticles(articleResponse.data); // 가져온 데이터를 articles 상태에 저장
                console.log(articleResponse.data);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex column mobile-container m0 pd0'>
            <MenuList />
            {head ? <HeadlineArticle head={head} /> : <p>Loading headline...</p>}

            {/* <Divider />  */}

            {articles.map((article) => (
                <div key={article.id}>
                    <BasicArticle article={article} />
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