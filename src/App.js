import * as React from "react";
import Shop from "./shop/Shop.js"
import GameContainer from "./GameContainer.js";
import Authentication from "./Authentication.js";
class App extends React.Component {
    state = {
      // the user's total electricity, the currency in this game
      totalWatts: 0,
      // eps stands for electricty per second. like dps 
      eps: 0,
      // click power determnines how fast each click spins the windmill
      clickPower: 1,
      // Stores the data for the items and the upgrades purchasable
      shopData: {"Fan": {cost: 5, eps: 1, numActive: 0, description: "It's like a mini windmill"}, "Leaf Blower": {cost: 50 , eps: 5, numActive: 0, description: "Loud and powerful"},
       "Rocket": { cost: 2000 ,eps: 200, numActive: 0, description: "This might be overkill" },
      "clickPower": {cost: 10, numActive: 0}, "wps":  {cost: 20, numActive: 0}},
      // if user is not logged in an authentication component will be visible
      isLoggedIn: false,
    };

  render() {
    return (
      
      <div id="body">
        <img src="/icons/sunset-bkg-3.png" id="background-img" alt="img not loading"></img>

        <Authentication
          getGameInfo={this.getGameInfo.bind(this)}
          setGameInfo={(info) => this.setGameInfo(info)}
          setLoggedIn={() => {this.setLoggedIn()}}
        />

         <GameContainer
            totalWatts={this.state.totalWatts}
            updateWatts={(wattsGained) => this.updateWatts(wattsGained)}
            clickPower={this.state.clickPower}
            eps={this.state.eps}
            shopData={this.state.shopData}
          />
          
        <Shop
          incrementEps = {(increment) => this.incrementEps(increment)}
          getTotalWatts = {() => this.getTotalWatts()}
          updateTotalWatts = {(cost) => this.updateWatts(cost)}
          getEps = {() => this.state.eps}
          multClickPower= {(multFactor) => this.multClickPower(multFactor)}
          updateShopData = {(title,newData) => this.updateShopData(title,newData)}
          shopData = {this.state.shopData}
          setShopPanelState = {(stateBool) => this.setShopPanelState(stateBool)}
        />
       
      </div>
    );
  }

  updateShopData = (title, newData) => {
     let new_dict = this.state.shopData
      for(var key in new_dict) {
        if(key===title) new_dict[key] = newData
      }
      this.setState({shopData: new_dict}); // set state to new object with updated list
   }


  incrementEps(increment) {
    this.setState({
      eps: this.state.eps + increment
    });
  }

  updateWatts(wattsToUpdate) {
    //console.log(typeof wattsToUpdate)
    this.setState({
      totalWatts: +(this.state.totalWatts + wattsToUpdate).toFixed(2)
    })
  }

  multClickPower(multFactor) {
    this.setState({
      clickPower: this.state.clickPower * multFactor
    })
  }
  getTotalWatts() {
    return this.state.totalWatts
  }

  setLoggedIn() {
    this.setState({
      isLoggedIn: true
    })
  }

  setShopPanelState(stateBool) {
    this.setState({
      shopPanelActive: stateBool
    })
  }
 
  getGameInfo() {
    console.log("getting info", this.state.totalWatts)
    return {
      totalWatts: this.state.totalWatts,
      eps: this.state.eps,
      clickPower: this.state.clickPower,
      shopData: this.state.shopData
    };
  }

  setGameInfo({totalWatts,eps,clickPower,shopData}) {
    console.log(totalWatts,eps,clickPower,shopData)
    this.setState({
      totalWatts: totalWatts,
      eps: eps,
      clickPower: clickPower,
      shopData: shopData
    });
  }
}

export default App;
