import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';

@observer
class Settings
 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  // handle form change and pass it to the state so as to send it to the server
  handleChange(key) {
    return (e) => {
      const { value } = e.target
      const { store_NewOffer } = this.props

      store_NewOffer.data[key] = e.target.value

      // If the user choses free night no discount will be applied
      // so disable the discount button
      if (store_NewOffer.data.type === "Free night") {
        store_NewOffer.data.discount = 0
        this.setState({ disabled: "disabled" })
      } else this.setState({ disabled: "" })
     }
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  render() {
    return(
      <div>
      <h2>Settings </h2>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Special Offer Type</label>
          <select
          onChange={this.handleChange('type')}
          className="form-control" required="required">
            <option>Select</option>
            <option value="Early booking offer">Early booking offer</option>
            <option value="Last minute offer">Last minute offer</option>
            <option value="Long stay offer">Long stay offer</option>
            <option value="Non Refundable rate">Non Refundable rate</option>
            <option value="Special offer">Special offer</option>
            <option value="Free night">Free night</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Cumulative</label>
          <select
          onChange={this.handleChange('cumulative')}
          className="form-control" required="required">
            <option>Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Name*</label>
          <input type="text" required="required"
          onChange={this.handleChange('name')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Discount (%)*</label>
          <input type="number" required="required"
          disabled={this.state.disabled}
          onChange={this.handleChange('discount')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Minimum stay</label>
          <input type="number" required="required"
          onChange={this.handleChange('minimumStay')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="clearfix"></div>


        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Conditions*</label>
          <textarea required="required" rows="4"
          onChange={this.handleChange('conditions')}
          className="form-control col-md-7 col-xs-12" />
        </div>

      </div>
    )
  }

}

export default Settings
