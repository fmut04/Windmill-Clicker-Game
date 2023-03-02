import React from "react";
import ElectricityText from "../ElectricityText";

function Helper({title,upgradesClick,eps,description, cost}) {

    return (
      <div id="helper-container">
    
          <div className="flex-space-between"> 
          <h2 className="block upgrade-title">{title}</h2>
          <div className="desc-txt">
          <ElectricityText
          text = {eps/10}
          styles = {{div: "no-margin med-spacing", text: "right-aligned desc-txt small-pad-left", icon: "small-electricity"}}
          endText = {"/s"}
          />
          </div>
          </div>
          <div className="upgrade-img-dsc-container">
            <img src={`/icons/${title}.png`} alt="placeholder" className="small-icons"/>
            <h3 className="desc-txt">{description}</h3>
            <button
        className="btn flex-jstfy-cent"
        onClick={() => {
          upgradesClick(title,cost,eps);
        }}
      >
       <ElectricityText
       text={cost}
       styles = {{div: "no-margin", text: "upgrade-btn-txt", icon: "med-electricity"}}
       />
      </button>
          </div>
  
   
      </div>
    );
}

export default Helper;













