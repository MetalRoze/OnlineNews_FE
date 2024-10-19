import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // 로그인 처리 로직
        console.log('Logging in with:', { email, password });
    };

    // 스타일 객체
    const styles = {
        container: {
            minHeight: '100vh',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--color-white)',
        },
        heading: {
            marginBottom: '10px',
            textAlign: 'center',
        },
        subHeading: {
            fontSize: '16px',
            marginBottom: '20px',
            textAlign: 'center',
            color: 'var(--color-black)',
            paddingBottom: '20px',
        },
        loginOptions: {
            marginTop: '20px',
            textAlign: 'center',
        },
        loginLink: {
            margin: '0 10px',
            cursor: 'pointer',
            color: 'var(--color-primary)', // 필요한 경우 링크 색상 설정
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>로그인</h1>
            <p style={styles.subHeading}>서비스 이용을 위하여 로그인 해주세요.</p>
            <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="이메일"
                        className="long-input-field"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="비밀번호"
                        className="long-input-field"
                    />
                </div>
                <button type="submit" className="long-black-button" style={{marginTop:'50px'}}>로그인</button>
            </form>
            <div style={styles.loginOptions}>
                <span onClick={() => navigate('/find-id')} style={styles.loginLink}>아이디 찾기</span>
                <span>|</span>
                <span onClick={() => navigate('/find-password')} style={styles.loginLink}>비밀번호 찾기</span>
                <span>|</span>
                <span onClick={() => navigate('/signup')} style={styles.loginLink}>회원가입</span>
            </div>
        </div>
    );
}