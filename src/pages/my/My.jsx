import React from "react";
import BasicArticle from "../../components/BasicArticle";
import MenuList from "../../components/MenuList";
import styled from "styled-components";

export default function My(){
    const articles = Array(4).fill(0);

    return(
        <div className='flex column mobile-header m0 pd0'>
            <MenuList></MenuList>
            <h4  style={{ textAlign: 'left', width: '95%', marginLeft:"0.5rem", marginTop : "1rem"}}>구독</h4>

            <GrayBox></GrayBox>

            <h4  style={{ textAlign: 'left', width: '95%' , marginTop : "2rem", marginLeft:"0.5rem"}}>추천 기사</h4>
            {articles.map((_, index) => (
                <BasicArticle key={index} />
            ))}
        </div>
    );
}

const GrayBox = styled.div`
    width: 36rem;       /* 박스의 너비 */
    height: 12rem;      /* 박스의 높이 */
    background-color: #ccc; /* 회색 배경색 (#ccc는 밝은 회색) */
    display: flex;      /* Flexbox를 사용하여 내부 요소 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center;     /* 수직 중앙 정렬 */
    border-radius : 1rem;
`;