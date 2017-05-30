import React from 'react';
import axios from 'axios';

import config from '../../../../sharedFiles/Config.jsx';

// ---------------------------------------------------------------------------
// Renders each property info
class RateChildPolicies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "selected": false
    };

    this.removePolicy = this.removePolicy.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // ---------------------------------------------------------------------------
  // change the policy color and add it to the selected policies array
  handleClick() {
    if(this.state.selected === false) this.setState({selected: true})
    var polData = this.props.policy;
    delete polData.id
    this.props.addRatePolicy(polData, 'cancel');
  }

  // ---------------------------------------------------------------------------
  // removes policy
  removePolicy() {
    if(this.state.selected === true) this.setState({selected: false})
  }

  // ---------------------------------------------------------------------------
  // renders html
  render() {
    const {policy} = this.props;
    let cancelPolicyClass = "";
    let close = "";
    var text = "";

    // check if selected
    if (this.state.selected) {
      cancelPolicyClass = "list-item-blue";
      close = <span onClick={this.removePolicy}>×</span>
    } else {
      cancelPolicyClass = "list-item-green";
      close = <span>&nbsp;&nbsp;</span>;
    }

    // return proper text according to type of penalty
    if (policy.typeOfPenalty === 1) {

      text = <p>Cancelation up to<strong> {policy.days} </strong>
         days prior to arrival date, a cancellation fee equal to
        <strong> {policy.value}% </strong>
        of the total booking amount is applicable.</p>;

    } else if (policy.typeOfPenalty === 2) {

      text = <p>No show penalty fee is equal to
        <strong> {policy.value}% </strong>
        of the total booking amount is applicable.</p>

    } else if (policy.typeOfPenalty === 3) {

      text = <p>Early departure penalty fee is equal to
        <strong> {policy.value}% </strong>
        of the total booking amount is applicable.</p>
    }

    return (
      <div className={cancelPolicyClass} onClick={this.handleClick}>
        <button type="button" className="close">
          {close}
        </button>
        {text}
      </div>
    )
  }

}

export default RateChildPolicies
