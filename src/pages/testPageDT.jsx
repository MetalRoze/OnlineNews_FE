import React from 'react';
import Sidebar from '../components/Sidebar';
import MyCalendar from '../components/Calendar';
import AdminRequest from '../components/AdminRequest';
import AdminArticle from '../components/AdminArticle';
import styled from 'styled-components';
import Label from '../components/Label';


export default function TestPageDT() {
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <Sidebar />
            <div className="desktop-container">
                {/* <h1>테스트페이지</h1>
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

                <button>기본 버튼</button> */}
                <MyCalendar />
                <div style={{ height: '3rem' }}></div>
                <div className='flex'>
                <Label  text={"시민"}/>
                <div style={{width: '0.5rem'}}></div>
                <Label  text={"정치/경제"} color={'white'} backgroundColor={'blue'}/>
               
                </div>
                <div style={{ height: '3rem' }}></div>
                <div className='flex column aiFlexstart' style={{width: '78rem'}}>
                    <h2 className='mb1'>기사 요청 현황</h2>
                    <StyledRequestListWrapper>
                        <AdminRequest />
                        <AdminRequest />
                        <AdminRequest />
                        <AdminRequest />
                        <AdminRequest />
                        <AdminRequest />
                    </StyledRequestListWrapper>
                    <button style={{ width: '6rem', alignSelf: 'center' }}>더보기</button>
                </div>
                <div style={{ height: '3rem' }}></div>
                
                <div className='flex column aiFlexstart' style={{width: '78rem'}}>
                    <h2 className='mb1' style={{ alignSelf: "flex-start" }}>오늘 기사</h2>
                    <StyledArticleListWrapper> 
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                        <AdminArticle />
                    </StyledArticleListWrapper>
                    <button style={{ width: '6rem', alignSelf: 'center' }}>더보기</button>
                </div>
                <div style={{ height: '3rem' }}></div>
            </div>
        </div>
    );
}
const StyledRequestListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr); 
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
`;
const StyledArticleListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr); 
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
`;