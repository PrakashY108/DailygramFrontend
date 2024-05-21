import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import *as Animatable from 'react-native-animatable'
import axios from 'axios'
import { useUser } from '../context/Usecontext';
export default function NotificationComponent() {
  const [notification, setnotification] = useState([]);
  const { userData, setuserData } = useUser();
  useEffect(() => {
    handlefetchnotification()
  }, [])
  const handlefetchnotification = async () => {
    try {
      console.log("dataaedfc",userData);
      
      const userid = await userData.userId
      console.log(userid);
      console.log("ghf");

      const response = await axios.post(`http://10.0.2.2:6000/${userid}/notification`)
      setnotification(response.data);
      console.log(response.data);
      console.log("length",notification);
      
    } catch (error) {
      console.log("Error fetching Notifications", error);

    }
  }

  const renderItems=({item})=>{
    console.log(item.message);
    
    return(<>
  
    <View style={{ height: 60, flexDirection: "row", width: "100%", alignItems: 'center', gap: 10 }}>
    <Image style={{ height: 40, width: 40, borderRadius: 20,marginLeft:10  }} source={require("../Images/img/lordshiva.jpg")} />
    <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>{item.message}</Text>
  </View>
    </>
  )
  }
  return (
    <Animatable.View animation={"slideInRight"} duration={100} style={{ flex: 1, alignItems: 'flex-start' }}>
    <FlatList data={notification}
             showsVerticalScrollIndicator={true}
       renderItem={renderItems}
         keyExtractor={(item, index)  => index.toString()}/>
        <Text style={{flex:1,alignItems:"center",alignContent:"center",fontSize:20,alignSelf:"center"}}>You have reached at the bottom</Text>
    </Animatable.View> 
  )
}
