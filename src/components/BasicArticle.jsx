import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useNavigate } from 'react-router-dom';

export default function BasicArticle() {
  const navigate = useNavigate();

  // const handleArticleClick = () => {
  //   navigate('/articleDetail');
  // };

  const handleArticleClick = () => {
    navigate("/articleDetail", { state: { articleId: article.id } });
  };

  return (
    <div className='basicArticle pd10' 
    style={{ cursor: "pointer", display: "flex" }} 
    onClick={handleArticleClick}
    >
      <img className='m0' 
      style={{ marginLeft: "0.5rem", marginRight: "0.5rem", width: "13rem", height: "8rem" }}
      src={article.images[0]}
      alt={article.title} />
      <ArticleInfo>
        <Title>{article.articleTitle}</Title>
        <Source>{article.publisherName}</Source>
      </ArticleInfo>
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
  margin-top : 0.3rem;
`;

const Source = styled.p`
  margin: 0;
  color: ${theme.colors.gray50}; 
  text-align: left;
  margin-bottom : 0.3rem;

`;
