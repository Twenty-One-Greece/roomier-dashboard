import React from 'react';
import RegisterForm from './login/RegisterForm.jsx';
import LoginForm from './login/LoginForm.jsx';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    location.href = "/#/login"
  }

  render() {
    return (
      <div className="">
        <a className="hiddenanchor" id="signup"></a>
        <a className="hiddenanchor" id="signin"></a>
        <div className="login_wrapper">

          {this.props.children}

        </div>
      </div>
    );
  }

}

export default Login;
