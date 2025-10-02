import { markers } from '@/assets/markers';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function App() {
  return (
    <View style={{flex: 1}}>
        <MapView style={StyleSheet.absoluteFill} 
        provider= {PROVIDER_GOOGLE} 
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton

    >
        {markers.map((marker, index) => (
            <Marker key={index} coordinate={marker}>
                <Callout>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 15}}>{marker.name}</Text>
                    </View>
                </Callout>
            </Marker>    
        ))}
        </MapView>
    </View>
  );
}

const INITIAL_REGION = {
    latitude: 40.6501,
    longitude: -73.9496,
    latitudeDelta: 2,
    longitudeDelta: 2,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
