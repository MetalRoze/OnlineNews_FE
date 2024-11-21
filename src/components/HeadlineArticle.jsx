import React from "react";
import { useNavigate } from 'react-router-dom';

export default function HeadlineArticle({ head }) {
    const navigate = useNavigate();

    const handleArticleClick = () => {
        navigate(`/articleDetail/${head.id}`);
    };

    return (
        <div
            className="flex column mobile-header"
            style={{ cursor: "pointer" }}
            onClick={handleArticleClick}
        >
            <h2>{head.articleTitle}</h2>
            <h4>{head.articleSubTitle}</h4>
            <img
                src={head.articleImg}
                alt={head.articleTitle}
                style={{ width: "35rem", height: "18rem" }}
            />
        </div>
    );
}
