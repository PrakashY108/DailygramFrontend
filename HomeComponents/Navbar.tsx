import { Image, StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'


// navigation

export default function Navbar() {
  return (
    <View style={styles.main}>
      <Text style={styles.text} >Dailygram</Text>
      <View style={styles.btns}>
   
       <Image style={styles.img} source={require('../Images/icons/notification.png')}/>
      
      <Image style={styles.img} source={require('../Images/icons/message.png')}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main:{
    maxHeight:65,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
 
    backgroundColor:'#acdee6'
  },
  text:{
fontSize:40,
marginHorizontal:15,
fontWeight:'bold'
  },
  img:{
    height:20,
    width:20,
    borderRadius:20,
    
    alignContent:'center',
    alignSelf:'center'
   },
   btns:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
    gap:20,
    marginVertical:20,
    marginHorizontal:20
   }
})