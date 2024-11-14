import React, {useEffect, useState} from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components'; 
import TextButton from '../../components/TextButton'; 
import {postRequest } from '../../apis/axios';


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
    
    const [userData, setUserData] = useState({
        email:'', 
        createdAt:''
    }); 

    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true); 

    const initialFormData = useLocation(); 

    const [formData, setFormData] = useState({
        name:initialFormData.state.name, 
        cp:initialFormData.state.cellphone
    }); 
    
    useEffect(() => {
        getUserData(); 
        console.log(formData); 
    }, [])
    
    const getUserData = async () => {
        const data = {
            name: formData.name, 
            cp:formData.cp.part1+'-'+formData.cp.part2+'-'+formData.cp.part3
        }
        postRequest('/api/user/findId', data)
            .then(response => {
                console.log(response.data); 
                setUserData({
                    email:response.data[0].email, 
                    createdAt:response.data[0].createAt
                }); 
                setError(null)
            })

            .catch(error => {
                console.error("회원정보 불러오기 실패!"); 
                if(error.response.status == 404){
                    setError("회원정보와 일치하는 아이디가 없습니다.")
                }else{
                    alert("오류가 발생했습니다. 다시 시도해주세요")
                    navigate('/findId')
                }
            })

            .finally(() => {
                setLoading(false)
            })
            
    }; 

    const handleFindId = () =>{
        setActiveMenu("id")
        navigate('/findId')
    }

    const handleFindPassword = () => {
        navigate('/findPassword')
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
                    onClick={handleFindPassword} 
                    ></TextButton>
            </MenuWrapper>

            <ResultWrapper>
            {loading ? (
                <ResultSubtitle>로딩중...</ResultSubtitle>
            ) : (
                <>
                    {error ? (
                    <ResultSubtitle>{error}</ResultSubtitle>
                ) : (
                    <>
                        <ResultSubtitle>회원정보와 일치하는 아이디입니다.</ResultSubtitle>
                        <ResultBox>
                            <ResultText>{userData.email}</ResultText>
                            <ResultTextDate>가입일 : {userData.createdAt}</ResultTextDate>
                        </ResultBox>
                    </>
                )}
                </>
            )} 
            </ResultWrapper>
            {loading ? (<p></p>) : (
                <>
                    {error ? (
                    <button onClick={handleFindId} className="long-black-button" style={{fontWeight:"300", fontSize:"1.25rem", width:'400px'}}>다시 찾기</button>
                ) : (
                    <button onClick={handleSubmit} className="long-black-button" style={{fontWeight:"300", fontSize:"1.25rem", width:'400px'}}>로그인 하러 가기</button>
                ) }
                </>
            )}
        </div>
    )
 
}