import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView from "react-native-maps";
import destination, { point } from '@turf/destination';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      south: null,
      west: null,
      north: null,
      east: null
    }
  }
  onRegionChangeComplete = (region) => {
    const center = point([region.longitude, region.latitude]);
    const verticalMeter = 111 * region.latitudeDelta / 2;
    const horizontalMeter = 111 * region.longitudeDelta / 2;
    const options = { units: 'kilometers' };
    const south = destination(center, verticalMeter, 180, options);
    const west = destination(center, horizontalMeter, -90, options);
    const north = destination(center, verticalMeter, 0, options);
    const east = destination(center, horizontalMeter, 90, options);
    this.setState({
      south: south.geometry.coordinates[1],
      west: west.geometry.coordinates[0],
      north: north.geometry.coordinates[1],
      east: east.geometry.coordinates[0],
    })
  }
  fetchToilet = () => {
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
        style={styles.mapview}
        initialRegion={{
            latitude: 35.681262,
            longitude: 139.766403,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00521
        }}>
        <MapView.Marker
            coordinate={{
                latitude: 35.681262,
                longitude: 139.766403
            }}
            title="東京駅"
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => this.fetchToilet()}
          style={styles.button}
        >
          <Text style={styles.buttonItem}>トイレ取得</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapview: {
    ...StyleSheet.absoluteFillObject
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  button: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  buttonItem: {
    textAlign: 'center'
  }
});
