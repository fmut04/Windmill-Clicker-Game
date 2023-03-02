import HelperShop from "./HelperShop"
import React, {useState} from "react"
import UpgradeShop from "./UpgradeShop"

function Shop({incrementEps, getTotalWatts, updateTotalWatts, getEps, multClickPower, shopData, updateShopData}) {
  const [epsMult, setEpsMult] = useState(1)
  function multEps(multiplier) {
    setEpsMult(d => d * multiplier)
    incrementEps((multiplier-1)*getEps())
  }

  //console.log('RENDERING')
    return  ( 
    <div className="grid-div" id="right-div">
      <div id="align-top">  
      <HelperShop
    incrementEps={incrementEps}
    getTotalWatts={getTotalWatts}
    updateTotalWatts={updateTotalWatts}
    epsMult = {epsMult}
    shopData= {shopData}
    updateShopData= {updateShopData}
        />
       <UpgradeShop
       multEps={multEps}
       multClickPower = {multClickPower}
       getTotalWatts={getTotalWatts}
       updateTotalWatts={updateTotalWatts}
       shopData={shopData}
       updateShopData={updateShopData}
       />

      </div>
 
    </div>
    )

      // function getUpgradeState() {
        
      // }

      // function getHelperState() {

      // }
}

export default Shop