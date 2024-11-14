import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleContent from '../articleDetail/ArticleContent';


function MyDetail() {
    const navigate = useNavigate();

    const clickEdit = (id) => {
        navigate(`/articleWrite/${id}`);
    };
    const clickPrivate = (id) => {
        const isConfirmed = window.confirm('기사 비공개를 요청하시겠습니까?');
        if (isConfirmed) {
            // 여기에서 api 연결
            const mergedSubTitles = subTitles.join(',./');
            navigate('/main');
        }
    };
    const article = {
        title: "기사 제목",
        date: "2024.11.10 오전 10:00",
        authorName: "홍길동",
        authorEmail: "hong@yu.com",
        publisherUrl: "www.yu.ac.kr",
        authorDescription: "간단한 소개",
        subtitles: "소제목1,./소제목2,./소제목3",
        content: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "https://placehold.co/300x200",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ]
    };
    return (
        <div className='mobile-container'>
            <div className='flex mlAuto'>
                <div onClick={clickEdit} className='mr1 pointer'>수정</div>
                <div onClick={clickPrivate} className='pointer'>비공개</div>
            </div>
            <ArticleContent article={article}></ArticleContent>
        </div>
    );
}

export default MyDetail;
