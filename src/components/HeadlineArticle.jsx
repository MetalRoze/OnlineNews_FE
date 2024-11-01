import React from "react";
import { useNavigate } from 'react-router-dom';

export default function HeadlineArticle() {
    const navigate = useNavigate();

    const handleArticleClick = () => {
        navigate('/articleDetail');
    }
    return (
        <div className='flex column mobile-header' style={{ cursor: "pointer" }} onClick={handleArticleClick}>
            <h2>수술 부위 감염되자 소송, 1심 패소 2심 승소…대법 판단은?</h2>
            <h4>2심 의료상 과실 인정 "검출 병원균, 병원 내 감염 일으켜"</h4>
            <h4>대법 "병원 감염 원인 다양…완전한 예방 불가" 파기 환송</h4>
            <img style={{ width: "35rem", height: "18rem" }}></img>

            {/* 해당 이미지, 글 부분은 하드코딩말고 설정할 수 있도록 해야함.
            그래서 재사용 컴포넌트로 만들었습니다...  */}
        </div>
    );
}