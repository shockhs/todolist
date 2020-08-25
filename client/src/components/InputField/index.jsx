import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ handleChange, name, label, type, value }) => (
    <div className="input-field">
        <input required onChange={(event) => handleChange(event.target.value)} value={value} name={name} type={type} />
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
