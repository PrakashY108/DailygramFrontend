import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

import { useUser } from '../context/Usecontext'
const UserPosts = () => {
  const [posts, setPosts] = useState([]);
   const { userid } = useUser();

  useEffect(() => {
    // Fetch data from backend when component mounts
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:6000/fetch/post', { userid });
      const postData = response.data;
      console.log("Received data:", postData); // Check received data
      setPosts(postData); // Assuming your API response contains an array of posts directly


    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };
  const renderPostItem = ({ item }) => {
    console.log("Image URI:", item.content); // Log the image URI
    return (
      <View style={{ padding: 10 }}>
        <Text>{item.title}</Text>
        <Image
          style={{
            height: 250,
            width: 200,
          }}
          source={{ uri: 'http://10.0.2.2:6000/F:/prakash/Dailygram/Uploads/file-1714371443756-9969649061000000033.png'}}
        />
      </View>
    );
  };


  console.log("Posts:", posts); // Check posts before rendering

  return (

    <View style={{ flex: 1 }}>
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