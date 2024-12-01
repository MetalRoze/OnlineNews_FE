import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-dom";

export default function BasicArticle({ article }) {
  const navigate = useNavigate();

  const handleArticleClick = () => {
    if (article.articleImg && article.articleImg.length > 0) {
      // 이미지가 있으면 상세 페이지로 이동
      navigate(`/articleDetail/${article.id}`);
    } else {
      // 이미지가 없으면 URL로 이동
      window.location.href = article.url; // `article.url`은 URL 필드로 가정
    }
  };

  return (
    <ArticleContainer onClick={handleArticleClick}>
      {article.articleImg && article.articleImg.length > 0 ? (
        <ImageWrapper>
          <Img src={article.articleImg} alt={article.title} />
        </ImageWrapper>
      ) : null}

      <ArticleInfo noImage={!article.articleImg || article.articleImg.length === 0}>
        <Title>{article.title}</Title>
        <Source>{article.publisherName}</Source>
      </ArticleInfo>
    </ArticleContainer>
  );
}

const ArticleContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
  cursor: pointer;
  align-items: center;
`;

const ImageWrapper = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.7rem;
  width: 12rem;
  height: 7.5rem;
  background-color: #f0f0f0;
`;

const Img = styled.img`
  width: 12rem;
  height: 100%;
  object-fit: cover;
`;

const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 8rem;
  margin-left: ${({ noImage }) => (noImage ? "0.5rem" : "0")}; /* 이미지가 없을 경우 왼쪽 마진 추가 */
  margin-right: 0.5rem;
`;

const Title = styled.p`
  margin: 0;
  margin-top: 0.3rem;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Source = styled.p`
  margin: 0;
  color: ${theme.colors.gray50};
  text-align: left;
  margin-bottom: 0.3rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
