import React              from 'react'
import { observer }       from 'mobx-react'

@observer
class Policy extends React.Component {
  constructor(props) {
    super()
    this.form             = this.form.bind(this)
    this.handleChange     = this.handleChange.bind(this)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  handleChange(key) {
    const { store_EditRate, index } = this.props
    return (e) => store_EditRate.childPolicies[index][key] = e.target.value
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  
  // Create the input for meals
  form(label, meal, key) {
    if (!meal) meal = ""

    return (
      <div>
        <label>{label}</label>
        <input type="number" value={meal} onChange={this.handleChange(key)} className="form-control col-md-7 col-xs-12" /> 
      </div>
    )
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { index, policy, rate } = this.props

    // Check existing meal plans. Only show them if they exist in rte
    const allInclusive = (rate.allInclusive)
    ? this.form("All Inclusive", policy.allInclusive, 'allInclusive')
    : null

    const fullBoard = (rate.fullBoard)
    ? this.form("Full Board", policy.fullBoard, 'fullBoard')
    : null

    const halfBoard = (rate.halfBoard)
    ? this.form("Half Board", policy.halfBoard, 'halfBoard')
    : null

    const bedAndBreakfast = (rate.bedAndBreakfast)
    ? this.form("Bed And Breakfast", policy.bedAndBreakfast, 'bedAndBreakfast')
    : null

    const selfCatering = (rate.selfCatering)
    ? this.form("Self Catering", policy.selfCatering, 'selfCatering')
    : null

    const roomOnly = (rate.roomOnly)
    ? this.form("Room Only", policy.roomOnly, 'roomOnly')
    : null

    return(
    <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <h2>{index+1}. Children under {policy.age}</h2>
        {allInclusive}
        {fullBoard}
        {halfBoard}
        {bedAndBreakfast}
        {selfCatering}
        {roomOnly}
    </div>
    )
  }
}




export default Policy
