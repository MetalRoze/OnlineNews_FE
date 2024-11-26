import React from "react";

export default function RadioGroup({ label, children, onChange }) {
    const handleChange = (event) => {
        if (onChange) {
            onChange(event); // 변경 이벤트 전달
        }
    };

    return (
        <fieldset onChange={handleChange}>
            {label && <legend>{label}</legend>}
            {children}
        </fieldset>
    );
}
