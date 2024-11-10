import React, { useState } from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";
import RankingArticle from "./RankingArticle";

export default function Ranking() {
    const [selectedTab, setSelectedTab] = useState("많이 본 뉴스"); // 기본값 설정
    const articles = Array(6).fill(0);
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className='flex column mobile-container m0 pd0'>
            <MenuList />
            <div className="mAuto flex jfCcenter mt1" style={{width:"100%"}}>
            <Tab
                    isSelected={selectedTab === "많이 본 뉴스"}
                    onClick={() => handleTabClick("많이 본 뉴스")}
                >
                    많이 본 뉴스
                </Tab>
                <TabDivider>/</TabDivider>
                <Tab
                    isSelected={selectedTab === "댓글 많은 뉴스"}
                    onClick={() => handleTabClick("댓글 많은 뉴스")}
                >
                    댓글 많은 뉴스
                </Tab>
            </div>


            {/* <Divider /> */}

            {articles.map((_, index) => (
                <div>
                    <h3></h3>
                    <RankingArticle
                     key={index}
                     rank={index+1} />
                    <hr></hr>
                </div>
            ))}
        </div>
    );
}

const Tab = styled.h3`
    color: ${({ isSelected }) => (isSelected ? "black" : "#ccc")};
    cursor: pointer;
    &:hover {
        color: black;
    }
`;

const TabDivider = styled.h3`
    margin: 0 8px;
    color: #ccc;
`;

const Divider = styled.div`
    width: 100%;                 /* 전체 너비 사용 */
    height: 2px;                 /* 직선의 높이 (두께) */
    background-color: #ccc;      /* 직선의 색상 */
    margin: 10px 0;              /* 직선 위아래 여백 */
`;