import React, { Component } from 'react'
import { withAuth } from "../../../lib/AuthProvider"
import { Link } from "react-router-dom";
import "./Login.css"

class Login extends Component {
    state = { username: "", password: "" };

    handleFormSubmit = event => {
      event.preventDefault();
      const { username, password } = this.state;
      this.props.login({ username, password })
      console.log('Login -> form submit', { username, password });
    };
  
    handleChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };
  
    render() {
      const { username, password } = this.state;
  
      return (
        <div className="login">
          <div className="login-background"></div>
          <div className="auth-background"><div></div></div>
        <img
        id="auth-back"
          onClick={() => this.props.history.push("/")}
          src="https://img.icons8.com/metro/52/000000/back.png"
          alt=""
        />
          <h1>Login</h1>
  
          <form onSubmit={this.handleFormSubmit}>
            
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange}/>
  
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
  
            <input type="submit" id="login-btn" className="yellowbutton" value="Login" />
          </form>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      );
    }
}

export default withAuth(Login)