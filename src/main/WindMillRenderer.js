import React from 'react'
import ElectricityText from './ElectricityText'

export default function WindMillRenderer({clickPower, accelerateFan, velocity}) {
  return (
    <div className="center-items" id="wind-mill-container">
          <img
            className="wind-mill"
            src={
             "/icons/windmill.png"
            }
            alt="broken img"
            style={{
               width: "15rem",
            }}
            onClick={() => accelerateFan(clickPower)}
          ></img>
             <img
            className="wind-mill-fan fan-rotate"
            src={
             "/icons/windmill-fan.png"
            }
            alt="broken img"
            style={{
              width: "15rem",
            }}
            onClick={() => accelerateFan(clickPower)}
          ></img>
          <ElectricityText
          text = { velocity >= .1 || velocity<=.01 ? velocity.toFixed(1): velocity.toFixed(2)}
          styles = {{div: "small-margin-top med-spacing", text: "right-aligned small-pad-left small-margin-top", icon: "med-electricity med-pad-left"}}
          endText = {"/s"}
          />
        </div>
  )
}
