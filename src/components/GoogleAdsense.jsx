import React, { useEffect } from 'react';

const GoogleAdsense = ({ adName }) => {
    const adConfigs = {
        AD560x300: {
            width: 560,
            height: 300,
            slot: "2798382368",
        },
        AD580x150: {
            width: 580,
            height: 150,
            slot: "1333229200",
        },
        AD560x150: {
            width: 560,
            height: 150,
            slot: "6802040701",
        },
    };

    const { width, height, slot } = adConfigs[adName] || {};

    useEffect(() => {
        const pushAd = () => {
            try {
                const adsbygoogle = window.adsbygoogle
                adsbygoogle.push({})
            } catch (e) {
                console.error(e)
            }
        }

        let interval = setInterval(() => {
            if (window.adsbygoogle) {
                pushAd()
                clearInterval(interval)
            }
        }, 300)

        return () => {
            clearInterval(interval)
        }
    }, [adName])

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "inline-block", width: `${width}px`, height: `${height}px`, backgroundColor: "var(--color-adsense)" }}
            data-ad-client="ca-pub-1978575396259591"
            data-ad-slot={slot}
        ></ins>
    );
};

export default GoogleAdsense;
