import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Profile from '../components/Profile'
import Address from '../components/Address'
import Requests from '../components/Requests'
import Faq from '../components/Faq'
import RequestForm from '../components/RequestForm'

const Dashboard = () => {
  return (
    <div className="grey">
      <Navbar />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="settings">
              <Switch>
                <Route exact path="/dashboard/">
                  <Redirect to="/dashboard/request" />
                </Route>
                <Route exact path="/dashboard/requests" component={Requests} />
                <Route exact path="/dashboard/profile" component={Profile} />
                <Route exact path="/dashboard/request" component={RequestForm} />
                <Route exact path="/dashboard/address" component={Address} />
                <Route exact path="/dashboard/faq" component={Faq} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
