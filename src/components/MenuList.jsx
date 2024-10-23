import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import styled from "styled-components";
import { useState, useEffect } from 'react';
import 'swiper/css/navigation';
import { useNavigate, useLocation } from 'react-router-dom'; 

export default function MenuList() {
    const categories = ['MY', '랭킹', '정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];
    const paths = ['my', 'ranking', 'politics', 'economy', 'society', 'entertainment', 'lifestyle', 'tech', 'opinion'];
    const [activeIndex, setActiveIndex] = useState(null); 
    const navigate = useNavigate(); 
    const location = useLocation(); 

    // URL 경로에 맞춰 activeIndex 설정
    useEffect(() => {
        const currentPath = location.pathname.split('/')[1]; // 현재 경로의 첫 번째 슬래시 뒤의 부분을 가져옴
        const currentIndex = paths.indexOf(currentPath); // 경로에 맞는 인덱스 찾기
        if (currentIndex !== -1) {
            setActiveIndex(currentIndex); // 해당 경로에 맞는 인덱스를 activeIndex로 설정
        }
    }, [location.pathname]); // location.pathname이 변경될 때마다 실행

    const handleSlideClick = (index) => {
        setActiveIndex(index); // 클릭된 슬라이드의 인덱스를 저장
        navigate(`/${paths[index]}`); // 해당 경로로 이동
    };

    return (
        <div className='mobile-header m0 pd0'>
            <Swiper
                style={{ height: '4rem', width: '100%' }}
                className='mobile-header m0 pd0'
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView="auto"
                navigation={categories.length > 5 ? {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                } : false}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {categories.map((category, index) => (
                    <StyledSwiperSlide
                        key={index}
                        isActive={activeIndex === index} // 현재 슬라이드가 활성화된 슬라이드인지 확인
                        onClick={() => handleSlideClick(index)} // 클릭 핸들러
                    >
                        {category}
                    </StyledSwiperSlide>
                ))}
                {categories.length > 5 && (
                    <>
                        <StyledSwiperButton className="swiper-button-prev">‹</StyledSwiperButton>
                        <StyledSwiperButton className="swiper-button-next">›</StyledSwiperButton>
                    </>
                )}
            </Swiper>
        </div>
    );
}

const StyledSwiperButton = styled.div`
    &.swiper-button-prev,
    &.swiper-button-next {
        background-color: #fff;
        opacity: 0.5;
        padding: 10px; 
        border-radius: 20px;
        color: black !important;
        z-index: 10;
    }

    &.swiper-button-prev {
        left: 0px; 
    }

    &.swiper-button-next {
        right: 0px; 
    }

    &.swiper-button-prev:after,
    &.swiper-button-next:after {
        font-size: 1.1rem !important;
        font-weight: 600 !important;
        content: ''; 
    }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1.1rem;
    padding: 0 10px;
    box-sizing: border-box;
    flex: 1 0 auto;
    min-width: 0;
    max-width: calc(100% / 5 - 10px);
    cursor: pointer; /* 클릭 가능한 상태 표시 */
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')}; 
    color: ${({ isActive }) => (isActive ? 'black' : 'gray')}; 
`;
