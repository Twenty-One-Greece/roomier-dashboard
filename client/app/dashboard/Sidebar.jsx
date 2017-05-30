import React      from 'react';
import { Link }   from 'react-router';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="col-md-3 left_col">
      <div className="left_col scroll-view">
        <div className="navbar nav_title" style={{border : 0}}>
          <img className="logo-dashboard"
          src="./client/public/images/roomier-logo.png"/>
        </div>
        <div className="clearfix"></div>

        <br /><br />
        <div id="sidebar-menu"
        className="main_menu_side hidden-print main_menu">
          <div className="menu_section">

          </div>
          <div className="menu_section">
            <h3>Booking Engine</h3>
            <ul className="nav side-menu">
              <li><Link to={'dashboard/properties'}>
              <i className="fa fa-building"></i>
              Properties </Link></li>

              <li><Link to={'dashboard/calendar'}>
              <i className="fa fa-calendar"></i>
              Calendar </Link></li>

              <li><Link to={'dashboard/bookings'}>
              <i className="fa fa-users"></i>
              Bookings </Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Sidebar;
