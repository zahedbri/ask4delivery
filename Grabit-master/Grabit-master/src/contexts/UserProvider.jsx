/* eslint-disable react/prop-types */
import React, { Component, createContext } from 'react'
import { auth, createUserProfileDocument } from '../firebase'

export const UserContext = createContext({ user: null })

class UserProvider extends Component {
  unsubscribeFromAuth = null

  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  async componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        const userRef = await createUserProfileDocument(authUser)
        userRef.onSnapshot(snapshot => {
          this.setState({ user: { uid: snapshot.id, ...snapshot.data() } })
        })
      }
      this.setState({ user: authUser })
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    const { user } = this.state
    const { children } = this.props

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
  }
}

export default UserProvider
