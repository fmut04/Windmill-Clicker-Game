import React from 'react'
import Input from './Input'

export default function AuthRenderer({changeState,register,login}) {
  return (
<div className="grid-div" id="left-div">
      <h1>Sign Up</h1>

        <Input
        stateName="usernameReg"
        placeholder={"Username.."}
        changeState={changeState}
        />
  

    <Input
        stateName="passwordReg"
        placeholder={"Password.."}
        changeState={changeState}
        />

      <button className="btn auth-btn" onClick={() => register()}>Enter</button>
      <h1>Login</h1>

      <Input
        stateName="usernameLogin"
        placeholder={"Username.."}
        changeState={changeState}
        />
    
        <Input
        stateName="passwordLogin"
        placeholder={"Password.."}
        changeState={changeState}
        />
    
      <button className="btn auth-btn" onClick={() => login()}>Enter</button>
    </div>
  )
}
