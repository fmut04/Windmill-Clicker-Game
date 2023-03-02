import React from "react"
import Helper from "./Helper"
function HelperShop({incrementEps, getTotalWatts, updateTotalWatts, epsMult,shopData, updateShopData}) {

  function renderHelper(title,{cost,eps,description}) {
    return <Helper
      key={title}
      title={title}
      eps={eps * epsMult}
      cost={cost}
      description={description}
      upgradesClick={(title,cost,eps) => purchaseHelper(title, cost, eps, description)}
    />
  }

  function createHelperShop(shopData) {
    let helperContainer = []
    for(let key in shopData) {
      if(shopData[key].eps)
      helperContainer.push(renderHelper(key,shopData[key]))
    }
    return helperContainer
  }

    return  ( 
        <>
        <h1>Shop</h1>
        <div className="upgrade-buttons-container">
        { 
         createHelperShop(shopData)
        }
        </div>
        </>
        )    
        
    function purchaseHelper(title, cost, eps, description) {
      console.log(eps)
        if(getTotalWatts()<cost) return false
         updateShopData(title,{cost: (cost*2.2).toFixed(0), numActive: shopData[title].numActive+1, eps: eps, description: description})
         updateTotalWatts(cost*-1)
         incrementEps(eps)
         return true
     }
}

export default HelperShop