import React, { useEffect } from 'react';

const KakaoAdFit = ({ adType }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
        script.async = true;
        document.body.appendChild(script);
        console.log(adType)

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            {adType === 1 && (
                <ins
                    className="kakao_ad_area"
                    style={{ display: 'none' }}
                    data-ad-unit="DAN-2LQytWC5DIiifh3N"
                    data-ad-width="320"
                    data-ad-height="100"
                />
            )}
            {adType === 2 && (
                <ins
                    className="kakao_ad_area"
                    style={{ display: 'none' }}
                    data-ad-unit="DAN-zuzxRmoWnjvO6oLm"
                    data-ad-width="300"
                    data-ad-height="250"
                />
            )}
        </div>
    );
};

export default KakaoAdFit;
