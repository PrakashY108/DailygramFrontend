import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import CustomButton from '../CustomComponents/CustomButton'
export default function ForgetPassword() {
  return (
    <View style={styles.main}>
      <TextInput style={styles.input} placeholder='Enter Username or Phone Number'></TextInput>
      <CustomButton title="Reset password"></CustomButton>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{alignContent: "center",
    height:100,
       paddingLeft:30,
        marginTop: 25,
        borderColor: "transparent",
        
        marginBottom: 10,
        borderRadius: 10,
    },
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