import React from "react";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";
import { deleteRequest } from "../../apis/axios";

export default function SearchRecords({ history, setHistory }) {
    const handleDelete = (id) => {
        // 해당 아이디를 가진 기록을 삭제하는 API 호출
        deleteRequest(`/api/history/delete/${id}`)
            .then((response) => {
                console.log("삭제 성공:", response);
                // 삭제가 성공적으로 이루어지면 history 배열에서 해당 항목 제거
                setHistory(history.filter(item => item.id !== id));
            })
            .catch((error) => {
                console.error("삭제 실패:", error);
            });
    };

    return (
        <div>
            {/* history 배열을 순회하여 각 항목을 렌더링 */}
            {history.map((item) => (
                item.searchTerm ? (  // searchTerm이 존재하는 경우만 렌더링
                    <StyledHeader key={item.id}>
                        <p style={{ marginLeft: "0.5rem" }}>{item.searchTerm}</p>
                        <StyledCloseIcon onClick={() => handleDelete(item.id)} />
                    </StyledHeader>
                ) : null  // searchTerm이 없으면 아무것도 렌더링하지 않음
            ))}
        </div>
    );
}

// Styled components

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding-left: 0.6rem;
`;

const StyledCloseIcon = styled(CgClose)`
    margin-right: 0.5rem;
    cursor: pointer;
`;
