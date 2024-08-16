import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Stories from '../components/Stories'
import HomeMiddle from '../components/HomeMiddle'
import { Image } from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

export default function HomePage() {
  const navigation= useNavigation()
  return(
    
   <><View style={{maxHeight:50,width:"100%",backgroundColor:"#80d2f2",flex:1,flexDirection:"row"}}><Text style={{fontSize:35,fontWeight:"bold",color:"black",width:"70%",marginLeft:10}}>Dailygram</Text>
   <TouchableOpacity onPress={()=>navigation.navigate("NotificationScreen")}>
      <Image style={{height:25,width:25,marginLeft:30,marginVertical:13}} source={require("../assets/icons/notification.png")}/>
   </TouchableOpacity>
   <TouchableOpacity onPress={()=>navigation.navigate("ChatScreen")}>
      <Image style={{height:35,width:35,borderRadius:20,marginLeft:15,marginVertical:10}} source={require("../assets/icons/chat11.png")}/>
   </TouchableOpacity>
      </View>
    <View style={{flex:1}}>
    <Stories/>
      <HomeMiddle />
    </View></>
  )
}
