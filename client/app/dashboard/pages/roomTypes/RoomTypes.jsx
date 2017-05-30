import React from 'react';
import axios from 'axios';
import config from '../../../sharedFiles/Config.jsx';
import BackButton from '../../components/BackButton.jsx';

import RoomTypeInfo from './RoomTypeInfo.jsx';
import TableHead from './TableHead.jsx';
import AddRoomType from './AddRoomType.jsx';

// -----------------------------------------------
// Renders main page
class RoomTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomTypes: [],
    };

    this.getRoomTypes = this.getRoomTypes.bind(this);
  }

  // -----------------------------------------------
  // Before the component mount ask server for all room types
  componentWillMount() { this.getRoomTypes() }

  // -----------------------------------------------
  // this function is called when we want to get all the room types.
  // ex when component mounts or when room types have been updated
  getRoomTypes() {
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.params.propertyID

    axios({

      method: 'get',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/roomTypes/',
      headers: config.headers(token)

    }).then((response) => this.setState({roomTypes: response.data.roomTypes})

    ).catch((error) => $.notify(response.data.message, 'error'));
  }

  // -----------------------------------------------
  // render html
  render() {
    if (this.state.roomTypes.length === 0)
    var message = <p>No room types found. You can set up your
    room types by pressing the 'add room type' button.</p>
    else var message = null

    // map each roomType to the RoomType component
    this.list = this.state.roomTypes.map((roomType) => {
          return <RoomTypeInfo
                    key={roomType.id}
                    roomType={roomType}
                    propertyID={this.props.params.propertyID} />
        });

    return (
      <div className="row">
        <div className="col-xs-12 breadcump">
          Property ID:{this.props.params.propertyID} / Room Types
        </div>
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <h2 className="pageHeader"></h2>
              <ul className="nav navbar-right panel_toolbox">
                <li>
                  <a className="btn btn-success custom-btn-action"
                  data-toggle="modal" data-target="#AddRoomType">
                    <i className="fa fa-plus"></i>&nbsp; Add Room types
                  </a>
                </li>
              </ul>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">

              {message}

              <table className="table table-striped projects">
                <thead>
                  {this.state.roomTypes.length !== 0 ? <TableHead /> : null}
                </thead>
                <tbody>

                  {this.list}

                </tbody>
              </table>

            </div>
          </div>
        </div>
        <div>
          <AddRoomType
            getRoomTypes={this.getRoomTypes}
            propertyID={this.props.params.propertyID}
          />
        </div>
      </div>
    )
  }

}

export default RoomTypes;
