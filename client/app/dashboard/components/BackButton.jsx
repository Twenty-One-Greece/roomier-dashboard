import React from 'react';
import { browserHistory } from 'react-router';

class BackButton extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    browserHistory.goBack();
  }

  render() {
    return (
      <div className="btn-back">
        <p onClick={this.handleClick}>
          &nbsp;<i className="fa fa-arrow-left"></i> Back &nbsp;
        </p>
      </div>
    )
  }
}

export default BackButton
