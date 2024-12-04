import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GeneralOptionIcon from '../../assets/generaluserIcon.png'
import JournalistOptionIcon from '../../assets/journalistIcon.png'
import { BiBorderAll } from 'react-icons/bi';

const SignupSelectTitle = styled.h1`
    margin-bottom: 10px; 
    text-align: center; 
`;

const SignupSelectSubTitle = styled.p`
    font-size: 1.25rem;
    margin-bottom: 20px; 
    text-align: center; 
    color: var(--color-black); 
    padding-bottom: 20px; 
`;

const OptionWrapper = styled.div`
    width:100%; 
    max-width:80%;
    padding:20px;
    margin-bottom:10px;
    border: 1px solid var(--color-gray20);
    border-radius: 5px;
    display: flex; 
    flex-direction:column;
    justify-content: center; 
    align-items: center; 
`; 

const OptionIcon = styled.img`
    width:70px; 
    height:70px; 
    margin-bottom: 10px;
`; 

const OptionButton = styled.button`
    padding: 10px;
    width: 100%;
    max-width:300px; 
    background-color: var(--color-gray50);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
`; 

export default function Signup() {
    const navigate = useNavigate(); 

    const handleGeneralSignup = () => {
        navigate('/signup/generalTerm');
    }; 

    const handleJournalistSignup = ()=> {
        navigate('/signup/journalistTerm'); 
    }; 

    return ( 
        <div className='column mobile-container m0 pd20 aiCenter jfCcenter'>
                <SignupSelectTitle>가입 유형 선택</SignupSelectTitle>
                <SignupSelectSubTitle>해당하는 회원의 종류를 선택해주세요</SignupSelectSubTitle>
                <OptionWrapper>
                    <OptionIcon src={GeneralOptionIcon}></OptionIcon>
                    <OptionButton onClick={handleGeneralSignup}>일반회원 가입</OptionButton>
                </OptionWrapper>

                <OptionWrapper>
                    <OptionIcon src={JournalistOptionIcon}></OptionIcon>
                    <OptionButton onClick={handleJournalistSignup}>시민기자 가입</OptionButton>
                </OptionWrapper>
        </div>
       
    );
}
