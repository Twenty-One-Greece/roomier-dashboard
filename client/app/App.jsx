import React from 'react';
import Sidebar from './dashboard/Sidebar.jsx';
import Navbar from './dashboard/Navbar.jsx';
import Page from './dashboard/Page.jsx';
import Footer from './dashboard/Footer.jsx';
import Properties from './dashboard/pages/properties/Properties.jsx';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

// Renders all dashboard components
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // When component is about to mount it checks if the token is set.
  // If it is not user is not logged in so redirect him to login page
  componentWillMount () {
    if (typeof window.localStorage.token === 'undefined' ||
        typeof window.localStorage.id === 'undefined') {

      alert('You are not logged in');
      location.href = '/#/login'
    }
  }

  render() {
    return (
      <div className="container body">
        <div className="main_container">
          <Sidebar />
          <Navbar />
          <Page page={this.props.children}/>
          <div className='alert-box'>
            <Alert stack={{limit: 2}}
                   position='bottom'
                   effect={'slide'} />
          </div>
          <Footer />
        </div>
      </div>
    );
  }

}

export default App;
