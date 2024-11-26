import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import styled from 'styled-components';
import { getRequest } from "../../apis/axios";
import BasicArticle from "../../components/BasicArticle";
import RadioGroup from "../../components/RadioGroup";
import Radio from "../../components/Radio";

export default function SearchResult() {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const [searchText, setSearchText] = useState(""); // 기본값 빈 문자열
    const [searchCategory, setSearchCategory] = useState("ALL"); // 기본 검색 카테고리

    useEffect(() => {
        const queryParam = new URLSearchParams(location.search).get('query');

        if (queryParam) {
            setSearchText(queryParam);
            fetchSearchResults(queryParam, searchCategory);
        }
    }, [location, searchCategory]); // location, searchCategory 변경 시 실행

    const fetchSearchResults = (query, category) => {
        const apiUrl = "/api/article/select";
    
        if (category === "ALL") {
            Promise.all([
                getRequest(apiUrl, { title: query }),   // 제목 기준 검색
                getRequest(apiUrl, { content: query }) // 내용 기준 검색
            ])
                .then(([titleResponse, contentResponse]) => {
                    console.log(titleResponse.data);
                    console.log(contentResponse.data);
                    const titleResults = titleResponse.data || [];
                    const contentResults = contentResponse.data || [];
    
                    // 중복 제거 및 통합
                    const combinedResults = [
                        ...new Map(
                            [...titleResults, ...contentResults].map(item => [item.id, item])
                        ).values()
                    ];
    
                    setSearchResults(combinedResults);
                })
                .catch(() => setSearchResults([])); // 에러 발생 시 빈 배열
        } else if (category === "TITLE") {
            getRequest(apiUrl, { title: query })
                .then((response) => {
                    setSearchResults(response.data || []);
                })
                .catch(() => setSearchResults([]));
        } else if (category === "CONTENT") {
            getRequest(apiUrl, { content: query })
                .then((response) => {
                    setSearchResults(response.data || []);
                })
                .catch(() => setSearchResults([]));
        }
    };
    

    const handleSearch = (query) => {
        setSearchText(query);
        fetchSearchResults(query, searchCategory);
    };

    const handleCategoryChange = (event) => {
        setSearchCategory(event.target.value); // 선택된 카테고리 업데이트
        console.log(searchCategory);
    };

    return (
        <div className="flex column mobile-container">
            <StyledSearchWrapper>
                <SearchBar value={searchText} onSearch={handleSearch} />
            </StyledSearchWrapper>
            <div>
                <div className="flex" style={{ justifyContent: "flex-end" }}>
                    <RadioGroup className="mlAuto" onChange={handleCategoryChange}>
                        <Radio name="searchCategory" value="ALL" defaultChecked>
                            전체
                        </Radio>
                        <Radio name="searchCategory" value="TITLE">
                            제목
                        </Radio>
                        <Radio name="searchCategory" value="CONTENT">
                            내용
                        </Radio>
                    </RadioGroup>
                </div>

                <Divider />

                {!searchResults || searchResults.length === 0 ? (
                    <p>검색 결과가 없습니다.</p>
                ) : (
                    <div>
                        {searchResults.map((result, index) => (
                            <BasicArticle key={index} article={result} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const StyledSearchWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
`;

const Divider = styled.div`
    width: 100%;
    height: 2px;
    background-color: #E5E5EA;
    margin: 10px 0;
`;
