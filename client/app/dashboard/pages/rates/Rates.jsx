import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Alert from 'react-s-alert';

import config from '../../../sharedFiles/Config.jsx';
import BackButton from '../../components/BackButton.jsx';
import TableHead from './TableHead.jsx';
import RatesInfo from './RatesInfo.jsx';


class Rates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rates: []
    }
    this.getRates = this.getRates.bind(this);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  componentWillMount() { this.getRates(); }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // get all rates
  getRates () {
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const roomTypeID = this.props.params.roomTypeID;
    const propertyID = this.props.params.propertyID;

    axios({

      method: 'get',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/roomTypes/' + roomTypeID + '/rates',
      headers: config.headers(token)

    }).then((response) => {

      const {error, message, rates} = response.data
      if (error === 'noErrors') this.setState({rates: rates})
      else {
        this.setState({rates: []})
        Alert.error(message)
        console.log(message);
      }

    }).catch((error) => {
      Alert.error("An error eccured");
      console.log(error);
    })
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // render this component. also render RatesInfo component for every
  // rate the server returned.
  render() {
    this.list = this.state.rates.map((rate) => {
      return <RatesInfo
                getRates = {this.getRates}
                key={rate.id}
                rate={rate}
                propertyID={this.props.params.propertyID}
                roomTypeID={this.props.params.roomTypeID} />
    });

    return(
    <div className="row">
      <div className="col-xs-12 breadcump">
        Property ID:{this.props.params.propertyID} /
        Room Type ID: {this.props.params.roomTypeID} /
        Rates
      </div>
      <div className="col-xs-12">
        <div className="x_panel">
          <div className="x_title">
            <BackButton />
            <ul className="nav navbar-right panel_toolbox">
              <li>
                <Link to={'dashboard/properties/' +
                this.props.params.propertyID +
                '/roomTypes/' + this.props.params.roomTypeID + '/rates/new'}
                className="btn btn-success custom-btn-action">
                  <i className="fa fa-plus"></i>&nbsp; Add new rate
                </Link>
              </li>
            </ul>
            <div className="clearfix"></div>
          </div>
          <div className="x_content">

          <table className="table table-striped projects">
            <thead>
              <TableHead />
            </thead>
            <tbody>

              {this.list}

            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
    )
  }
}


export default Rates
