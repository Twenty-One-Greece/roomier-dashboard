import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';

import config from '../sharedFiles/Config.jsx';

class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state={};

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
      this.setState(state);
    }.bind(this);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // when the form gets submited this functions send the data to the server
  onSubmitForm(e) {
    e.preventDefault();
    // extract these from state
    let newUserInfo = this.state;
    console.log(newUserInfo);

    // make the server request
    axios({

      method: 'post',
      url: config.API + '/users/register',
      headers: {'Content-Type': 'application/json'},
      data: newUserInfo

    }).then((response) => {

      if (response.data.error === 'noErrors') {
        location.href = '/#/login';
        $.notify(response.data.message, "success");
      } else $.notify(response.data.message, "error")

    }).catch((error) => $.notify(error, "error"));
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // renders the sin up component and calls the functions
  render() {
    return (
      <div className="row">
        <div className="col-xs-offset-3 col-xs-6
        col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4">
          <div id="register" className="animate">
            <section className="login_content">
              <form onSubmit={this.onSubmitForm}>
                <h1>Create Account</h1>

                <div className="clearfix"></div>

                {this.RenderForm()}

                <div className="separator">
                  <p className="change_link">
                  <Link to="login" className="to_register">
                    Click here to Log in
                  </Link>
                  </p>

                  <div className="clearfix"></div>
                  <br/>
                  <div>
                    <h1>Roomier!</h1>
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
          <input type="text"
          onChange={this.handleChange('name')}
          className="form-control" placeholder="Επωνυμία επιχείρησης"
          required="required"/>
        </div>
        <div>
          <input type="text"
          onChange={this.handleChange('surname')}
          className="form-control" placeholder="Ονομα και επίθετο υπευθύνου"
          required="required"/>
        </div>
        <div>
          <input type="text"
          onChange={this.handleChange('afm')}
          className="form-control" placeholder="ΑΦΜ"
          required="required"/>
        </div>
        <div>
          <input type="text"
          onChange={this.handleChange('doy')}
          className="form-control" placeholder="ΔΟΥ"
          required="required"/>
        </div>
        <div>
          <input type="text"
          onChange={this.handleChange('address')}
          className="form-control" placeholder="Διευθυνση"
          required="required"/>
        <div>
          <input type="text"
          onChange={this.handleChange('city')}
          className="form-control" placeholder="Πόλη"
          required="required"/>
        </div>
        <div>
          <input type="text"
          onChange={this.handleChange('country')}
          className="form-control" placeholder="Χώρα"
          required="required"/>
        </div>
        </div>
        <div>
          <input type="text"
          onChange={this.handleChange('phone')}
          className="form-control" placeholder="Τηλέφωνο σταθερό"
          required="required"/>
        </div>
        <div>
          <input type="text"
          onChange={this.handleChange('mobile')}
          className="form-control" placeholder="Τηλέφωνο κινητό"
          required="required"/>
        </div>
        <div>
          <input type="email"
          onChange={this.handleChange('email')}
          className="form-control" placeholder="Email"
          required="required"/>
        </div>
        <div>
          <input type="password"
          onChange={this.handleChange('password')}
          className="form-control" placeholder="Κωδικός πρόσβασης"
          required="required"/>
        </div>
        <div>
          <button type="submit"
          className="login_submit btn btn-default submit">
            Επιβεβαίωση
          </button>
        </div>
      </div>
    )
  }
}
// export RegisterForm
export default RegisterForm;
