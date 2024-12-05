import React, { useEffect, useState } from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";
import { getRequest } from "../../apis/axios";
import MyPagination from "../../components/Pagination";
import spinner from "../../assets/spinner.gif"; // import spinner.gif
import KakaoAdFit from "../../components/KakaoAdFit";

export default function Society() {
    const [articles, setArticles] = useState([]);
    const [head, setHead] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [itemsCountPerPage] = useState(8); // 한 페이지에 보이는 아이템개수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                // 헤드라인 데이터 먼저 가져오기
                const headlineResponse = await getRequest("/api/main-article/category/headline?category=SOCIAL");

                if (headlineResponse && headlineResponse.data && headlineResponse.data.length > 0) {
                    console.log(headlineResponse.data);
                    setHead(headlineResponse.data[0]);
                } else {
                    console.error("No headline data found.");
                }

                const [articleRssResponse, articleSelectResponse] = await Promise.all([
                    getRequest("/api/article/rss/category?categoryName=SOCIETY"),
                    getRequest("/api/article/select?category=SOCIAL")
                ]);

                // 두 API 결과 합치기
                const allArticles = [
                    ...articleRssResponse.data,  // 첫 번째 API 데이터
                    ...articleSelectResponse.data  // 두 번째 API 데이터
                ];

                // 데이터를 랜덤하게 섞기
                const shuffledArticles = allArticles.sort(() => Math.random() - 0.5);

                setArticles(shuffledArticles);  // 섞인 데이터를 articles 상태에 저장

            } catch (error) {
                console.error("Failed to fetch articles:", error);
                setArticles([]);  // 오류가 발생한 경우에도 빈 배열로 설정
            } finally {
                setIsLoading(false); // 데이터를 다 불러왔을 때 로딩 상태 해제
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
            {head ? <HeadlineArticle head={head} /> : <CenteredText>Loading headline...</CenteredText>}

            {/* Divider */}
            {/* <Divider /> */}

            {isLoading ? (  // 로딩 중일 때 스피너 표시
                <CenteredText>
                    <img src={spinner} alt="로딩중..." /> {/* src를 import한 spinner로 수정 */}
                    <p>로딩 중입니다...</p>
                </CenteredText>
            ) : (
                Array.isArray(articles) && articles.length > 0 ? (
                    currentArticles.map((article, index) => (
                        <div key={article.id}>
                            <BasicArticle article={article} />
                            <hr />
                            {(index + 1) % 5 === 0 && <KakaoAdFit />}

                        </div>
                    ))
                ) : (
                    <CenteredText>아직 불러올 기사들이 없습니다.</CenteredText>
                )
            )}

            {articles.length > 0 && (
                <MyPagination
                    activePage={currentPage}  // currentPage를 전달
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

const CenteredText = styled.h5`
    display: flex;
    flex-direction: column;  // 이미지와 텍스트를 세로로 정렬
    justify-content: center;
    align-items: center;
    height: 200px;
    text-align: center;
    color: #000;

    img {
        width: 50px;  // 스피너 크기 조정
        height: 50px;
        margin-bottom: 10px; // 스피너와 텍스트 사이에 간격 추가
    }

    p {
        font-size: 16px;
        margin: 0;
        color: #333;
    }
`;
