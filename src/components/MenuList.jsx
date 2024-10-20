import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import styled from "styled-components";
import 'swiper/css/navigation';

export default function MenuList() {
    const categories = ['MY', '랭킹', '정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];

    return (
        <div className='mobile-header m0 pd0'>
            <Swiper
                style={{ height: '4rem', width: '100%' }} // 높이 및 폭 설정
                className='mobile-header m0 pd0 '
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={6} // 한 번에 보여지는 슬라이드 수
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {categories.map((category, index) => (
                    <StyledSwiperSlide key={index}>{category}</StyledSwiperSlide>
                ))}
                <StyledSwiperButton className="swiper-button-prev">‹</StyledSwiperButton>
                <StyledSwiperButton className="swiper-button-next">›</StyledSwiperButton>
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
        left: 0px; // 버튼 위치 조정
    }

    &.swiper-button-next {
        right: 0px; // 버튼 위치 조정
    }

    &.swiper-button-prev:after,
    &.swiper-button-next:after {
        font-size: 1.1rem !important;
        font-weight: 600 !important;
    }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
    display: flex;               /* Flexbox 사용 */
    justify-content: center;     /* 수평 중앙 정렬 */
    align-items: center;         /* 수직 중앙 정렬 */
    height: 100%;                /* 전체 높이 사용 */
    font-size: 1.1rem;            /* 글자 크기 조정 */
    padding: 0 10px;            /* 슬라이드 내부 여백 추가 */
    box-sizing: border-box;      /* 패딩이 높이에 포함되도록 설정 */
`;
