import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useNavigate } from "react-router-dom";

export default function RankingArticle({ rank, article }) {
  const navigate = useNavigate();

  const handleArticleClick = () => {
    navigate(`/articleDetail/${article.id}`); // article.id를 URL에 포함시켜서 이동
  };

  return (
    <ArticleContainer onClick={handleArticleClick}>
      <ArticleInfo>
        <Rank>{rank}</Rank>
        <Title>{article.title}</Title>
        <Source>{article.publisherName}</Source>
      </ArticleInfo>
      {article.images && (
        <ArticleImage
          src={article.images[0]}
          alt={`${article.images[0]} 썸네일`}
        />
      )}
    </ArticleContainer>
  );
}

const ArticleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 텍스트와 이미지를 양쪽 끝으로 배치 */
  cursor: pointer;
  padding: 10px;
`;

const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 2.5rem;
  max-width: calc(100% - 10rem); /* 텍스트가 이미지와 겹치지 않도록 제한 */
`;

const Rank = styled.h4`
  margin: 0;
`;

const Title = styled.p`
  margin: 0;
  font-weight: bold;
`;

const Source = styled.p`
  margin: 0;
  color: ${theme.colors.gray50};
  text-align: left;
  margin-top : 2rem;
`;

const ArticleImage = styled.img`
  width: 8rem; /* 정사각형 크기 설정 */
  height: 8rem; /* 정사각형 크기 설정 */
  object-fit: cover; /* 이미지가 넘치면 잘라내고, 비율 유지 */
  border-radius: 0.2rem; /* 모서리를 둥글게 */
  flex-shrink: 0; /* 이미지 크기가 텍스트 길이에 따라 줄어들지 않도록 */
`;
