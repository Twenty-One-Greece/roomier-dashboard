import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import BackButton from '../../components/BackButton.jsx';


class Widgets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  render() {
    return(
      <div className="row">
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <h2 className="pageHeader">Special Offers of
              property: {this.props.params.propertyID}</h2>

              <div className="clearfix"></div>
            </div>
            <div className="x_content">

              <img style={{width: '60%'}} src="client/public/images/chart2.png" />



            </div>


                  <br />
                  <br />
                <div className="row">

                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="x_panel">
                      <div className="x_title">
                        <h2>Recent Activities <small>Sessions</small></h2>
                        <ul className="nav navbar-right panel_toolbox">
                          <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                          </li>
                          <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                            <ul className="dropdown-menu" role="menu">
                              <li><a href="#">Settings 1</a>
                              </li>
                              <li><a href="#">Settings 2</a>
                              </li>
                            </ul>
                          </li>
                          <li><a className="close-link"><i className="fa fa-close"></i></a>
                          </li>
                        </ul>
                        <div className="clearfix"></div>
                      </div>
                      <div className="x_content">
                        <div className="dashboard-widget-content">

                          <ul className="list-unstyled timeline widget">
                            <li>
                              <div className="block">
                                <div className="block_content">
                                  <h2 className="title">
                                                    <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
                                                </h2>
                                  <div className="byline">
                                    <span>13 hours ago</span> by <a>Jane Smith</a>
                                  </div>
                                  <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… <a>Read&nbsp;More</a>
                                  </p>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="block">
                                <div className="block_content">
                                  <h2 className="title">
                                                    <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
                                                </h2>
                                  <div className="byline">
                                    <span>13 hours ago</span> by <a>Jane Smith</a>
                                  </div>
                                  <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… <a>Read&nbsp;More</a>
                                  </p>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="block">
                                <div className="block_content">
                                  <h2 className="title">
                                                    <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
                                                </h2>
                                  <div className="byline">
                                    <span>13 hours ago</span> by <a>Jane Smith</a>
                                  </div>
                                  <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… <a>Read&nbsp;More</a>
                                  </p>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="block">
                                <div className="block_content">
                                  <h2 className="title">
                                                    <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
                                                </h2>
                                  <div className="byline">
                                    <span>13 hours ago</span> by <a>Jane Smith</a>
                                  </div>
                                  <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… <a>Read&nbsp;More</a>
                                  </p>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>



            </div>
            <div className="col-md-6 col-sm-6 col-xs-12">

            <img width="500px" src="client/public/images/chart.png" />
            </div>
          </div>
        </div>
      </div>
    </div>

    )
  }
}

export default Widgets
