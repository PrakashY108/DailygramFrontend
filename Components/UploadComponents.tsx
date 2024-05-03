import React, { useState } from 'react';
import { View, Button, StyleSheet,Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { useUser } from '../context/Usecontext';

const UploadComponents = () => {
  const [pickedImage, setPickedImage] = useState(null); // Specify the type as DocumentPickerResponse | null
  const [pickedReel, setPickedReel] = useState(null); // Specify the type as DocumentPickerResponse | null
  const { userid } = useUser();
  const pickImage = async () => {
    try {

      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      setPickedImage(file);
      
      console.log("Image picked successfully");

      await uploadFile(file,userid);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('You cancelled the pick');
      } else {
        console.log('Error while picking the file: ' + err);
      }
    }
  };

  const pickReel = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      setPickedReel(file);
      uploadFile(file,userid);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error while picking the file: ' + err);
      }
    }
  };

  
  const uploadFile = async (file,userid) => {
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
      
      const response = await axios.post("http://10.0.2.2:6000/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("File uploaded successfully");
      Alert.alert("File uploaded successfully")
      console.log(response.data);
    } catch (err) {
      console.log('Error uploading file:', err);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <Button title="Upload Photo" onPress={pickImage} />
        </View>
      
      <View  style={styles.btn} >
      <Button title="Upload Video" onPress={pickReel} />
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
