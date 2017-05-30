import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';

@observer
class RoomTypes
 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  // handle form change and pass it to the state so as to send it to the server
  handleChange(e) {
    const { store_NewOffer, room, index } = this.props;

    if (e.target.value === "1") {
      this.setState({index: store_NewOffer.rooms.length});
      store_NewOffer.rooms.push({roomTypeID: room.id});
    } else {
      store_NewOffer.rooms.splice(this.state.index, 1);
    }
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  render() {
    const { room } = this.props
    return(
      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Apply to: {room.name} ?</label>
        <select
        onChange={this.handleChange}
        className="form-control" required="required">
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
    )
  }

}

export default RoomTypes
