import PropTypes from 'prop-types'
import React from 'react'

const InputField = ({ handleChange, name, label, type, value }) => (
    <div className="input-field">
        <input required onChange={(event) => handleChange(event.target.value)} value={value} name={name} type={type} id={name} />
        <label htmlFor={name}>{label}</label>
        <span></span>
    </div>
)

InputField.propTypes = {
    handleChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
}

export default InputField
