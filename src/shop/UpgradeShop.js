import React from "react"
import Upgrade from "./Upgrade"
function UpgradeShop({multEps, getTotalWatts, updateTotalWatts, multClickPower, shopData, updateShopData}) {

    return  ( 
      <>
    <h1>Upgrades</h1>
    <div className="upgrade-buttons-container">

    <Upgrade
      title="Click Power"
      upgradeMult={2}
      description = "Clicks spin the windmill twice as fast" 
      cost={shopData["clickPower"].cost}
      upgradeClick={(cost,upgradeMult,title) => handleUpgradeClick(cost,upgradeMult,title)}
    />

    <Upgrade
      title="Item Strength"
      description = "Items spin the windmill twice as fast" 
      upgradeMult={2}
      cost={shopData["wps"].cost}
      upgradeClick={(cost,upgradeMult,title) => handleUpgradeClick(cost,upgradeMult,title)}
    />

    </div>
    </>
    )

    function handleUpgradeClick(cost,upgradeMult,title) {
      if(getTotalWatts()-cost<0) return false
      updateTotalWatts(cost*-1)
      // Upgrades either the helper or hit strength depending on the component title
      title === "Item Strength" ? multEps(upgradeMult) : multClickPower(upgradeMult)
      updateShopData(title,{cost: cost})
      return true
    }
}

export default UpgradeShop