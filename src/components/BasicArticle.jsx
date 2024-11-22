import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useNavigate } from 'react-router-dom';

export default function BasicArticle({ article }) {
  const navigate = useNavigate();

  const handleArticleClick = () => {
    navigate(`/articleDetail/${article.id}`);
  };

  return (
    <div className='basicArticle pd0'
      style={{ cursor: "pointer", display: "flex", marginTop: "0.5rem" }}
      onClick={handleArticleClick}
    >
      {/* 이미지가 있을 경우 보여주고, 없으면 빈 공간을 보여줍니다 */}
      <ImageWrapper>
        {article.articleImg && article.articleImg.length > 0 ? (
          <Img 
            src={article.articleImg}  
            alt={article.articleTitle} 
          />
        ) : (
          <EmptyImage />  // 이미지가 없으면 빈 공간을 보여줌
        )}
      </ImageWrapper>
      
      <ArticleInfo>
        <Title>{article.articleTitle}</Title>
        <Source>{article.publisherName}</Source>
      </ArticleInfo>
    </div>
  );
}

// 이미지와 빈 화면을 감싸는 Wrapper
const ImageWrapper = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.7rem;
  width: 12rem;
  height: 7.5rem;
  background-color: #f0f0f0;  /* 기본 배경색 (빈 이미지일 경우 사용) */
`;

// 실제 이미지
const Img = styled.img`
  width: 12rem; // 부모 div에 맞게 100%로 크기 조정
  height: 100%;  // 부모 div에 맞게 100%로 크기 조정
  object-fit: cover;  /* 이미지가 크기를 채우면서 비율을 유지 */
`;

// 이미지가 없을 경우 표시되는 빈 공간
const EmptyImage = styled.div`
  width : 12rem;
  height: 100%;
  background-color: #f0f0f0;  /* 빈 공간의 배경색 */
`;

const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between; 
  margin-right: 0.5rem;
  height: 8rem; 
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
