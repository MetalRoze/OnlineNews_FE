import React, { useState, useEffect } from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";
import RankingArticle from "./RankingArticle";
import { getRequest } from "../../apis/axios";
import KakaoAdFit from "../../components/KakaoAdFit";
import MyPagination from "../../components/Pagination";

export default function Ranking() {
    const [selectedTab, setSelectedTab] = useState("많이 본 뉴스"); // 기본값 설정
    const [articles, setArticles] = useState([]);
    const [itemsCountPerPage] = useState(8); // 한 페이지에 보이는 아이템개수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };



    // const articles = Array(6).fill(0);

    const fetchArticles = (sortBy) => {
        const url = `/api/article/select?sortBy=${sortBy}`;
        getRequest(url)
            .then((response) => {
                if (response && Array.isArray(response.data)) {
                    setArticles(response.data); // 받아온 데이터를 articles 상태에 저장
                } else {
                    setArticles([]); // 데이터가 없으면 빈 배열
                }
            })
            .catch((error) => {
                console.error(`Error fetching articles sorted by ${sortBy}:`, error);
                setArticles([]); // 에러 발생 시 빈 배열
            });
    };

    useEffect(() => {
        // 탭 선택에 따라 API 요청 실행
        const sortBy = selectedTab === "많이 본 뉴스" ? "views" : "likes";
        fetchArticles(sortBy);
    }, [selectedTab]); // selectedTab이 변경될 때마다 실행

    const startIdx = (currentPage - 1) * itemsCountPerPage;
    const endIdx = startIdx + itemsCountPerPage;
    const currentArticles = articles.slice(startIdx, endIdx);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className='flex column mobile-container m0 pd0'>
            <MenuList /><KakaoAdFit />
            <div className="mAuto flex jfCcenter mt1" style={{ width: "100%" }}>
                <Tab
                    isSelected={selectedTab === "많이 본 뉴스"}
                    onClick={() => handleTabClick("많이 본 뉴스")}
                >
                    많이 본 뉴스
                </Tab>
                <TabDivider>/</TabDivider>
                <Tab
                    isSelected={selectedTab === "좋아요 많은 뉴스"}
                    onClick={() => handleTabClick("좋아요 많은 뉴스")}
                >
                    좋아요 많은 뉴스
                </Tab>
            </div>


            {/* <Divider /> */}

            {/* 기사 리스트 */}
            {articles.length === 0 ? (
                <p>기사를 불러오는 중입니다...</p>
            ) : (
                currentArticles.map((article, index) => (
                    <div key={article.id}>
                        <RankingArticle
                            rank={index + 1}
                            article={article} // 전달된 기사 데이터를 RankingArticle로 전달
                        />
                        <hr />
                        {(index + 1) % 5 === 0 && <KakaoAdFit />}

                    </div>
                ))
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

const Tab = styled.h3`
    color: ${({ isSelected }) => (isSelected ? "black" : "#ccc")};
    cursor: pointer;
    &:hover {
        color: black;
    }
`;

const TabDivider = styled.h3`
    margin: 0 8px;
    color: #ccc;
`;

const Divider = styled.div`
    width: 100%;                 /* 전체 너비 사용 */
    height: 2px;                 /* 직선의 높이 (두께) */
    background-color: #ccc;      /* 직선의 색상 */
    margin: 10px 0;              /* 직선 위아래 여백 */
`;