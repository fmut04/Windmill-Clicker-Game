import React from "react";
import Axios from "axios";
import AuthRenderer from "./AuthRenderer";

class Authentication extends React.Component {

  constructor({ getGameInfo, setGameInfo, setLoggedIn }) {
    super()
    this.backendUrl = "https://windmill-spinner-backend.onrender.com"
    this.getGameInfo = getGameInfo
    this.setGameInfo = setGameInfo
    this.setLoggedIn = setLoggedIn
    this.state = {
      usernameReg: "",
      passwordReg: "",
      usernameLogin: "",
      passwordLogin: "",
      loginState: "notLoggedIn",
      prevWatts: 0,
      errorCode: undefined
    }
  }

  changeState(key,val) {
    this.setState({ [key]: val});
  }
   
   register = () => {
    this.setState({
      loginState: "loggingIn"
    })
    Axios.post(`${this.backendUrl}/create-user`, {
      username: this.state.usernameReg,
      password: this.state.passwordReg,
      gameInfo: this.getGameInfo(),
    }).then(() => {
      console.log("registered")
      this.setState({
        loginState: "loggedIn"
      })
      this.setLoggedIn()
    }).catch((error) => {
      this.setState({
        errorCode: error.response.status
      })
    });

  };

   saveInfo = () => {
    if(!this.state.loginState == "isLoggedIn") return 
    const currGameInfo = this.getGameInfo()
    if(currGameInfo.totalWatts===this.state.prevWatts) return
    Axios.post(`${this.backendUrl}/save-data`, {
      username: this.state.usernameLogin,
      password: this.state.passwordLogin,
      gameInfo: currGameInfo,
    }).then(() => {
      console.log("Auto Save")
      this.changeState('prevWatts',currGameInfo.totalWatts)
    });
  }

   login = () => {
    this.setState({
      loginState: "loggingIn"
    })
    Axios.post(`${this.backendUrl}/login`, {
      username: this.state.usernameLogin,
      password: this.state.passwordLogin,
    }).then((response) => {
      this.setState({
        loginState: "isLoggedIn"
      })
      this.setLoggedIn()
      this.setGameInfo(response.data)
    }).catch((error) => {
      this.setState({
        errorCode: error.response.status
      })
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
    !this.state.isLoggedIn == "isLoggedIn" ? 
    <AuthRenderer
    changeState = {(key,val) => this.changeState(key,val)}
    register= {this.register}
    login={this.login}
    errorCode={this.state.errorCode}
    loginState={this.state.loginState}
    />
    : null
    }
    </>
  )}
}

export default Authentication;
