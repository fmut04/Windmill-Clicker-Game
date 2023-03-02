import React, { Component } from 'react';
import ElectricityText from "./ElectricityText";

class WindMill extends Component {

  constructor(props) {
    super(props);
    this.updateWatts = this.props.updateWatts
    this.resourcesMined = this.props.resourcesMined
    this.interval=undefined;
    this.state = {
      totalResources: 10,
      currentResources: 10,
      canHarvest: true,
      shouldReset: false,
      velocity: 0,
    };
  }

  handleResourceDepleted() {
    this.setState({
      currentResources: 0,
      canHarvest: false,
      totalResources: this.state.totalResources * 1.5,
    });
    setTimeout(() => {
      this.setState({ shouldReset: true });
    }, 500);
  }

  accelerateFan = (acceleration) => {
    
    //if (!this.state.canHarvest) return;
    // If no harvest amount is passed in, that means it is an auto eps harvest 
    // so the harvest amount is set to the eps
    acceleration ??= this.props.eps/600
    this.setState({
        velocity: this.state.velocity + this.getAcceleration(acceleration) 
    })
  };

  getAcceleration(force) {
    let constantDivisor = 15
    return force/constantDivisor
  }

  getDeceleration(velocity) {
    if(velocity===0) {return 0}
    let deceleration = velocity*.001
    return velocity-deceleration>=0 ? deceleration: velocity-deceleration
  }

  acceleratedVelocity(speed) {
    return this.state.velocity + speed
  }

  componentDidUpdate() {
    if (this.state.shouldReset) {
      this.setState({
        currentResources: this.state.totalResources,
        canHarvest: true,
        shouldReset: false,
      });
    }
  }

   getVelocity(obj) {
    return obj.state.velocity
  }

  rotateFan(fan) {  
    this.degree = 0;
    this.timer=0
      function rotate(degree, getVelocity, getDeceleration, obj, timer) {
      fan.style.transform = 'rotate(' + degree + 'deg)'
       setTimeout(() => {
          timer++
          if(timer>=75) {
            if(obj.state.velocity>0) {
            obj.updateWatts(obj.state.velocity/4)
            }
            timer=0
          }
          degree+=getVelocity(obj);
          rotate(degree, getVelocity, getDeceleration, obj, timer);
          obj.setState({
            velocity: obj.state.velocity - getDeceleration(getVelocity(obj)) + obj.getAcceleration(obj.props.eps/600),
          })
      },1); //lower this to increase speed 
  }
  rotate(this.degree, this.getVelocity, this.getDeceleration, this, this.timer)
}

  componentDidMount() {
    //  this.interval = setInterval(() => {
    //   this.accelerateFan();
    // }, 1000);
    this.rotateFan(document.getElementsByClassName('wind-mill-fan')[0],5)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.timer)
  }

  render() {
    return (
      <>
        <div className="center-items" id="wind-mill-container">
          <img
            className="wind-mill"
            src={
             "/icons/windmill.png"
            }
            alt="broken img"
            style={{
              width: `${15}rem`,
            }}
            onClick={() => {
              this.accelerateFan(this.props.clickPower);
            }}
          ></img>
             <img
            className="wind-mill-fan fan-rotate"
            src={
             "/icons/windmill-fan.png"
            }
            alt="broken img"
            style={{
              width: `${15}rem`,
            }}
            onClick={() => {
              this.accelerateFan(this.props.clickPower);
            }}
          ></img>
          <h1>
          <ElectricityText
          text = {this.state.velocity.toFixed(1)}
          styles = {{div: "no-margin med-spacing", text: "right-aligned small-pad-left", icon: "med-electricity med-pad-left"}}
          endText = {"/s"}
          />
            {/* {(
              this.state.velocity
            ).toFixed(1) + " m/s"} */}
          </h1>
        </div>
      </>
    );
  }
}

export default WindMill;
