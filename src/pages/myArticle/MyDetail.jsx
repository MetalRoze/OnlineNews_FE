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
    return (
        <div className='mobile-container'>
            <div className='flex mlAuto'>
                <div onClick={clickEdit} className='mr1 pointer'>수정</div>
                <div onClick={clickPrivate} className='pointer'>비공개</div>
            </div>
            <ArticleContent></ArticleContent>
        </div>
    );
}

export default MyDetail;
