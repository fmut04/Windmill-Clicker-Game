import React from "react";
import Axios from "axios";
import AuthRenderer from "./AuthRenderer";

class Authentication extends React.Component {

  constructor({ getGameInfo, setGameInfo, setLoggedIn }) {
    super()
    this.getGameInfo = getGameInfo
    this.setGameInfo = setGameInfo
    this.setLoggedIn = setLoggedIn
    this.state = {
      usernameReg: "",
      passwordReg: "",
      usernameLogin: "",
      passwordLogin: "",
      isLoggedIn: false,
      prevWatts: 0
    }
  }

  changeState(key,val) {
    this.setState({ [key]: val});
  }
   
   register = () => {
    Axios.post("https://windmill-spinner-backend.onrender.com/create-user", {
      username: this.state.usernameReg,
      password: this.state.passwordReg,
      gameInfo: this.getGameInfo(),
    }).then(() => {
      console.log("registered")
      this.setState({
        isLoggedIn: true
      })
      this.setLoggedIn()
    }).catch(() => {
      console.log("Username taken, please try again.")
    });

  };

   saveInfo = () => {
    if(!this.state.isLoggedIn) return 
    const currGameInfo = this.getGameInfo()
    if(currGameInfo.totalWatts===this.state.prevWatts) return
    Axios.post("https://windmill-spinner-backend.onrender.com/save-data", {
      username: this.state.usernameLogin,
      password: this.state.passwordLogin,
      gameInfo: currGameInfo,
    }).then(() => {
      console.log("Auto Save")
      this.changeState('prevWatts',currGameInfo.totalWatts)
    });
  }

   login = () => {
    Axios.post("https://windmill-spinner-backend.onrender.com/login", {
      username: this.state.usernameLogin,
      password: this.state.passwordLogin,
    }).then((response) => {
      this.setState({
        isLoggedIn: true
      })
      this.setLoggedIn()
      this.setGameInfo(response.data)
    }).catch(() => {
      console.log("Incorrect Username or Password")
    })
  };

      componentDidMount() {
          this.interval = setInterval(this.saveInfo, 10000);
       }
       componentWillUnmount() {
         clearInterval(this.interval);
       }

  render() {
    return(
    <>
    { 
    !this.state.isLoggedIn ? 
    <AuthRenderer
    changeState = {(key,val) => this.changeState(key,val)}
    register= {this.register}
    login={this.login}
    />
    : null
    }
    </>
  )}
}

export default Authentication;
