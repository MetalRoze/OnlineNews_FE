import React from "react";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";

export default function SearchRecords({ history }) {
    if (!history || !Array.isArray(history)) {
        // history가 undefined이거나 배열이 아닐 경우 아무것도 렌더링하지 않음
        return null;
    }

    return (
        <div>
            {/* history 배열을 순회하여 각 항목을 렌더링 */}
            {history.map((item, index) => (
                item.searchTerm ? (  // searchTerm이 존재하는 경우만 렌더링
                    <StyledHeader key={index} className="mobile-header">
                        <p style={{ marginLeft: "0.5rem" }}>{item.searchTerm}</p>
                        <StyledCloseIcon onClick={() => handleDelete(index)} />
                    </StyledHeader>
                ) : <h5>저장된 검색어가 없습니다.</h5>  // searchTerm이 없으면 아무것도 렌더링하지 않음
            ))}
        </div>
    );
}

// 삭제 핸들러 예시 (필요에 맞게 구현)
const handleDelete = (index) => {
    console.log('삭제된 검색어:', index);  // 예시로 콘솔에 삭제된 인덱스를 출력
    
};

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;  /* 각 항목 간 간격 추가 */
`;

const StyledCloseIcon = styled(CgClose)`
    margin-right: 0.5rem;
    cursor: pointer;
`;
