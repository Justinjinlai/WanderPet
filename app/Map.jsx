import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Map = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      

      <Link href="/" style={styles.link}>Go to Home</Link>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 200,
        backgroundColor: '#7DFCD5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 45,
        color: '#FFA850'
    },
    link: {
        marginVertical: 20,
        borderBottomWidth: 1,
    }
})