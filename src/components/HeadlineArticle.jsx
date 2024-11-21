import React from "react";
import { useNavigate } from 'react-router-dom';

export default function HeadlineArticle({head}) {
    const navigate = useNavigate();

    const handleArticleClick = () => {
        navigate(`/articleDetail/${head.id}`);
    }
    return (
        <div className='flex column mobile-header' style={{ cursor: "pointer" }} onClick={handleArticleClick}>
            <h2>{head.articleTitle}</h2>
            <h4>{head.articleSubTitle}</h4>
            {/* <h4>대법 "병원 감염 원인 다양…완전한 예방 불가" 파기 환송</h4> */}
            <img style={{ width: "35rem", height: "18rem" }}>{head.articleImg}</img>

            {/* 해당 이미지, 글 부분은 하드코딩말고 설정할 수 있도록 해야함.
            그래서 재사용 컴포넌트로 만들었습니다...  */}
        </div>
    );
}