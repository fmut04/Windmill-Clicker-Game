import React from "react";
import ElectricityText from "../ElectricityText";

class Upgrade extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.upgradeClick = props.upgradeClick;
    this.cost = props.cost
    this.upgradeMult = props.upgradeMult
    this.description = props.description
  }
  render() {
    return (
      <div id="helper-container">
          <div className="flex-space-between"> 
          <h2 className="block upgrade-title">{this.title}</h2>
          </div>
          <div className="upgrade-img-dsc-container">
            {/* <h3 className=" med-txt desc-txt">{this.upgradeMult +"x"+this.description}</h3> */}
            <h3 className=" med-txt desc-txt">{this.description}</h3>
            <button
        className="btn inline small-btn"
        onClick={() => {
          this.upgradeClicked();
        }}
      >
         <ElectricityText
       text={this.cost}
       styles = {{div: "no-margin", text: "upgrade-btn-txt", icon: "med-electricity"}}
       />
      </button>
     </div>
     </div>
    );
  }

  upgradeClicked() {
  let didPurchase = this.upgradeClick(this.cost,this.upgradeMult, this.title)
   if(didPurchase) this.cost = (this.cost**2).toFixed(0)
}
}

export default Upgrade;
