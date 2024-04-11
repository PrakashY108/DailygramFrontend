import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function HomeFooter() {
  return (
    <View style={styles.container}>
      <Image style={styles.icons} source={require('../Images/icons/home.png')} />
      <Image style={styles.icons} source={require('../Images/icons/search.png')} />
      <Image style={styles.icons} source={require('../Images/icons/upload.png')} />
      <Image style={styles.icons} source={require('../Images/icons/reels.png')} />
      <Image style={styles.icons} source={require('../Images/img/Logo.jpg')} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    bottom: 0,
    position: 'relative',
    maxHeight: 50,
    backgroundColor: 'white'
  },
  icons: {
    height: 50,
    width: 50
  }
})