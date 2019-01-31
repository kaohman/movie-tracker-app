import React from 'react'

const buildInput = (type, handleChange) => {
  return (
    <label key={type}>{type}
      <input
        required
        name={type}
        type={type}
        onChange={handleChange} />
    </label>
  )
}

export default buildInput