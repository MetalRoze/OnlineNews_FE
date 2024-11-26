import React from "react";

export default function Radio({ children, value, name, defaultChecked, disabled }) {
    return (
        <label>
            <input
                type="radio"
                value={value}
                name={name}
                defaultChecked={defaultChecked}
                disabled={disabled}
            />
            {children}
        </label>
    );
}
