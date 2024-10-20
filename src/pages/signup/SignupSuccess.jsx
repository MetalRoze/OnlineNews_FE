import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import checkIcon from '../../assets/check-circle.svg';


const HeadWrapper = styled.div`
    width: 600px;
    min-height: 100vh; 
    padding: 20px; 
    display: flex; 
    flex-direction:column;
    justify-content: center;
    align-items: center; 
    background-color: var(--color-white); 
`; 

const IconWrapper = styled.div`
    margin-bottom: 50px; // 아이콘과 텍스트 사이의 간격
`;

const Message = styled.h1`
    font-size: 1.75rem; // 텍스트 크기
    color: var(--color-black); // 텍스트 색상
    text-align: center; // 텍스트 가운데 정렬
`;

const NextButton = styled.button`
    padding:10px;
    width: 400px;
    background-color: var(--color-gray40);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    position: absolute; 
    bottom: 20px; 
    left: 50%;
    transform: translateX(-50%); 
`; 

export default function Signup() {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleNext = () => {
        navigate('/login');
    };

    return (
        <HeadWrapper>
            <IconWrapper>
                <img 
                    width='180px' 
                    height='180px'
                    src={checkIcon} alt="Check Icon" />
            </IconWrapper>
            <Message>회원가입이 완료되었습니다</Message>

            <NextButton onClick={handleNext}>확인</NextButton>
        </HeadWrapper>

    );
}