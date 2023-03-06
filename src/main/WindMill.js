import React, { Component } from 'react';
import WindMillRenderer from './WindMillRenderer';

class WindMill extends Component {

  constructor(props) {
    super(props);
    this.interval=undefined;
    this.state = {
      velocity: 0,
      prevUpdateTime: Date.now()
    };
  }

  accelerateFan = (acceleration) => {
    this.setState({
        velocity: this.state.velocity + this.getAcceleration(acceleration) 
    })
  };

  getAcceleration(force) {
    const constantDivisor = 15
    return force/constantDivisor
  }

  getDeceleration = (velocity) => {
    if(velocity.toFixed(2)<=0) return 0
   // console.log(velocity)
    let deceleration = velocity*.002
    return velocity-deceleration>=0 ? deceleration : velocity
  }

  // decelerates velocity and then returns the value as a promise
  decelerateVelocity = () => {
    const newVelocity = this.state.velocity - this.getDeceleration(this.state.velocity)
    return new Promise(resolve => {
      this.setState({ velocity: newVelocity }, () => {
        resolve(newVelocity);
      });
    });
  }  

  async rotate(fan, newDegrees) {
  fan.style.transform = `rotate(${newDegrees}deg)`;

    // eps is the base velocity and deceleratedVelocity() lowers the state of velocity and returns its value
    const totalVelocity = this.props.eps + await this.decelerateVelocity();

    const now = Date.now();
    const timeElapsed = now - this.state.prevUpdateTime;

    // this code runs every quarter second that elapses
    // this makes the watt updates more smooth
    if (timeElapsed >= 250) {
    const watts = totalVelocity * .25;
    this.props.updateWatts(watts);
    this.setState({
      prevUpdateTime: now
  });
  }
  requestAnimationFrame(() => {
    this.rotate(fan, newDegrees + totalVelocity,);
  });
}

  componentDidMount() {
    this.rotate(document.getElementsByClassName('wind-mill-fan')[0], 0)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.timer)
  }

  render() {
    return (
        <WindMillRenderer
        clickPower={this.props.clickPower}
        accelerateFan={this.accelerateFan}
        velocity={this.state.velocity + this.props.eps}
        />
    );
  }
}

export default WindMill;
