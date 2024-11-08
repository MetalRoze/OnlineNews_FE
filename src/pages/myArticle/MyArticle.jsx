import React from 'react';

const articles = [
    {
        id: 1,
        title: '정치 뉴스 1',
        subtitle: '정치 소식 요약,./few,./few,./',
        date: '2024-11-08',
        content: '오늘 정치계에서는 많은 사건이 발생했습니다. 국회에서는... 사건이 발생했습니다. 국회에서는... 사건이 발생했습니다. 국회에서는... 사건이 발생했습니다. 국회에서는...',
    },
    {
        id: 2,
        title: '경제 뉴스 2',
        subtitle: '경제 소식 요약',
        date: '2024-11-07',
        content: '경제 상황이 변화하며 주식 시장에 많은 영향을 미치고 있습니다... 사건이 발생했습니다. 국회에서는... 사건이 발생했습니다. 국회에서는... 사건이 발생했습니다. 국회에서는...',
    },
    {
        id: 3,
        title: '문화 뉴스 3',
        subtitle: '문화 소식 요약',
        date: '2024-11-06',
        content: '오늘 문화계에서는 여러 행사가 열렸습니다. 특히 예술 공연이... 사건이 발생했습니다. 국회에서는... 사건이 발생했습니다. 국회에서는... 사건이 발생했습니다. 국회에서는...',
    },
];

function MyArticle() {
    return (
        <div className='mobile-container'>
            <ul className='myArticle'>
                {articles.map((article) => (
                    <li key={article.id} className='item'>
                        <div className='flex spaceBetween mb03'>
                            <h4 className='mr1 mtbAuto'>{article.title}</h4>
                            <span className='mlAuto gray40 mtbAuto'>{article.date}</span>
                        </div>
                        <div className='mb05 gray60'>{article.subtitle.split(',./')[0]}</div>
                        <div className='content'>
                            {article.content}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyArticle;
