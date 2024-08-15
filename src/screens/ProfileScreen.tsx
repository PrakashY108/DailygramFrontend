import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, Button, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import UserPosts from '../components/UserPosts';
import dotenvconfig from '../config/dotenvconfig';
import { useNavigation } from '@react-navigation/native';
import { getaccessTokenFromAsync } from '../utils/getaccessTokenfromAsync';
import axios from 'axios';

const ProfileComponents = () => {
  const [User,setUser]=useState({})
  const navigation = useNavigation();



  useEffect(() => {
   const user= fetchuserDetails()
  }, []) 

const fetchuserDetails=async()=>{
  const accessToken = await getaccessTokenFromAsync()
  console.log(accessToken); 
  const response= await axios.post(`${dotenvconfig.API_URL}/fetch/user/details`,{accessToken})
  console.log( response.data);
  setUser(response.data)
  
}
  const handleEdit = () => {
    navigation.navigate("EditProfileScreen")
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ maxHeight: 50, width: "100%", backgroundColor: "#80d2f2", flex: 1, flexDirection: "row" }}><Text style={{ fontSize: 35, fontWeight: "bold", color: "black", width: "70%", marginLeft: 10 }}>Dailygram</Text>

        <TouchableOpacity onPress={() => navigation.navigate("MenuScreen")}><Image style={{ height: 40, width: 40, marginLeft: 50, marginVertical: 5 }} source={require("../assets/icons/menu-bar.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.top}>
        <Image style={styles.img} resizeMode='contain' source={require("../assets/img/Logo.jpg")} />
        <View style={styles.box}>
          <Text>{User.posts}</Text>
          <Text>posts</Text>
        </View>
        <View style={styles.box}>
          <TouchableOpacity onPress={() => navigation.navigate("FollowPageScreen")}>
            <Text>{User.follower}</Text>
            <Text>follower</Text></TouchableOpacity>
        </View>
        <View style={styles.box}>
          <TouchableOpacity onPress={() => navigation.navigate("FollowPageScreen")}><Text>{User.following}</Text>
            <Text>following</Text></TouchableOpacity>
        </View>
      </View>
      <Text style={styles.text}>{User.username}</Text>
      <Text style={{ height: 50, color: "black", marginHorizontal: "7%", fontWeight: "300" }}>{User.Bio}</Text>
      <View style={{ marginTop: 5, width: "80%", marginHorizontal: "10%" }}>
        <Button color={"#26e0d4"} onPress={handleEdit} title="Edit Profile" />
      </View>
      <UserPosts /> 
    </View>)
};



export default ProfileComponents;

const styles = StyleSheet.create({
  top: {
    maxHeight: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: "7%",
    marginTop: "3%",
    alignItems: "center"

  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  box: {

  },
  post: {
    height: 260,
    width: 150,
    borderWidth: 2,
    borderColor: 'white',
  },
  postImage: {
    height: 300,
    width: 200,
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 30,
  }, text: {
    marginHorizontal: "7%",
    fontSize: 20,
    color: "black"
  }
});
