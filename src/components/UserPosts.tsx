import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet,ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import dotenvconfig from '../config/dotenvconfig';
import { getaccessTokenFromAsync } from '../utils/getaccessTokenfromAsync';
const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isloading, setisloading] = useState(false);

  useEffect(() => {

    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const accessToken = await getaccessTokenFromAsync()
      const response = await axios.post(`${dotenvconfig.API_URL}/fetch/userspost`, { accessToken });
      const postData = response.data;
      setisloading(false)
      console.log("Received data:", postData);
        setPosts(postData); 
        
    } catch (error) {
      setisloading(false)
      console.error('Error fetching user posts:', error);
    }
  };
if(isloading){
  return<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <ActivityIndicator size={"large"} color={"blue"}/>
    <Text>Fetching posts please wait ...</Text>
  </View>
}
  const renderPostItem = ({ item  }) => {
    console.log("Image URI:", item.url); // Log the image URI
    return (
      <ScrollView>
    <View style={{margin:5,flexWrap:"wrap",flex:1,flexDirection:"row" ,justifyContent:"space-between"}}>
    <Image resizeMethod='resize'
      style={{
        height:180,
        width: 180,
        backgroundColor:"blue",
        marginTop:"3%"
        
      }}
      source={{uri:item.url}}
    />
  
  </View>
  </ScrollView>
    );
  };


  console.log("Posts:", posts); // Check posts before rendering

  return (

    <View style={{ flex: 1  }}>
      <Text style={{alignSelf:'center',fontSize:20,padding:10}}>Posts</Text>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.postid} // Assuming each post has a unique ID
      />
    </View>
  );
};
export default UserPosts;



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
  }

})