import React, { Component } from "react";
import authService from "./services/auth-service";

const { Consumer, Provider } = React.createContext();

// HOC that creates Consumer/s
const withAuth = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {({ login, signup, user, logout, isLoggedIn, isLoading }) => {
            return (
              <WrappedComponent
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// Provider
class AuthProvider extends Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    user: null
  };

  login = userData => {
    const { username, password } = userData;

    authService
      .login({ username, password })
      .then(user => {
        this.setState({ isLoggedIn: true, user });
      })
      .catch(err => console.log(err));
  };

  signup = userData => {
    const { username, password, image } = userData;

    authService
      .signup({ username, password, image })
      .then(user => {
        this.setState({ isLoggedIn: true, user });
      })
      .catch(err => console.log(err));
  };

  logout = () => {
    authService
      .logout()
      .then(() => {
        this.setState({ isLoggedIn: false, user: null });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    authService
      .me()
      .then(user => {
        this.setState({ isLoggedIn: true, isLoading: false, user: user });
      })
      .catch(err =>
        this.setState({ isLoggedin: false, user: null, isLoading: false })
      );
  }

  render() {
    const { isLoading, isLoggedIn, user } = this.state;
    const { login, signup, logout } = this;

    return (
      <div>
        {false ? ( //isLoading but only in Loading
          <h1>Loading</h1>
        ) : (
          <Provider
            value={{ isLoading, isLoggedIn, user, login, signup, logout }}
          >
            {this.props.children}
          </Provider>
        )}
      </div>
    );
  }
}

export { Consumer, withAuth };

export default AuthProvider;
