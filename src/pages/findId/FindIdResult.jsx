import React, {useState} from 'react'; 
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; 
import TextButton from '../../components/TextButton'; 

const HeadWrapper = styled.div
` max-width: 600px;
  width:100%;
  min-height: 100vh; 
  padding: 20px; 
  display: flex; 
  flex-direction:column;
  justify-content: center; 
  align-items: center; 
  background-color: var(--color-white); `
; 

const MenuWrapper = styled.div
`  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 50px;    
  `
;

const ResultWrapper = styled.div
`
    width:400px;
    height:250px;
    overflow-y:auto;
    scrollbar-width: none;
    padding:0px 5px 20px 5px;
    display: flex;
    justify-content: center;
    flex-direction:column;
    align-items: center; 
`; 

const ResultSubtitle = styled.p`
    font-size:1.25rem; 
    margin-bottom: 30px;
    color: var(--color-black); 
`; 

const ResultBox = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: left; 
    align-items: left; 
    width: 400px;
    height: 150px; 
    border: 1px solid var(--color-black); 
    padding:20px;
`; 

const ResultText = styled.h3`
    margin:20px;
    color: var(--color-black); 
`; 

const ResultTextDate = styled.p`
    margin: 0px 20px; 
    color: var(--color-black); 
`; 



export default function FindIdResult(){
    const navigate = useNavigate(); 

    const [activeMenu, setActiveMenu] = useState("id"); 
    


    const handleFindPassword = () => {
        navigate('/findPassword')
    }

    const handleSubmit = () => {
        navigate('/login')
    }

    return (
        <HeadWrapper>
            <MenuWrapper>
                <TextButton
                    label="이메일 찾기"
                    style={{fontSize:'2rem', fontWeight:"500"}}
                    isActive={activeMenu === "id"}
                    onClick={() => setActiveMenu("id")}
                ></TextButton>
                <TextButton
                    label="비밀번호 찾기"
                    style={{fontSize:'2rem', fontWeight:"500"}}
                    isActive={activeMenu === "password"}
                    onClick={handleFindPassword} 
                    ></TextButton>
            </MenuWrapper>

            <ResultWrapper>
                <ResultSubtitle>회원정보와 일치하는 아이디입니다.</ResultSubtitle>
                <ResultBox>
                    <ResultText>aB*****@gmail.com</ResultText>
                    <ResultTextDate>가입일 : 2024-10 </ResultTextDate>
                </ResultBox>
            </ResultWrapper>
            <button onClick={handleSubmit} className="long-black-button" style={{fontWeight:"300", fontSize:"1.25rem", width:'400px'}}>로그인 하러 가기</button>

        </HeadWrapper>
    )
 
}