import React from 'react'

const InputContainer = ({ onChangeText, placeholder, statevalue }) => {

  const HandleChange = (e) => {

    onChangeText(e.target.value);
  };
  return (
    <input
      className='w-full h-10 rounded-md outline-none border border-third shadow-md px-4 text-lg font-semibold font-sans bg-secondary'
      type="text"
      placeholder={placeholder}
      value={statevalue}
      onChange={HandleChange}>
    </input>
  )
}

export default InputContainer