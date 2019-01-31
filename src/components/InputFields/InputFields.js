import React from 'react'

const buildInputField = ({ type, value, handleChange }) => {
  return (
    <label key={type}>{type}
      <input
        required
        name={type}
        type={type}
        onChange={handleChange}
        value={value[type]} />
    </label>
  )
}

export default buildInputField