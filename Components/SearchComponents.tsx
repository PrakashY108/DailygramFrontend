import { ScrollView, StyleSheet, Image, TextInput, View } from 'react-native'
import React from 'react'

export default function SearchComponents() {
  return (
    <ScrollView>
      <View>
        <TextInput style={styles.input} placeholder='Search here'></TextInput>
        <Image style={{
          height: 300,
          width: 300,
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          borderRadius: 150
        }} source={require("../Images/img/Logo.jpg")} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    color: "black",
    width: 400,
    height: 35,
    flex: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: 'black',
    borderWidth: 1
  }
})