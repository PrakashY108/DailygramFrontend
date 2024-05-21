import React, { useState } from 'react';
import { View, Button, StyleSheet,Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { useUser } from '../context/Usecontext';

const UploadComponents = () => {
  const [pickedImage, setPickedImage] = useState(null); // Specify the type as DocumentPickerResponse | null
  const [pickedReel, setPickedReel] = useState(null); // Specify the type as DocumentPickerResponse | null
  const { userData, setuserData } = useUser();

  const pickPosts = async () => {
    try {

      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      setPickedImage(file);
    
      console.log("Image picked successfully");
     const userid = userData.userId
      await uploadPosts(file,userid);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('You cancelled the pick');
      } else {
        console.log('Error while picking the file: ' + err);
      }
    }
  };const uploadPosts = async (file,userid) => {
    try {
      console.log(userid)
      const data = file[0];
      const formData = new FormData();
      console.log(data)
      formData.append('file', {
        uri: data.uri,
        name: data.name,
        type: data.type,
        url :userid
        
      });
      formData.append('id', userid);
      formData.append('name', "posts");
      const response = await axios.post("http://10.0.2.2:6000/upload/cloudinary", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Posts uploaded successfully");
      Alert.alert("Posts uploaded successfully")
      console.log(response.data);
    } catch (err) {
      console.log('Error uploading posts:', err);
    }
  };

  const pickReels = async () => {
    try {

      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });

      setPickedReel(file);
    
      console.log("Image picked successfully");
     const userid = userData.userId
     uploadVideos(file,userid);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('You cancelled the pick');
      } else {
        console.log('Error while picking the file: ' + err);
      }
    }
  }; 
  
  const uploadVideos = async (file,userid) => {
    try {
      console.log(userid)
      const data = file[0];
      const formData = new FormData();
      console.log(data)
      formData.append('file', {
        uri: data.uri,
        name: data.name,
        type: data.type,
        url :userid
        
      });
      formData.append('id', userid);
      formData.append('name', "reels");
      const response = await axios.post("http://10.0.2.2:6000/upload/cloudinary", formData, {
        timeout: 60000,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Video uploaded successfully");
      Alert.alert("Video uploaded successfully")
      console.log(response.data);
    } catch (err) {
      console.log('Error uploading video:', err);
    }
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <Button title="Upload Photo" onPress={pickPosts} />
        </View>
      
      <View  style={styles.btn} >
      <Button title="Upload Video" onPress={pickReels} />
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    flexDirection:'row',
 alignContent:"center",
  gap:100,
  },
  btn:{
   backgroundColor:"red",
   height:50,
   width:80
  }
});

export default UploadComponents;
