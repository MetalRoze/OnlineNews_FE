import React, { useEffect } from "react";

const GoogleAdvertise = ({
    className = "adsbygoogle",
    client = "",
    slot = "",
    format = "",
    responsive = "",
    layoutKey = ""
}) => {
    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            const existingAd = document.querySelector(`ins.${className}[data-ad-client="${client}"][data-ad-slot="${slot}"]`);
            if (!existingAd) {
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    console.log("Advertise is pushed");
                } catch (e) {
                    console.error("AdvertiseError", e);
                }
            }
        }
    }, [className, client, slot]);

    // 영역 미리보기
    if (process.env.NODE_ENV !== "production") {
        return (
            <div
                style={{
                    background: "#e9e9e9",
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "16px"
                }}
            >
                광고 표시 영역
            </div>
        );
    }

    // 광고 컴포넌트
    return (
        <ins
            className={className}
            style={{
                overflowX: "auto",
                overflowY: "hidden",
                display: "block",
                textAlign: "center"
            }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive}
            data-ad-layout-key={layoutKey}
        />
    );
};

export default GoogleAdvertise;
