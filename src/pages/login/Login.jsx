import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {postRequest} from '../../apis/axios'

const LoginTitle = styled.h1`
margin-bottom: 10px; 
text-align: center; 
`;

const LoginSubTitle = styled.p`
margin-bottom: 20px; 
text-align: center; 
color: var(--color-black); 
padding-bottom: 20px; 
`;

const LoginOptionsWrapper = styled.div`
margin-top: 20px; 
text-align: center; 
`;

const LoginOptionsLink = styled.span`
margin: 0 10px;
cursor: pointer;
color: var(--color-primary);
`; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const data={
            email: email,
            password: password
        }
        postRequest('/api/user/login', data)
            .then(response => {
                console.log(response.data);
                sessionStorage.setItem('authToken', response.data.accessToken);
                console.log('저장된 authToken:', sessionStorage.getItem('authToken'));
            
                navigate('/main')
            })
            .catch(error => {
                console.error('Error fetching subscriptions:', error);
            });

        console.log('Logging in with:', { email, password });
    };

    return (
        <div className='column mobile-container m0 pd20 aiCenter jfCcenter'>
            <LoginTitle>로그인</LoginTitle>
            <LoginSubTitle>서비스 이용을 위하여 로그인 해주세요.</LoginSubTitle>
            <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>
                <div>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="이메일"
                        className="long-input-field"
                        aria-label='이메일 입력 필드'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="비밀번호"
                        className="long-input-field"
                        aria-label='비밀번호 입력 필드'
                    />
                </div>
                <button type="submit" className="long-black-button" style={{marginTop:'50px'}}>로그인</button>
            </form>
            <LoginOptionsWrapper>
                <LoginOptionsLink onClick={() => navigate('/findId')} >아이디 찾기</LoginOptionsLink>
                <span>|</span>
                <LoginOptionsLink onClick={() => navigate('/findPassword')}>비밀번호 찾기</LoginOptionsLink>
                <span>|</span>
                <LoginOptionsLink onClick={() => navigate('/signup')}>회원가입</LoginOptionsLink>
            </LoginOptionsWrapper>
        </div>
    );
}