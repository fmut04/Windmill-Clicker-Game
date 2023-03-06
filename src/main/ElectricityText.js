import React from 'react'

export default function ElectricityText({text,styles,endText}) {
  return (
    <div className={"flex-jstfy-cent " + styles?.div} id="electricity-txt-container">
    { text!==undefined && <h1 className={"no-margin " + styles?.text}>{text} </h1> }
    <img src="/icons/currency.png" className={styles?.icon} alt={"$"}></img>
    { endText!==undefined && <h1 className={"no-margin " + styles?.text}>{endText} </h1> }
    </div>     
  )
}
