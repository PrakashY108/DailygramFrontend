import { StyleSheet,TouchableOpacity,Image,Button } from 'react-native'
import React from 'react'

// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootScreenPramProps } from '../StackNavigation'
type notificationprop = NativeStackScreenProps<RootScreenPramProps, 'notification'>



export default function NotificationComponent({navigation} : notificationprop) {
  return (
    <TouchableOpacity >
       <Button title="kk"  onPress={() => navigation.navigate("Email", {Email: 'r' })}></Button>
    <Image  style={{ height: 20, width: 20, paddingTop: 3 }} source={require("../Images/icons/notification.png")}></Image>
</TouchableOpacity>
  )
}

const styles = StyleSheet.create({})