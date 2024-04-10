import { ScrollView, StyleSheet, Text, View, Image,Button } from 'react-native'
import React from 'react'
import Stories from '../HomeComponents/Stories'
import TopTabNavigation from './TopTabNavigation'


TopTabNavigation
export default function ProfileComponents() {
  const data = [
    {
      title: 'Car',
      url: require('../Images/img/car.jpg')
    },
    {
      title: 'Image',
      url: require('../Images/img/images.jpg')
    },
    {
      title: 'Logo',
      url: require('../Images/img/Logo.jpg')
    },
    {
      title: 'Lordshiva',
      url: require('../Images/img/lordshiva.jpg')
    },
  ]
  return (
    <ScrollView horizontal={false}>
      <View style={styles.top}>
        <Image style={styles.img} resizeMode='contain' source={require("../Images/img/Logo.jpg")}></Image>
        <View style={styles.box}><Text>17</Text><Text>posts</Text></View>
        <View style={styles.box}><Text>443</Text><Text>followed</Text></View>
        <View style={styles.box}><Text>98</Text><Text>following</Text></View>
      </View>
      <View>
        <Text>Name-Prakash yadav</Text>
        <Text style={{height:60,color:"black"}}>Bio - Lorem ipsum dolor sit amet consectetur adipisicing elit.
         Quam, architecto.</Text>
         <Button color={"#26e0d4"} title="Edit Profile"></Button>
  
      </View>
      <View style={{flexWrap:"wrap",flex:1,flexDirection:"row",paddingVertical:50}}>
      
        {data.map((data, index) => (
             <View key={index} style={styles.post} >
             <Image  style={styles.postImage} source={data.url}></Image>
             </View>
          ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
paddingHorizontal:20,
paddingVertical:5,
    alignItems: 'center'
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,

  },
  box:{
    alignContent:'center',
    alignItems:'center',
    
  },
  post:{
    height:300,
    width:200,
    borderWidth:2,
    borderColor:'white',
  
  },
  postImage:{
    height:300,
    width:200,
    borderWidth:2,
    borderColor:'white',
    paddingVertical:30,
  }

})