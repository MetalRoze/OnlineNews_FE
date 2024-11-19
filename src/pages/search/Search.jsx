import React from "react";
import SearchBar from '../../components/SearchBar';
import styled from "styled-components";
import SearchRecords from "./SearchRecords";
import { getRequest, deleteRequest } from "../../apis/axios";

export default function Search() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // /api/history 요청
        getRequest('/api/history')
            .then((response) => {
                if (response && Array.isArray(response.data)) {
                    setHistory(response.data); // 응답 데이터를 history 상태에 저장
                } else {
                    setHistory([]); // 데이터가 없으면 빈 배열
                }
            })
            .catch((error) => {
                console.error("Error fetching history:", error);
                setHistory([]); // 에러 발생 시 빈 배열로 설정
            })
            .finally(() => {
                setLoading(false); // 데이터 로딩 완료
            });
    }, []); // 빈 배열은 처음 한 번만 실행되도록 함


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

    return (
        <div className='mobile-header column'>
            <SearchBar />
            <Divider></Divider>
            <div className='mobile-header column m0 pd0'>
                <StyledFlexContainer>
                    <LeftAlignedText >최근검색어</LeftAlignedText>
                    <RightAlignedText onClick={handleRightClick}>기록 삭제</RightAlignedText>
                </StyledFlexContainer>

                <div>
                    {history.length === 0 ? (
                        <h5>저장된 검색어가 없습니다.</h5>
                    ) : (
                        <SearchRecords records={history} />
                    )}
                </div>
            </div>


        </div>
    );
}

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

const Divider = styled.div`
    width: 100%;                 /* 전체 너비 사용 */
    height: 2px;                 /* 직선의 높이 (두께) */
    background-color:  #F2F2F7;      /* 직선의 색상 */
    margin: 10px 0;              /* 직선 위아래 여백 */
`;
