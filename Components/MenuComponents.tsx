import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,Alert} from 'react-native'
import React, { useState } from 'react'
import {useUser} from "../context/Usecontext"
import { useNavigation } from '@react-navigation/native';

export default function MenuComponents() {
const [logout ,setlogout] = useState()
const {userData, setuserData}= useUser();
const navigation =useNavigation()

const handleConfirmLogout=()=>{
 Alert.alert("Logout","Do yow want to logout",[{
  text:"cancel",
  onPress:()=>console.log("Cancelled")
 },{text:"Logout",
  onPress:()=>handleLogout()
 }])
}
  const handleLogout=()=>{

  
  }
  return (
    <ScrollView >

      <View style={{ marginHorizontal: 15 }}>
        <TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.img} source={require("../Images/icons/accountcenter.png")} />
            <Text style={{ fontSize: 20, color: "black", }}>Accounts Center</Text>
          </View></TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.img} source={require("../Images/icons/save2.png")} />
            <Text style={{ fontSize: 20, color: "black", }}>Saved</Text>
          </View></TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.img} source={require("../Images/icons/blockedacc.png")} />
            <Text style={{ fontSize: 20, color: "black", }}>Blocked Accounts</Text>
          </View></TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.img} source={require("../Images/icons/acccountprivacy.png")} />
            <Text style={{ fontSize: 20, color: "black", }}>Account Privacy</Text>
          </View></TouchableOpacity>
      </View>
      <View style={{ margin: 15 }}>
        <TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.img} source={require("../Images/icons/privacypocilies.png")} />
            <Text style={{ fontSize: 20, color: "black", }}>Privacy Policies</Text>
          </View></TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.img} source={require("../Images/icons/help.png")} />
            <Text style={{ fontSize: 20, color: "black", }}>Help</Text>
          </View></TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.img} source={require("../Images/icons/about.png")} />
            <Text style={{ fontSize: 20, color: "black", }}>About</Text>
          </View></TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.img} source={require("../Images/icons/tandc.png")} />
            <Text style={{ fontSize: 20, color: "black", }}>Terms & Conditions</Text>
          </View></TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.img} source={require("../Images/icons/addaccount.png")} />
            <Text style={{ fontSize: 20, color: "black", }}>Add Account</Text>
          </View></TouchableOpacity>
        <TouchableOpacity onPress={handleConfirmLogout}>
          <View style={styles.container}>
            <Image style={styles.img} source={require("../Images/icons/logout.png")} />
            <Text style={{ fontSize: 20, color: "red", }}>Log Out</Text>
          </View></TouchableOpacity>
      </View >
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 7,
    margin: 10,
    flex: 1,
    flexDirection: "row",
    gap: 15
  }, img: {
    height: 30,
    width: 30,
    borderRadius: 10
  }
})