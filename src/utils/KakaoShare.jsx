import { useEffect } from 'react';

export default function KakaoShare({ title, content, THU, link }) {
    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init('7771b77e241269433b52a22a92528b7e'); // Kakao 초기화
        }
    }, []);

    const kakaoButton = () => {
        console.log('제목:', title);
        console.log('설명:', content);
        console.log('이미지 URL:', THU);
        console.log('링크 URL:', link);

        if (window.Kakao) {
            window.Kakao.Share.sendCustom({
                templateId: 113405,
                templateArgs: {
                    title, link, content, THU
                },
            });
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
