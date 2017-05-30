import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

import config from '../sharedFiles/Config.jsx';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    // state
    this.state = {
      error: 'noError',
      userInfo: {},
    };

    // bind the functions to this
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.RenderForm = this.RenderForm.bind(this);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // handle form change and pass it to the state so as to send it to the server
  handleChange(key) {
    return function (e) {
      // set state acording to the string passed from the inputs
      var state = {};
      state[key] = e.target.value;
      // set state
      this.setState(state);
    }.bind(this);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // take the form data from the state and send them to the server.
  // the response is then handled by the handleResponse function
  onSubmitForm() {
    // format the form data from state
    var formData = {
      "email": this.state.email,
      "password": this.state.password
    };

    // make the server request
    axios({

      method: 'post',
      url: config.API + '/users/login',
      headers: {'Content-Type': 'application/json'},
      data: formData

    }).then((response) => {
      // set state with the error
      this.setState({userInfo: response.data.userInfo});
      this.setState({error: response.data.error});

      this.handleResponse(response.data);

    }).catch((error) => $.notify(error, "error"));
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // desplays the message returned from the server and if successfull
  // saves the user info and the token for later use
  handleResponse(response) {
    // check the error variable from the response
    if (response.error !== 'noErrors') {
      $.notify(response.message, "error");
    } else {
      // if no error store his info and the token to localStorage
      $.notify(response.message, "success");
      // save info to localStorage for later use
      window.localStorage.setItem('name',response.userInfo[0].name);
      window.localStorage.setItem('surname',response.userInfo[0].surname);
      window.localStorage.setItem('id',response.userInfo[0].id);
      window.localStorage.setItem('token',response.token);
      location.href = '/#/dashboard/properties'
    }
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // renders the login component
  render() {
    return (
      <div className="row">
        <div className="col-xs-offset-3 col-xs-6
        col-md-offset-4 col-md-4 col-lg-offset-4 col-lg-4">
          <div className="animate form login_form">
            <section className="login_content">
              <form>
                <img className="logo-dashboard"
                src="./client/public/images/roomier-logo.png"/>
                { this.RenderForm() }
                <div>
                  <a onClick={this.onSubmitForm}
                  className="login_submit btn btn-default submit">
                  Log in</a>
                </div>

                <div className="clearfix"></div>

                <div className="separator">
                  <div className="clearfix"></div>
                  <br/>
                  <div>
                    <p>©2016 All Rights Reserved.</p>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // renders the form
  RenderForm(){
    return(
      <div>
        <div>
          <input type="text" name="email"
          onChange={this.handleChange('email')}
          className="form-control"
          placeholder="E-mail" required=""/>
        </div>
        <div>
          <input type="password" name="password"
          onChange={this.handleChange('password')}
          className="form-control"
          placeholder="Password" required=""/>
        </div>
      </div>
    )
  }
}

// export the component
export default LoginForm;
