import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

//Logo
import Logo from '../assets/img/Logo.png'

const Home = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.title}>WANDER <Text style={ {color: '#DA828F'}}>PETS</Text></Text>
        </View>
        
        <View>  
            <Text style={styles.subHeader}>Recently Lost Pets</Text>
        </View>
    </View>
  )
}

export default Home

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
    subHeader: {
        marginTop: 20,
        marginBottom: 30,
        left: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
    logo:{
        width: 150,
        height: 150,
        resizeMode: 'contain',
    }
})