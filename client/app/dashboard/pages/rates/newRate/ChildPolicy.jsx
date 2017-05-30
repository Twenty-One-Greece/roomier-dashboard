import React from 'react';
import { observer } from 'mobx-react';

@observer
class ChildPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  // handle form change and pass it to the state so as to send it to the server
  handleChange(objectKey) {
    return (e) => {
      let { store_NewRate, policy } = this.props;
      let { rateChildPolicies } = store_NewRate;

      rateChildPolicies[this.props.identify]['age'] = policy.age;
      rateChildPolicies[this.props.identify][objectKey] = e.target.value;
     }
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  // render Component. Only let user put prices for the meal plans
  // this property supports
  render() {
    const { policy, property, store_NewRate } = this.props


    // Dont be scared they are just vars
    let aiDisplay = ''; let fbDisplay = ''; let hbDisplay = '';
    let bnbDisplay = ''; let scDisplay = ''; let roDisplay = '';

    // Check which meal plans to show for children
    // Show the ones that the property supports and the
    // base meal plan is included in child extra pax
    if (property.allInclusive === 0 || store_NewRate.basePlan === "1")
      aiDisplay = 'none'
    if (property.fullBoard === 0 || store_NewRate.basePlan === "2")
      fbDisplay = 'none'
    if (property.halfBoard === 0 || store_NewRate.basePlan === "3")
      hbDisplay = 'none'
    if (property.bedAndBreakfast === 0 || store_NewRate.basePlan === "4")
      bnbDisplay = 'none'
    if (property.selfCatering === 0 || store_NewRate.basePlan === "5")
      scDisplay = 'none'
    if (property.roomOnly === 0 || store_NewRate.basePlan === "6")
      roDisplay = 'none'

    return(
      <div className="form-group col-md-6 col-sm-6 col-xs-12"><br />
        <h4>Fees for childs up to { policy. age } will be as follows: </h4>

        <div>
          <p>Child extra PAX (base meal plan)&nbsp;
            <input type="text" onChange={this.handleChange('charge')}/>
          </p>
        </div>
        <div style={{display: aiDisplay}}>
          <p>All Inclusive &nbsp; <input type="text"
          onChange={this.handleChange('allInclusive')}/></p>
        </div>
        <div style={{display: fbDisplay}}>
          <p>Full Board &nbsp; <input type="text"
          onChange={this.handleChange('fullBoard')}/></p>
        </div>
        <div style={{display: hbDisplay}}>
          <p>Half Board &nbsp; <input type="text"
          onChange={this.handleChange('halfBoard')}/></p>
        </div>
        <div style={{display: bnbDisplay}}>
          <p>Bed and Breakfast &nbsp; <input type="text"
          onChange={this.handleChange('bedAndBreakfast')}/></p>
        </div>
        <div style={{display: scDisplay}}>
          <p>Sef Catering &nbsp; <input type="text"
          onChange={this.handleChange('selfCatering')}/></p>
        </div>
        <div style={{display: roDisplay}}>
          <p>Room Only &nbsp; <input type="text"
          onChange={this.handleChange('roomOnly')}/></p>
        </div>
      </div>
    )
  }
}


export default ChildPolicy
