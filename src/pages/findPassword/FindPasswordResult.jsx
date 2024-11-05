import React, {useState} from 'react'; 
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; 
import TextButton from '../../components/TextButton'; 


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
    justify-content: center; 
    align-items: center; 
    width: 400px;
    height: 150px; 
    border: 1px solid var(--color-black); 
    padding:20px;
`; 

const ResultText = styled.h3`
    margin:20px;
    color: var(--color-black); 
`; 



export default function FindPasswordResult(){
    const navigate = useNavigate(); 

    const [activeMenu, setActiveMenu] = useState("password"); 
    
    const handleFindId = () => {
        navigate('/findId')
    }

    const handleSubmit = () => {
        navigate('/login')
    }

    return (
        <div className='column mobile-container m0 pd20 aiCenter jfCcenter'>
            <MenuWrapper>
                <TextButton
                    label="이메일 찾기"
                    style={{fontSize:'2rem', fontWeight:"500"}}
                    isActive={activeMenu === "id"}
                    onClick={handleFindId}
                ></TextButton>
                <TextButton
                    label="비밀번호 찾기"
                    style={{fontSize:'2rem', fontWeight:"500"}}
                    isActive={activeMenu === "password"}
                    onClick={() => setActiveMenu('password')} 
                    ></TextButton>
            </MenuWrapper>

            <ResultWrapper>
                <ResultSubtitle>임시 비밀번호가 발급되었습니다.</ResultSubtitle>
                <ResultBox>
                    <ResultText>@aBjL4kq!O8y</ResultText>

                </ResultBox>
            </ResultWrapper>
            <button onClick={handleSubmit} className="long-black-button" style={{fontWeight:"300", fontSize:"1.25rem", width:'400px'}}>로그인 하러 가기</button>

        </div>
    )
 
}