import React from 'react';
import { observer } from 'mobx-react';

import ChildPolicy from './ChildPolicy.jsx';

@observer
class Wiz_ChildPolicies extends React.Component {
  constructor(props) {
    super(props);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // get child policies and property
  componentWillMount(){
    const { store_Property, store_NewRate, propertyID } = this.props
    const { childPolicies } = store_NewRate.childPolicies;

    store_NewRate.getChildPolicies(propertyID)
    store_Property.getProperty(propertyID)
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // render Component
  render() {
    const { store_Property, store_NewRate, propertyID } = this.props
    const { childPolicies } = store_NewRate;
    const { property } = store_Property;

    // Create child policy forms
    const policies = store_NewRate.childPolicies.map((policy, i) => {
      return <ChildPolicy
                store_NewRate = { store_NewRate }
                property = { property }
                policy = { policy }
                identify = { i }
                key = { i }/>
    })

    // If no child policies inform the user
    if (!store_NewRate.childPolicies.length) return (
      <div className="row">
          <p className="col-xs-12 hint">No child policies have been set up.</p>
          <p className="col-xs-12 hint">You can set up your child policies in the child policies section.</p>
      </div>
    )

    return(<div className="row"> { policies } </div>)
  }
}


export default Wiz_ChildPolicies
