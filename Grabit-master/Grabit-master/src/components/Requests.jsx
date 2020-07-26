/* eslint-disable react/static-property-placement */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { firestore } from '../firebase'
import avatar from '../img/avatar_pic.png'
import { ReactComponent as Pin } from '../img/pin.svg'
import { UserContext } from '../contexts/UserProvider'
import DirectionMap from './DirectionsMap'

class Requests extends Component {
  unsubscribe = null

  constructor(props) {
    super(props)
    this.state = {
      requests: []
    }
  }

  componentDidMount = async () => {
    const { uid } = this.context
    this.unsubscribe = firestore.collection('orders').onSnapshot(snapshot => {
      const allrequests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      const requests = allrequests.filter(request => request.custumerID === uid)
      this.setState({ requests })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribe()
  }

  static contextType = UserContext

  render() {
    const { requests } = this.state
    return (
      <>
        <h1 className="settings__heading">Requests</h1>
        {requests.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__paragraph">
              there are no pending requests, make one <Link to="/dashboard/request">here</Link>
            </p>
          </div>
        ) : (
          requests.map((request, index) => (
            <div className="request" key={request.id}>
              <h2 className="request__heading">Request #{index + 1}</h2>
              <DirectionMap from={request.from} to={request.to} />
              <div className="row mt-5">
                <div className="col-lg-7">
                  <p className="request__info">{request.schedule}</p>
                  <p className="request__info">Price : {request.cost}</p>
                  <div className="request__address">
                    <Pin className="request__address--icon" />
                    <p className="request__address--text">{request.to}</p>
                  </div>
                  <p className="request__description">{request.description}</p>
                  <ul className="request__list">
                    {request.items.map(item => (
                      <li className="request__list--item" key={item.id}>
                        {item.value}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-5">
                  <div className="request__driver-card">
                    <img className="request__driver-card--avatar" src={avatar} alt="avatar" />
                    <div>
                      <p className="request__driver-card--name">Hamid lmardi</p>
                      <p className="request__driver-card--phone">+2126874565</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="request__details">
                <div>
                  <p className="request__details__price">Estimated Price</p>
                  <p className="request__details__distance">Estimated time and distance</p>
                </div>
                <div>
                  <p className="request__details__price--right">120DH</p>
                  <p className="request__details__distance--right">-25m/5km</p>
                </div>
              </div>
            </div>
          ))
        )}
      </>
    )
  }
}

export default Requests
