import React from "react";

export default function RadioGroup({ label, children }) {
    return (
      <fieldset>
        <legend>{label}</legend>
        {children}
      </fieldset>
    );
  }