import React, { useState } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";

export default function MyPagination({itemsCountPerPage, totalItemsCount, pageRangeDisplayed, onPageChange }) {
    const [page, setPage] = useState(1);

    const handlePageChange = (page) => {
        setPage(page);
        onPageChange(page);
    };
    return (
        <div>
            <StyledPagination>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onChange={handlePageChange}
                    prevPageText={"←"}
                    nextPageText={"→"}>
                </Pagination>
            </StyledPagination>
        </div>
    );
}
const StyledPagination = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10rem;
    background-color: transparent;
    border: none;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.colors.gray50};
    }

    &:hover,
    &:active,
    &.active {
      background-color: ${(props) => props.theme.colors.black};
      a {
        color: ${(props) => props.theme.colors.white};
      }
    }

    &:nth-child(2),
    &:nth-last-child(2) {
      background-color: transparent;

      &:hover,
      &:active,
      &.active {
        background-color: transparent;
        a {
          color: ${(props) => props.theme.colors.black};
        }
      }
    }
    &:first-child, 
    &:last-child{
        display: none;
    }
  }
`;
