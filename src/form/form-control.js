import React from "react";
import Input from "./input";

function FormControl({ type }) {
    const controls = {
      text_field: Input
    };

    const Control = controls[type] || Input;

    return (
        <div className="form-group">
            <Control />
        </div>
    );
}

export default FormControl;