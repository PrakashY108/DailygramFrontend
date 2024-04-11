
import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'


function CustomInput() {
  return (
    <TextInput placeholder="Enter here" style={styles.input} ></TextInput>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  input: {
    color: "black",
    width: 330,
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