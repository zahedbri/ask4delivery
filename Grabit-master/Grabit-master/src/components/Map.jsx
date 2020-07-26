/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
// AIzaSyDomGogRhIdJKCMLkOdWSOgODioOHM4KMw
import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1IjoibW91cmFkYW91aW5hdCIsImEiOiJjazVsMTF3NDkwN2ExM2tydzR5eDNxYmZnIn0.Hzar3a8WlUKMpcYl3s7mZg'

class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lng: null,
      lat: null,
      zoom: 6
    }
  }

  static getDerivedStateFromProps(props) {
    return {
      lng: props.lng,
      lat: props.lat
    }
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom
    })

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })
    })

    new mapboxgl.Marker(this.mapMarker).setLngLat([lng, lat]).addTo(map)
  }

  render() {
    const { height, width } = this.props
    return (
      <div>
        <div ref={marker => (this.mapMarker = marker)} className="map__marker" />
        <div ref={el => (this.mapContainer = el)} style={{ height, width, borderRadius: '4px' }} />
      </div>
    )
  }
}

export default Map
