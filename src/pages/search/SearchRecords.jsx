import React from "react";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";
import { deleteRequest } from "../../apis/axios";

export default function SearchRecords({ history, setHistory, onSearch }) {
    const handleDelete = (id) => {
        deleteRequest(`/api/history/delete/${id}`)
            .then((response) => {
                console.log("삭제 성공:", response);
                setHistory(history.filter(item => item.id !== id));
            })
            .catch((error) => {
                console.error("삭제 실패:", error);
            });
    };

    return (
        <div>
            {history.map((item) =>
                item.searchTerm ? (
                    <StyledHeader className='pointer' key={item.id} onClick={() => onSearch(item.searchTerm)}>
                        <p style={{ marginLeft: "0.5rem" }}>{item.searchTerm}</p>
                        <StyledCloseIcon onClick={(e) => {
                            e.stopPropagation(); // 삭제 아이콘 클릭 시 상위 클릭 이벤트 방지
                            handleDelete(item.id);
                        }} />
                    </StyledHeader>
                ) : null
            )}
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
