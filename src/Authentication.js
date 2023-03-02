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
    }
  }

  changeState(key,val) {
    this.setState({ [key]: val});
  }
   
   register = () => {
    Axios.post("http://localhost:3001/create-user", {
      username: this.state.usernameReg,
      password: this.state.passwordReg,
      gameInfo: this.getGameInfo(),
    }).then(() => {
      this.setLoggedIn()
    });

  };

   saveInfo = () => {
    if(!this.state.isLoggedIn) return 
    Axios.post("http://localhost:3001/save-data", {
      username: this.state.usernameLogin,
      password: this.state.passwordLogin,
      gameInfo: this.getGameInfo(),
    }).then(() => console.log("Auto Save", this.getGameInfo()));
  }

   login = () => {
    Axios.post("http://localhost:3001/login", {
      username: this.state.usernameLogin,
      password: this.state.passwordLogin,
    }).then((response) => {
      this.setState({
        isLoggedIn: true
      })
      this.setLoggedIn()
      this.setGameInfo(response.data)}
  )};

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
    changeState = {(key,val) => this.state.changeState(key,val)}
    register= {this.register}
    login={this.login}
    />
   
    : null
    }
    </>
  )}
}

export default Authentication;
