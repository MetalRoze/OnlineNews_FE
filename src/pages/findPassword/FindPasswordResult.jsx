import React, {useEffect, useState} from 'react'; 
import { useNavigate, useLocation} from 'react-router-dom';
import styled from 'styled-components'; 
import TextButton from '../../components/TextButton'; 
import { patchRequest } from '../../apis/axios';


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
    const [temporaryPw, setTemporaryPw] = useState(''); 

    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true); 

    const initialFormData = useLocation(); 

    const [formData, setFormData] = useState({
        name : initialFormData.state.name, 
        email : initialFormData.state.email 
    })

    useEffect(() => {
        getTemporaryPassword(); 
        console.log(temporaryPw); 
    }, [])

    const getTemporaryPassword = () =>{
        const data = {
            name : formData.name, 
            email : formData.email
        }

        patchRequest('/api/user/findPassword', data)
            .then(response => {
                setTemporaryPw(response.data.temporaryPw); 
                setError(null)
            })

            .catch(error => {
                console.error("회원정보 불러오기 실패!"); 
                if(error.response.status == 404){
                    setError("회원정보와 일치하는 정보가 없습니다.")
                }else{
                    alert("오류가 발생했습니다. 다시 시도해주세요")
                    navigate('/findPassword')
                }
            })

            .finally(() => {
                setLoading(false)
            })
    }
    
    const handleFindId = () => {
        navigate('/findId')
    }

    const handleFindPassword = () =>{
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
                    onClick={() => setActiveMenu('password')} 
                    ></TextButton>
            </MenuWrapper>

            <ResultWrapper>
            {loading ? (
                <ResultSubtitle>로딩중 ... </ResultSubtitle>
            ) : (
                <>
                {error ? (
                    <ResultSubtitle>{error}</ResultSubtitle>
                ) : (
                    <>
                    <ResultSubtitle>임시 비밀번호가 발급되었습니다.</ResultSubtitle>
                    <ResultBox>
                        <ResultText>{temporaryPw}</ResultText>
                    </ResultBox>
                    </>
                )}
                </>
            )}
            </ResultWrapper>
            {loading ? (<p></p>) : (
                <>
                {error ? (
                    <button onClick={handleFindPassword} className="long-black-button" style={{fontWeight:"300", fontSize:"1.25rem", width:'400px'}}>다시 찾기</button>
                ) : (
                    <button onClick={handleSubmit} className="long-black-button" style={{fontWeight:"300", fontSize:"1.25rem", width:'400px'}}>로그인 하러 가기</button>
                )}
                </>
            )}
        </div>
    )
 
}