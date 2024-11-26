import { useEffect, useRef } from "react";

function KakaoAdFit({ unit, width, height, disabled }) {
    const scriptElementWrapper = useRef(null);

    useEffect(() => {
        if (!disabled) {
            const script = document.createElement("script");
            script.setAttribute("src", "https://t1.daumcdn.net/kas/static/ba.min.js");
            if (scriptElementWrapper.current) {
                scriptElementWrapper.current.appendChild(script);
            }

            return () => {
                const globalAdfit = window.adfit;
                if (globalAdfit) {
                    globalAdfit.destroy(unit);
                }
            };
        }
    }, [unit, disabled]);  // Adding unit and disabled as dependencies

    return (
        <div ref={scriptElementWrapper}>
            <ins
                className="kakao_ad_area"
                style={{ display: "none" }}
                data-ad-unit={unit}
                data-ad-width={width}
                data-ad-height={height}
            ></ins>
        </div>
    );
}

export default KakaoAdFit;
