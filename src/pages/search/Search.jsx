import React, { useState, useEffect } from "react";
import SearchBar from '../../components/SearchBar';
import SearchRecords from "./SearchRecords";
import { postRequest, getRequest, deleteRequest } from "../../apis/axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getRequest('/api/history')
            .then((response) => {
                if (response && Array.isArray(response.data)) {
                    setHistory(response.data);
                } else {
                    setHistory([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching history:", error);
                setHistory([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleRightClick = () => {
        deleteRequest('/api/history/alldelete')
            .then(() => {
                setHistory([]);
            })
            .catch((error) => {
                console.error("Error deleting history:", error);
            });
    };

    const handleSearch = (query) => {
        setLoading(true);
        postRequest('/api/history/search', { searchTerm: query })
            .then(() => {
                return getRequest(`/api/article/select?title=${encodeURIComponent(query)}&content=${encodeURIComponent(query)}`);
            })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    setHistory(response.data);
                    navigate(`/result?query=${query}`);
                } else {
                    setHistory([]);
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
                        <SearchRecords
                            history={history}
                            setHistory={setHistory}
                            onSearch={handleSearch} // 클릭 시 검색 수행
                        />
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
