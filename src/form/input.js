import React from "react";

function Input({ type, value, name, placeholder, handleChange }) {
    return (
        <input className="form-control" type={type} value={value} name={name} placeholder={placeholder} onChange={handleChange} />
    )
}

export default Input;