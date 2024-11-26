import React, { useState, useEffect } from 'react';

const KakaoAdFit = () => {
    const [adError, setAdError] = useState(false);  // 광고 로드 오류 상태

    useEffect(() => {
        // 광고 스크립트 로드
        const script = document.createElement("script");
        const ins = document.createElement("ins");

        ins.className = 'kakao_ad_area';
        ins.setAttribute('style', 'display: none;');
        script.async = true;
        script.type = 'text/javascript';
        script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
        ins.setAttribute('data-ad-unit', 'DAN-2LQytWC5DIiifh3N');
        ins.setAttribute('data-ad-width', '320');
        ins.setAttribute('data-ad-height', '100');

        script.onload = () => {
            console.log("광고 스크립트 로드 성공");
            setAdError(false);
        };

        script.onerror = () => {
            console.error("광고 스크립트 로드 실패");
            setAdError(true);
        };

        let parent = document.getElementById('adFit');
        parent?.appendChild(ins);
        parent?.appendChild(script);

        // Clean up on component unmount
        return () => {
            if (parent) {
                parent.innerHTML = '';
            }
        };
    }, []);

    return (
        <div id="adFit">
            {adError && <p>광고 로드 실패</p>}
        </div>
    );
};

export default KakaoAdFit;
