import React, { useEffect } from 'react';

const KakaoAdFit = ({ adType = 'small' }) => {

    useEffect(() => {
        const script = document.createElement("script");
        const ins = document.createElement("ins");

        ins.className = 'kakao_ad_area';
        ins.setAttribute('style', 'display: none;');
        script.async = true;
        script.type = 'text/javascript';
        script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
        if (adType === 'large') {
            ins.setAttribute('data-ad-unit', 'DAN-zuzxRmoWnjvO6oLm');  // 큰 광고
            ins.setAttribute('data-ad-width', '300');
            ins.setAttribute('data-ad-height', '250');
        } else {
            ins.setAttribute('data-ad-unit', 'DAN-2LQytWC5DIiifh3N');  // 작은 광고
            ins.setAttribute('data-ad-width', '320');
            ins.setAttribute('data-ad-height', '100');
        }

        script.onload = () => {
            console.log("광고 스크립트 로드 성공");
        };

        script.onerror = () => {
            console.error("광고 스크립트 로드 실패");
        };

        let parent = document.getElementById('adFit');
        parent?.appendChild(ins);
        parent?.appendChild(script);

        return () => {
            if (parent) {
                parent.innerHTML = '';
            }
        };
    }, []);

    return (
        <div id="adFit" />
    );
};

export default KakaoAdFit;
