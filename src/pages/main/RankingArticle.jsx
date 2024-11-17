import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useNavigate } from 'react-router-dom';

export default function RankingArticle({ rank }) {
  const navigate = useNavigate();

  const handleArticleClick = (articleId) => {
    navigate(`/articleDetail/${articleId}`);  // articleId를 URL에 포함시켜서 이동
  };

  return (
    <div className='basicArticle pd10' style={{ cursor: "pointer", display: "flex" }} onClick={() => handleArticleClick(1)}>
      <ArticleInfo>
        <h4>{rank}</h4>
        <Title>‘논술로 대학 가볼까’....수시모집 지원자 44% 몰려</Title>
        <Source>서울신문</Source>
      </ArticleInfo>
      <img className='m0' style={{ marginLeft: "0.5rem", marginRight: "0.5rem", width: "13rem", height: "8rem" }} />

    </div>
  );
}

const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between; 
  margin-right: 2.5rem;
  height: 8rem; 
`;

const Title = styled.p`
  margin: 0;
  margin-top : 0rem;
`;

const Source = styled.p`
  margin: 0;
  color: ${theme.colors.gray50}; 
  text-align: left;
  margin-bottom : 0.3rem;

`;
