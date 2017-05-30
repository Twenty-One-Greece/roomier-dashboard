import React from 'react';
import Properties from './pages/properties/Properties.jsx';

class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="right_col" role="main">
      <div className="">
        <div className="page-title">
          <div className="title_left">
          </div>
        </div>

        <div className="clearfix"></div>
        {this.props.page}
      </div>
    </div>
    );
  }

}

export default Page;
