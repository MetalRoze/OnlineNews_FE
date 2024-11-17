import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import checkIcon from '../../assets/check-circle.svg';

const IconWrapper = styled.div`
    margin-bottom: 50px; 
`;

const Message = styled.h1`
    font-size: 1.75rem;
    color: var(--color-black);
    text-align: center;
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
        <div className='column mobile-container m0 pd20 aiCenter jfCcenter'>
            <IconWrapper>
                <img 
                    width='180px' 
                    height='180px'
                    src={checkIcon} alt="Check Icon" />
            </IconWrapper>
            <Message>회원가입이 완료되었습니다</Message>

            <NextButton onClick={handleNext}>확인</NextButton>
        </div>
    
    );
}