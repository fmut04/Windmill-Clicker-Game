import React from 'react'

export default function HelperDisplayBar({shopData}) {

    function renderHelperIcon(key,helpersActive) {
        return (
            <div className='small-margin center-items' key={key}>
                <img 
                src={ `/icons/${key}.png`} 
                alt={key}
                className={"large-icons"}
                />    
                 <h2 className='small-txt green'>{helpersActive}</h2>
            </div>
        )
    }
   
    function createHelperDisplayBar(shopData) {
        let helperDisplay = []
        for(let key in shopData) {
          if(shopData[key].eps)
          helperDisplay.push(renderHelperIcon(key,shopData[key].numActive))
        }
        return helperDisplay
      }
  return (
    <div className='flex-jstfy-cent '>
    {createHelperDisplayBar(shopData)}
    </div>
  )
}
