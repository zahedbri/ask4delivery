import React, { useContext } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from './contexts/UserProvider'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'

toast.configure()

function App() {
  const user = useContext(UserContext)

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing}>
          {user && <Redirect to="/dashboard" />}
        </Route>
        <Route path="/dashboard">{user ? <Dashboard /> : <Redirect to="/" />}</Route>
      </Switch>
    </div>
  )
}

export default withRouter(App)
