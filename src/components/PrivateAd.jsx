import React, { useEffect } from 'react';
import ad1 from '../assets/ad1.png'
import ad2 from '../assets/ad2.png'

const PrivateAd = ({ adType = 'small' }) => {

    useEffect(() => {
    }, []);

    return (
        <div className='privateAd'>
            <a href="https://www.yu.ac.kr/main/index.do">
                <img src={ad2} alt="Advertisement 1" />
            </a>
            <a href="https://cse.yu.ac.kr/cse/index.do">
                <img src={ad1} alt="Advertisement 2" />
            </a>
        </div>
    );
};

export default PrivateAd;
