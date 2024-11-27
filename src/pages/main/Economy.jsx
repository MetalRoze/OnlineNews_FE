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
                // 헤드라인 데이터 가져오기
                const headlineResponse = await getRequest("/api/main-article/category/headline?category=ECONOMY");
                if (headlineResponse?.data?.length > 0) {
                    console.log(headlineResponse.data);
                    setHead(headlineResponse.data);
                } else {
                    console.error("No headline data found.");
                }

                // 기사 데이터 가져오기
                const articleResponse = await getRequest("/api/article/rss/category?categoryName=ECONOMY");
                setArticles(articleResponse.data || []); // 오류 방지
                console.log(articleResponse.data);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
                setArticles([]); // 오류 발생 시 빈 배열로 설정
            }
        };

        fetchData();
    }, []);

    const startIdx = (currentPage - 1) * itemsCountPerPage;
    const endIdx = startIdx + itemsCountPerPage;
    const currentArticles = articles.slice(startIdx, endIdx);

    return (
        <div className='flex column mobile-container m0 pd0'>
            <MenuList />
            {head ? <HeadlineArticle head={head} /> : <p>Loading headline...</p>}

            {/* Divider */}
            {/* <Divider />  */}

            {currentArticles.map((article) => (
                <div key={article.id}>
                    <BasicArticle article={article} />
                    <hr />
                </div>
            ))}
            {currentArticles.length > 0 && (
                <MyPagination
                    itemsCountPerPage={5}
                    totalItemsCount={articles.length}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                />
            )}

        </div>
    );
}

const Divider = styled.div`
    width: 100%;                 /* 전체 너비 사용 */
    height: 2px;                 /* 직선의 높이 (두께) */
    background-color: #ccc;      /* 직선의 색상 */
    margin: 10px 0;              /* 직선 위아래 여백 */
`;
