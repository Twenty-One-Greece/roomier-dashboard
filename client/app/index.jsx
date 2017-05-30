import React                                        from 'react';
import {render}                                     from 'react-dom';
import {Router, Route, hashHistory}                 from 'react-router'
import Login                                        from "./Login.jsx";
import LoginForm                                    from "./login/LoginForm.jsx";
import RegisterForm                                 from "./login/RegisterForm.jsx";
import App                                          from "./App.jsx";
import Properties                                   from "./dashboard/pages/properties/Properties.jsx";
import RateOverview                                 from "./dashboard/pages/rateOverview/RateOverview.jsx";
import Calendar                                     from "./dashboard/pages/calendar/Calendar.jsx";
import Bookings                                     from "./dashboard/pages/bookings/Bookings.jsx";
import ShowBookings                                 from "./dashboard/pages/bookings/showBookings/ShowBookings.jsx";
import CalendarInfo                                 from "./dashboard/pages/calendar/calendarInfo/CalendarInfo.jsx";
import MassEdit                                     from "./dashboard/pages/calendar/MassEdit/MassEdit.jsx";
import EditDate                                     from "./dashboard/pages/calendar/EditDate/EditDate.jsx";
import EditProperty                                 from "./dashboard/pages/properties/EditProperty.jsx";
import Images                                       from "./dashboard/pages/properties/Images.jsx";
import RoomTypeImages                               from "./dashboard/pages/roomTypes/RoomTypeImages.jsx";
import Widgets                                      from "./dashboard/pages/widgets/Widgets.jsx";
import Amenities                                    from "./dashboard/pages/amenities/Amenities.jsx";
import AmenitiesRoom                                from "./dashboard/pages/amenitiesRoom/AmenitiesRoom.jsx";
import Rates                                        from "./dashboard/pages/rates/Rates.jsx";
import EditRate                                     from "./dashboard/pages/rates/editRate/EditRate.jsx";
import NewRate                                      from "./dashboard/pages/rates/newRate/NewRate.jsx";
import Services                                     from "./dashboard/pages/services/Services.jsx";
import SpecialOffers                                from "./dashboard/pages/specialOffers/SpecialOffers.jsx";
import NewOffer                                     from "./dashboard/pages/specialOffers/newOffer/NewOffer.jsx";
import CancelPolicies                               from "./dashboard/pages/cancelPolicies/CancelPolicies.jsx";
import RoomTypes                                    from "./dashboard/pages/roomTypes/RoomTypes.jsx";
import EditRoomTypes                                from "./dashboard/pages/roomTypes/EditRoomTypes.jsx";
import ChildPolicies                                from "./dashboard/pages/childPolicies/ChildPolicies.jsx";

class Roomier extends React.Component {
  render () {
    return (
    <Router history={hashHistory}>
    <Route path={'/'}                                                               component={Login} />
      <Route path={'login'}                                                         component={LoginForm} />
      <Route path={'signup/roomier'}                                                component={RegisterForm} />
    <Route />
    <Route path={'dashboard'}                                                       component={App}>
      <Route path={'widgets'}                                                       component={Widgets}/>
      <Route path={'overview'}                                                      component={RateOverview}/>
      <Route path={'calendar'}                                                      component={Calendar}/>
      <Route path={'bookings'}                                                      component={Bookings}/>
      <Route path={'bookings/:propertyID'}                                          component={ShowBookings}/>
      <Route path={'calendar/:propertyID'}                                          component={CalendarInfo}/>
      <Route path={'calendar/:propertyID/roomType/:roomTypeID/massEdit'}            component={MassEdit}/>
      <Route path={'calendar/:propertyID/roomType/:roomTypeID/edit/:date'}          component={EditDate}/>
      <Route path={'properties'}                                                    component={Properties}/>
      <Route path={'properties/:propertyID'}                                        component={EditProperty}/>
      <Route path={'properties/:propertyID/images'}                                 component={Images}/>
      <Route path={'properties/:propertyID/specialOffers'}                          component={SpecialOffers}/>
      <Route path={'properties/:propertyID/specialOffers/new'}                      component={NewOffer}/>
      <Route path={'properties/:propertyID/amenities'}                              component={Amenities}/>
      <Route path={'properties/:propertyID/cancelPolicies'}                         component={CancelPolicies}/>
      <Route path={'properties/:propertyID/childPolicies'}                          component={ChildPolicies}/>
      <Route path={'properties/:propertyID/roomTypes'}                              component={RoomTypes}/>
      <Route path={'properties/:propertyID/roomTypes/:roomTypeID'}                  component={EditRoomTypes}/>
      <Route path={'properties/:propertyID/roomTypes/:roomTypeID/images'}           component={RoomTypeImages}/>
      <Route path={'properties/:propertyID/roomTypes/:roomTypeID/amenities'}        component={AmenitiesRoom}/>
      <Route path={'properties/:propertyID/roomTypes/:roomTypeID/rates'}            component={Rates}/>
      <Route path={'properties/:propertyID/roomTypes/:roomTypeID/rates/new'}        component={NewRate}/>
      <Route path={'properties/:propertyID/roomTypes/:roomTypeID/rates/:rateID'}    component={EditRate}/>
    </Route>
    <Route path={'*'}                                                               component={NotFound} />
    </Router>
    );
  }
}


const NotFound = () => <h1>Not Found.</h1>


render(<Roomier/>, document.getElementById('app'));
