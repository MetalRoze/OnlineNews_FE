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
    }, []); // 컴포넌트 마운트 시 한번만 실행

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
        <div className="mobile-container">  {/* 기존 구조 유지 */}
            <StyledSearchWrapper>  {/* SearchBar를 중앙에 배치할 부모 컨테이너 */}
                <SearchBar onSearch={handleSearch} />
            </StyledSearchWrapper>
            <Divider />
            <div className="m0 pd0 column">
                <StyledFlexContainer>
                    <LeftAlignedText>최근검색어</LeftAlignedText>
                    <RightAlignedText onClick={handleRightClick}>기록 삭제</RightAlignedText>
                </StyledFlexContainer>

                <div className="m0 pd0 " >
                    {loading ? (  // 로딩 중일 때 표시
                        <h5>로딩 중...</h5>
                    ) : history.length === 0 ? (  // 데이터가 없을 때 표시
                        <CenteredText>저장된 검색어가 없습니다.</CenteredText>
                    ) : (
                        <SearchRecords history={history} />
                    )}
                </div>
            </div>
        </div>
    );
}

// SearchBar만 중앙 정렬을 위한 스타일
const StyledSearchWrapper = styled.div`
    display: flex;
    justify-content: center;  // 수평 중앙 정렬
    width: 100%;               // 가로 전체 너비 사용
    margin-bottom: 20px;       // 아래 여백 추가
`;

const StyledFlexContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between; /* 두 요소를 양 끝으로 배치 */
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
    cursor: pointer; /* 클릭 가능한 커서 표시 */
`;

const CenteredText = styled.h5`
    display: flex;
    justify-content: center;  // 수평 중앙 정렬
    align-items: center;      // 수직 중앙 정렬
    height: 200px;            // 텍스트가 중앙에 위치하도록 높이를 설정
    text-align: center;       // 텍스트 자체를 중앙 정렬
    color: #000;              // 텍스트 색상 (선택 사항)
`;


const Divider = styled.div`
    width: 100%;                 /* 전체 너비 사용 */
    height: 2px;                 /* 직선의 높이 (두께) */
    background-color:  #F2F2F7;      /* 직선의 색상 */
    margin: 10px 0;              /* 직선 위아래 여백 */
`;
