import { useEffect } from 'react';

export default function KakaoShare({ title, content, THU, link }) {
    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init('7771b77e241269433b52a22a92528b7e'); // Kakao 초기화
        }
    }, []);

    const kakaoButton = () => {

        if (sessionStorage.getItem('authToken')) {

            if (window.Kakao) {
                window.Kakao.Share.sendCustom({
                    templateId: 113405,
                    templateArgs: {
                        title, link, content, THU
                    },
                });
            }
        }
        else {
            alert('로그인 후 사용할 수 있는 기능입니다.');
            return false;
        }
    };

    return (
        <button
            id='kakaotalk-sharing-btn'
            className='shareButton'
            style={{ marginLeft: "auto" }}
            onClick={kakaoButton}
        >
            공유 &nbsp; <i className="bi bi-share" />
        </button>
    );
}
