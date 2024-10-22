import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import styled from "styled-components";
import { useState } from 'react';
import 'swiper/css/navigation';

export default function MenuList() {
    const categories = ['MY', '랭킹', '정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];
    const [activeIndex, setActiveIndex] = useState(null); // 선택된 슬라이드 인덱스를 저장

    const handleSlideClick = (index) => {
        setActiveIndex(index); // 클릭된 슬라이드의 인덱스를 저장
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
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')}; /* 활성화된 슬라이드에 bold 적용 */
    color: ${({ isActive }) => (isActive ? 'black' : 'gray')}; /* 활성화된 슬라이드의 글자 색상 변경 */
`;
