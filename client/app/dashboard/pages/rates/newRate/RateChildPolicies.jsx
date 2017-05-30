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
    this.props.addRatePolicy(polData, 'child');
  }

  // ---------------------------------------------------------------------------
  // removes policy
  removePolicy() {
    if(this.state.selected === true) this.setState({selected: false})
  }

  // ---------------------------------------------------------------------------
  // renders html
  render() {
    const { policy } = this.props;
    let childPolicyClass = "";
    let close = "";

    return (
      <div onClick={this.handleClick}>
        <button type="button" className="close">
          {close}
        </button>

        <p>Childs up to <strong>{policy.age}</strong> years old will
        have an additional charge of <input /> Euros per night.
        </p>
        Meal Plan <input /><br />
        Meal Plan <input /><br />
        Meal Plan <input /><br />
        <br />
      </div>
    )
  }

}

export default RateChildPolicies
