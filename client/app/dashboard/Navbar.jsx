import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this)
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  logOut() {
    localStorage.clear()
    location.href = '#/login/'
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const name = window.localStorage.name;
    const surname = window.localStorage.surname;

    return (
    <div className="top_nav">
      <div className="nav_menu">
        <nav>
          <div className="nav toggle">
            <a onClick={this.toggleNav}
             id="menu_toggle"><i className="fa fa-bars"></i></a>
          </div>

          <ul className="nav navbar-nav navbar-right">
            <li className="">
              <a href="javascript:;" className="user-profile dropdown-toggle"
              data-toggle="dropdown" aria-expanded="false">
                {surname} &nbsp;
                <span className=" fa fa-angle-down"></span>
              </a>
              <ul className="dropdown-menu dropdown-usermenu pull-right">
                <li><a onClick={this.logOut}>
                  <i className="fa fa-sign-out pull-right"></i>
                Log Out</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    )
  }

}

export default Navbar;
