import React,{useState} from 'react'

export default function GameIntroModal(){

    const [show, setShow] = useState(true)
  
  return (
    <>
    { show ? 
     <div id='intro-modal-container'>
        <h1 className='heading-txt'> Welcome To Windmill Spinner</h1>
        <h1 className='small-txt'> Your goal is to spin the windmill as fast as possible</h1>
        <h1 className='small-txt'> The windmill generates electricity as it spins</h1>
        <h1 className='small-txt'>Spend electricity to buy items and upgrades</h1>
        <button className='med-txt btn ' onClick={() => setShow((show) => !show)}> Im Ready </button>
     </div>
     : null
    }
   </>
  )
}