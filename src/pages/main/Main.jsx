import React, {useState, useEffect} from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";

export default function Main() {
    const articles = Array(6).fill(0);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;  // Vite에서 환경 변수는 import.meta.env로 접근
        console.log('API URL:', apiUrl); // 확인

    }, []);  // 빈 배열을 의존성으로 사용하여 컴포넌트가 처음 렌더링될 때만 호출
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