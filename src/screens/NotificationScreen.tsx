import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import *as Animatable from 'react-native-animatable'
import axios from 'axios'
import dotenvconfig from '../config/dotenvconfig'
import {getaccessTokenFromAsync} from "../utils/getaccessTokenfromAsync"

export default function NotificationComponent() {
  const [notification, setnotification] = useState([]);

  useEffect(() => {
    handlefetchnotification()
  }, [])
  const handlefetchnotification = async () => {
    try {
          const accessToken = await getaccessTokenFromAsync();
          console.log("Token",accessToken);
          
      const response = await axios.post(`${dotenvconfig.API_URL}/fetch/notifications`,null, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
      setnotification(response.data);
      console.log(response.data);
      console.log("length", notification);

    } catch (error) {
      console.log("Error fetching Notifications", error);

    }
  }

  const renderItems = ({ item }) => {
    console.log(item.message);

    return (<>

      <View style={{ height: 60, flexDirection: "row", width: "100%", alignItems: 'center', gap: 10 }}>
        <Image style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 10 }} source={require("../assets/img/lordshiva.jpg")} />
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
        keyExtractor={(item, index) => index.toString()} />
      <Text style={{ flex: 1, alignItems: "center", alignContent: "center", fontSize: 20, alignSelf: "center" }}>You have reached at the bottom</Text>
    </Animatable.View>
  )
}
