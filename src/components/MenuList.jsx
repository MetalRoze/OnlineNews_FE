import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import styled from "styled-components";
import { useState, useEffect, useRef } from 'react';
import 'swiper/css/navigation';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MenuList({ backgroundColor = 'var(--color-white)', textColor = 'var(--color-black)', prompCategory = 0 }) {
    const categories = ['홈', 'MY', '랭킹', '정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];
    const paths = ['main', 'my', 'ranking', 'politics', 'economy', 'society', 'entertainment', 'lifestyle', 'tech', 'opinion'];
    const [activeIndex, setActiveIndex] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const swiperRef = useRef(null);  // Swiper 인스턴스 참조

    useEffect(() => {
        const currentPath = location.pathname.split('/')[1];
        const currentIndex = paths.indexOf(currentPath);
        if (currentIndex !== -1) {
            setActiveIndex(currentIndex);
            swiperRef.current?.slideTo(currentIndex);  // 초기화 시에 현재 인덱스로 슬라이드 이동
        } else {
            setActiveIndex(prompCategory+1)
            swiperRef.current?.slideTo(prompCategory+1);
        }
    }, [location.pathname, prompCategory]);

    const handleSlideClick = (index) => {
        setActiveIndex(index);
        swiperRef.current?.slideTo(index);  // 클릭한 인덱스로 슬라이드 이동
        navigate(`/${paths[index]}`);
    };

    return (
        <div className='mobile-header m0 pd0'>
            <Swiper
                style={{ height: '4rem', width: '100%', backgroundColor: backgroundColor }}
                className='mobile-header m0 pd0'
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView="auto"
                onSwiper={(swiper) => (swiperRef.current = swiper)}  // Swiper 인스턴스 저장
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
                        isActive={activeIndex === index}
                        onClick={() => handleSlideClick(index)}
                        textColor={textColor} // textColor를 props로 전달
                    >
                        {category}
                    </StyledSwiperSlide>
                ))}
                {categories.length > 5 && (
                    <>
                        <StyledSwiperButton backgroundColor={backgroundColor} textColor={textColor} className="swiper-button-prev">‹</StyledSwiperButton>
                        <StyledSwiperButton backgroundColor={backgroundColor} textColor={textColor} className="swiper-button-next">›</StyledSwiperButton>
                    </>
                )}
            </Swiper>
        </div>
    );
}

const StyledSwiperButton = styled.div`
    &.swiper-button-prev,
    &.swiper-button-next {
        background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
        padding: 10px; 
        border-radius: 20px;
        color: ${({ textColor }) => textColor || 'black'};
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
    cursor: pointer;
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')}; 
    color: ${({ isActive, textColor }) => (isActive ? textColor : 'var(--color-gray30)')};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
