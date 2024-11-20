import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import styled from 'styled-components';
import { getRequest } from "../../apis/axios";  // getRequest import 추가
import BasicArticle from "../../components/BasicArticle";
import RadioGroup from "../../components/RadioGroup";
import Radio from "../../components/Radio";

export default function SearchResult() {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const [searchText, setSearchText] = useState("");  // 기본값 빈 문자열로 설정

    useEffect(() => {
        const queryParam = new URLSearchParams(location.search).get('query');

        if (queryParam) {
            setSearchText(queryParam);  // queryParam 값으로 searchText 설정
            // console.log("검색어:", queryParam);  // 검색어 확인

            getRequest('/api/article/select', { title: queryParam, content: queryParam })
                .then((response) => {
                    // console.log(response); // 응답 데이터 확인
                    if (response && response.data && Array.isArray(response.data)) {
                        setSearchResults(response.data); // 배열을 state에 저장
                    } else {
                        setSearchResults([]); // 결과가 없거나 예상과 다른 경우 빈 배열 설정
                    }
                })
                .catch((error) => {
                    // console.error("검색 중 에러 발생:", error);
                    setSearchResults([]); // 에러 발생 시 빈 배열 설정
                });
        }
    }, [location]);  // location이 변경될 때마다 실행

    const handleSearch = (query) => {
        setSearchText(query); // 검색어 변경 시 상태 업데이트
        getRequest('/api/article/select', { title: query, content: query })
            .then((response) => {
                console.log(response); // 응답 데이터 확인
                if (response && response.data && Array.isArray(response.data)) {
                    setSearchResults(response.data); // 결과가 배열이라면
                } else {
                    setSearchResults([]); // 배열이 아닌 경우 빈 배열 설정
                }
            })
            .catch((error) => {
                console.error("검색 중 에러 발생:", error);
                setSearchResults([]); // 에러 발생 시 빈 배열 설정
            });
    };

    return (
        <div className="flex column mobile-container">
            <StyledSearchWrapper>
                {/* SearchBar의 value로 searchText 전달 */}
                <SearchBar value={searchText} onSearch={handleSearch} />
            </StyledSearchWrapper>
            <div>

                <div className='flex'>
                    <RadioGroup className='mlAuto'>
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


                {searchResults.length === 0 ? (
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
    justify-content: center;  // 수평 중앙 정렬
    width: 100%;               // 가로 전체 너비 사용
    margin-bottom: 20px;       // 아래 여백 추가
`;

const Divider = styled.div`
    width: 100%;                 /* 전체 너비 사용 */
    height: 2px;                 /* 직선의 높이 (두께) */
    background-color: #E5E5EA;   /* 직선의 색상 */
    margin: 10px 0;              /* 직선 위아래 여백 */
`;