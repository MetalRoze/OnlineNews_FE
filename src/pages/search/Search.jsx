import React, { useState, useEffect } from "react";
import SearchBar from '../../components/SearchBar';
import SearchRecords from "./SearchRecords";
import { postRequest, getRequest, deleteRequest } from "../../apis/axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [history, setHistory] = useState([]);  // 초기값을 빈 배열로 설정
    const [loading, setLoading] = useState(true);  // 로딩 상태
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        setLoading(true);  // 데이터 요청 전 로딩 상태 활성화
        getRequest('/api/history')
            .then((response) => {
                console.log(response);
                if (response && Array.isArray(response.data)) {
                    setHistory(response.data); // 응답 데이터를 history 상태에 저장
                    console.log("Fetched history:", response.data);  // history 상태 확인
                } else {
                    setHistory([]); // 데이터가 없으면 빈 배열
                }
            })
            .catch((error) => {
                console.error("Error fetching history:", error);
                setHistory([]); // 에러 발생 시 빈 배열로 설정
            })
            .finally(() => {
                setLoading(false); // 데이터 로딩 완료 후 로딩 상태 비활성화
            });
    }, []); // 컴포넌트 마운트 시 한 번만 실행

    const handleRightClick = () => {
        deleteRequest('/api/history/alldelete')
            .then(() => {
                console.log("기록 삭제 완료");
                setHistory([]); // 삭제 완료 후 검색 기록 초기화
            })
            .catch((error) => {
                console.error("Error deleting history:", error);
            });
    };

    const handleSearch = (query) => {
        setLoading(true);
    
        postRequest('/api/history/search', { searchTerm: query })  // 검색어 기록
            .then(() => {
                console.log("Search term recorded successfully!");
    
                return getRequest(`/api/article/select?title=${encodeURIComponent(query)}&content=${encodeURIComponent(query)}`);
            })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    setHistory(response.data);  // 응답 데이터를 history 상태에 저장
                    console.log("Navigating to result page...");
                    navigate(`/result?query=${query}`);  // 검색 결과 페이지로 리디렉션
                } else {
                    setHistory([]); // 검색 결과가 없으면 빈 배열로 설정
                }
            })
            .catch((error) => {
                console.error("Error searching history or fetching results:", error);
                setHistory([]);  
            })
            .finally(() => {
                setLoading(false); 
            });
    };

    return (
        <div className="mobile-container">
            <StyledSearchWrapper>
                <SearchBar onSearch={handleSearch} />
            </StyledSearchWrapper>
            <Divider />
            <div className="m0 pd0 column">
                <StyledFlexContainer>
                    <LeftAlignedText>최근검색어</LeftAlignedText>
                    <RightAlignedText onClick={handleRightClick}>기록 삭제</RightAlignedText>
                </StyledFlexContainer>

                <div className="m0 pd0">
                    {loading ? (
                        <h5>로딩 중...</h5>
                    ) : history.length === 0 ? (
                        <CenteredText>저장된 검색어가 없습니다.</CenteredText>
                    ) : (
                        <SearchRecords history={history} setHistory={setHistory} /> 
                    )}
                </div>
            </div>
        </div>
    );
}

// Styled components

const StyledSearchWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
`;

const StyledFlexContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 10px;
`;

const LeftAlignedText = styled.h6`
    margin: 0;
    text-align: left;
    margin-left : 0.5rem;
`;

const RightAlignedText = styled.h6`
    margin: 0;
    color: GrayText;
    text-align: right;
    margin-right : 0.5rem;
    cursor: pointer;
`;

const CenteredText = styled.h5`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    text-align: center;
    color: #000;
`;

const Divider = styled.div`
    width: 100%;
    height: 2px;
    background-color:  #F2F2F7;
    margin: 10px 0;
`;
