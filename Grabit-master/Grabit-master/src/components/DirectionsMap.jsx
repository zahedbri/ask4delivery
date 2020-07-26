/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

mapboxgl.accessToken =
  'pk.eyJ1IjoibW91cmFkYW91aW5hdCIsImEiOiJjazVsMTF3NDkwN2ExM2tydzR5eDNxYmZnIn0.Hzar3a8WlUKMpcYl3s7mZg'

class Directions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lng: -6,
      lat: 34,
      zoom: 6,
      from: '',
      to: ''
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.from !== props.from || state.to !== props.to) {
      return {
        from: props.from,
        to: props.to
      }
    }

    return null
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state
    this.directions = new MapboxDirections({
      accessToken:
        'pk.eyJ1IjoibW91cmFkYW91aW5hdCIsImEiOiJjazVsMTF3NDkwN2ExM2tydzR5eDNxYmZnIn0.Hzar3a8WlUKMpcYl3s7mZg',
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: {
        instructions: false,
        profileSwitcher: false,
        inputs: false
      },
      interactive: false
    })

    this.map = new mapboxgl.Map({
      container: this.myMap,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom
    })

    this.map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken
      }),
      'top-left'
    )
  }

  componentDidUpdate() {
    const { from, to } = this.state
    this.directions.setOrigin(from)
    this.directions.setDestination(to)
  }

  render() {
    return (
      <div>
        <div
          ref={el => (this.myMap = el)}
          style={{ height: '400px', width: '100%', borderRadius: '4px' }}
          onClick={this.setLocation}
        />
      </div>
    )
  }
}

export default Directions
