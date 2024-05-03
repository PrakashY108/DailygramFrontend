import React, { useEffect,useState } from 'react';
import { View, Text, ScrollView, Image, Button, StyleSheet } from 'react-native';
import Posts from './UserPosts';
import { useUser } from '../context/Usecontext';
import axios from 'axios';

const UserData = () => {
  const { userid } = useUser();
  const [userdata,setuserdata] =useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        const response = await axios.post("http://10.0.2.2:6000/fetchUser", { userid }); 
        console.log(response.data);
         setuserdata(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userid]);
return userdata;
}; 

const ProfileComponents = () => {
const userdata = UserData()
console.log(userdata);
const {setfollowers}=useUser();
setfollowers(userdata.follower)
  
  return (
    <ScrollView horizontal={false}>
      <View style={styles.top}>
        <Image style={styles.img} resizeMode='contain' source={require("../Images/img/Logo.jpg")}></Image>
        <View style={styles.box}><Text>{userdata.posts}</Text><Text>posts</Text></View>
        <View style={styles.box}><Text>{userdata.follower}</Text><Text>follower</Text></View>
        <View style={styles.box}><Text>{userdata.following}</Text><Text>following</Text></View>
      </View>
      <View>
        <Text style={styles.text}>{userdata.username}</Text>
        <Text style={{ height: 60, color: "black" }}>{userdata.Bio}</Text>
        <Button color={"#26e0d4"} title="Edit Profile"></Button>
      </View>
      <View style={{ flex: 1 }}>
    <Posts/>
      </View>
    </ScrollView>
  );
};

export default ProfileComponents;

const styles = StyleSheet.create({
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'center'
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  box: {
    alignContent: 'center',
    alignItems: 'center',
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
  },text:{
    paddingHorizontal:30,
    fontSize:18,
    fontWeight:"bold"
  }
});
