import React from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";

export default function Society() {
    const articles = Array(6).fill(0);

    return (
        <div className='flex column mobile-container m0 pd0'>
            <MenuList />
            <HeadlineArticle></HeadlineArticle>

            {/* <Divider />  */}

            {articles.map((_, index) => (
                <div>
                    <BasicArticle key={index} />
                    <hr></hr>
                </div>
            ))}
        </div>
    );
}

const Divider = styled.div`
    width: 100%;                 /* 전체 너비 사용 */
    height: 2px;                 /* 직선의 높이 (두께) */
    background-color: #ccc;      /* 직선의 색상 */
    margin: 10px 0;              /* 직선 위아래 여백 */
`;