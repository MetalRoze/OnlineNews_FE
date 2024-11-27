import React, { useEffect, useState } from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";
import { getRequest } from "../../apis/axios";
import MyPagination from "../../components/Pagination";

export default function Economy() {
    const [articles, setArticles] = useState([]);
    const [head, setHead] = useState(null);
    const [itemsCountPerPage] = useState(8); // 한 페이지에 보이는 아이템개수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                // 헤드라인 데이터 먼저 가져오기
                const headlineResponse = await getRequest("/api/main-article/category/headline?category=SCIENCE_TECH");

                if (headlineResponse && headlineResponse.data && headlineResponse.data.length > 0) {
                    console.log(headlineResponse.data);
                    setHead(headlineResponse.data);
                } else {
                    console.error("No headline data found.");
                }

                // 그 후 기사 데이터 가져오기
                const articleResponse = await getRequest("/api/article/rss/category?categoryName=TECHNOLOGY");
                setArticles(articleResponse.data);  // 가져온 데이터를 articles 상태에 저장
                console.log(articleResponse.data);

            } catch (error) {
                console.error("Failed to fetch articles:", error);
                setArticles([]);  // 오류가 발생한 경우에도 빈 배열로 설정
            }
        };

        fetchData();

    }, []);

    useEffect(() => {
        console.log(articles); // articles 상태가 업데이트 된 후에 출력
    }, [articles]);

    const startIdx = (currentPage - 1) * itemsCountPerPage;
    const endIdx = startIdx + itemsCountPerPage;
    const currentArticles = articles.slice(startIdx, endIdx);

    // articles가 배열일 경우에만 map 호출
    return (
        <div className='flex column mobile-container m0 pd0'>
            <MenuList />
            {head ? <HeadlineArticle head={head} /> : <p>Loading headline...</p>}

            {/* Divider */}
            {/* <Divider /> */}

            {Array.isArray(articles) && articles.length > 0 ? (
                currentArticles.map((article) => (  // map에서 'article'로 이름 변경
                    <div key={article.id}>    {/* article.id로 고유값을 설정 */}
                        <BasicArticle article={article} />  {/* BasicArticle에 'article' prop 전달 */}
                        <hr />
                    </div>
                ))
            ) : (
                <p>아직 불러올 기사들이 없습니다.</p>
            )}

            {articles.length > 0 && (
                <MyPagination
                    itemsCountPerPage={8}
                    totalItemsCount={articles.length}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                />
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
