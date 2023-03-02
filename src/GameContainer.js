import React from "react";
import WindMill from "./WindMill";
import GameIntroModal from "./GameIntroModal";
import HelperDisplayBar from "./HelperDisplayBar";
import ElectricityText from "./ElectricityText";
function GameContainer({totalWatts,updateWatts,clickPower,eps,shopData}) {


return( 
    <div className="grid-div" id="center-div">

    <ElectricityText
    text = {totalWatts}
    styles = {{icon: "large-electricity med-pad-left"}}
    />
    
    {/* <h1 id="eps"> Constant Velocity: {eps} m/s</h1> */}

    <GameIntroModal/>
    <WindMill
      updateWatts= { updateWatts}
      clickPower={clickPower}
      eps={eps}
    />

    <HelperDisplayBar
    shopData={shopData}
    />
  </div>
)
}
export default GameContainer