import React from 'react';

export default function TestPage() {
    return ( 
        <div className="mobile-container">
            <h1>테스트페이지</h1>
            <h2>헤딩 2</h2>
            <h3>헤딩 3</h3>
            <h4>헤딩 4</h4>
            <h5>헤딩 5</h5>
            <h6>헤딩 6</h6>

            <p> p. 가독성을 위해 1rem 크기로 설정되어 있습니다.</p>
            <p>추후 홈 생기면 해당 페이지 삭제 후 App.jsx 경로 수정</p> 

            <small>작은 텍스트 small 예시입니다.</small>

            <p>
                <a href="#">이것은 링크입니다. hover 확인</a>
            </p>

            <button>기본 버튼</button> 
        </div> 
    );
}
