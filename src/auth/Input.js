import React from 'react'

export default function Input({stateName,placeholder,changeState}) {
  return (
    <input
        className="textbox"
        placeholder= {placeholder}
        onChange={(e) => {
            changeState(stateName,e.target.value )
        }}
      ></input>
  )
}

