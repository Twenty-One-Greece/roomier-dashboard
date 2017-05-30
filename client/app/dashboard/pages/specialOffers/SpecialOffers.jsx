import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import BackButton from '../../components/BackButton.jsx';
import TableHead from './TableHead.jsx';
import OfferInfo from './OfferInfo.jsx';
import { observer } from 'mobx-react';
import store_SpecialOffers from './../../Stores/Store_SpecialOffers.js'

@observer
class SpecialOffers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  componentWillMount() {
    const { propertyID } = this.props.params
    store_SpecialOffers.getDatesOffers(propertyID);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  render() {
    const { offers } = store_SpecialOffers;
    const { propertyID } = this.props.params

    console.log(offers)

    this.list = offers.map( (offer) =>{
      return <OfferInfo
                offer = { offer }
                key = { offer.d_id }
                store_SpecialOffers = { store_SpecialOffers }
                propertyID = { propertyID } />
    })
    return(
      <div className="row">
        <div className="col-xs-12 breadcump">
          Property ID:{this.props.params.propertyID} / Special Offers
        </div>
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
                <ul className="nav navbar-right panel_toolbox">
                  <li>
                    <Link to={'dashboard/properties/' +
                    this.props.params.propertyID + '/specialOffers/new'}
                    className="btn btn-success custom-btn-action">
                    <i className="fa fa-plus"></i>&nbsp; Add Special Offer
                    </Link>
                  </li>
                </ul>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <small className="hint">Below are the dates of the special offers you have added. To add a new special offer press the 'Add Special Offer Button'.</small>
              <br /><br />
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

export default SpecialOffers
