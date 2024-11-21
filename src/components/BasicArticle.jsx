import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useNavigate } from 'react-router-dom';

export default function BasicArticle({ article }) {  // article prop을 받아옵니다.
  const navigate = useNavigate();

  const handleArticleClick = () => {
    navigate(`/articleDetail/${article.id}`);
  };

  return (
    <div className='basicArticle pd0'
      style={{ cursor: "pointer", display: "flex" }}
      onClick={handleArticleClick}
    >
      <img className='m0'
        style={{ marginLeft: "0.5rem", marginRight: "0.7rem", width: "13rem", height: "rem" }}
        src={article.articleImg}  // article.images[0]을 사용
        alt={article.articleTitle} />
      <ArticleInfo>
        <Title>{article.title}</Title>
        <Source>{article.publisherName}</Source>
      </ArticleInfo>
    </div>
  );
}

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
  width: 100%;      /* Title이 부모 영역에 맞게 크기를 가질 수 있도록 설정 */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 두 줄로 제한 */
  -webkit-box-orient: vertical; /* 수직 방향으로 박스 배치 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘칠 경우 "..."으로 표시 */
`;


const Source = styled.p`
  margin: 0;
  color: ${theme.colors.gray50}; 
  text-align: left;
  margin-bottom: 0.3rem;
  width: 100%;     /* Source도 부모 영역에 맞게 크기를 가질 수 있도록 설정 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* 한 줄로 표시 */
`;
