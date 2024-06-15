import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Modal, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import * as yup from 'yup';
import { getaccessTokenFromAsync } from '../utils/getaccessTokenfromAsync';

// Update validation schema to include pickedImage validation
const validationSchemaUpload = yup.object().shape({
  Title: yup.string().required('Title is required'),
  Description: yup.string().required('Description is required'),
  pickedImage: yup.mixed().required("Image cannot be null")
});

const UploadComponents = () => {
  const [pickedImage, setPickedImage] = useState({}); // Specify the type as DocumentPickerResponse | null
  const [pickedReel, setPickedReel] = useState({}); // Specify the type as DocumentPickerResponse | null
  const [openPost, setOpenPost] = useState(false);
  const [openReels, setOpenReels] = useState(false);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const pickPosts = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setPickedImage(file[0]);
      console.log("Image picked successfully",file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('You cancelled the pick');
      } else {
        console.log('Error while picking the file: ' + err);
      }
    }
  };

  const uploadPosts = async () => {
    try {
      await validationSchemaUpload.validate(
        { Title, Description, pickedImage }, // Add pickedImage to validation object
        { abortEarly: false }
      );
      const formData = new FormData();
      formData.append('file', {
        uri: pickedImage.uri,
        name: pickedImage.name,
        type: pickedImage.type,
      });
      formData.append('name', "posts");
      formData.append('title', Title);
      formData.append('description', Description);
     const accessToken = await getaccessTokenFromAsync()
     console.log(accessToken);
     const response = await axios.post("http://10.0.2.2:6000/uploads/posts", formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`, // Include accessToken in headers
      },
  });

      console.log("Posts uploaded successfully");
      Alert.alert("Posts uploaded successfully");
      console.log(response.data);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        console.log('Error uploading posts:', error);
      }
    }
  };

  const pickReels = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      setPickedReel(file[0]);
      console.log("Video picked successfully");
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('You cancelled the pick');
      } else {
        console.log('Error while picking the file: ' + err);
      }
    }
  };

  const uploadVideos = async () => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: pickedReel.uri,
        name: pickedReel.name,
        type: pickedReel.type,
      });
      formData.append('name', "reels");
      formData.append('title', Title);
      formData.append('description', Description);

      const response = await axios.post("http://10.0.2.2:6000/uploads/videos", formData, {
        timeout: 10000,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Video uploaded successfully");
      Alert.alert("Video uploaded successfully");
      console.log(response.data);
    } catch (err) {
      console.log('Error uploading video:', err);
    }
  };

  const uploadPostScreen = () => {
    setOpenPost(true);
  };

  const uploadReelsScreen = () => {
    setOpenReels(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <Button title="Upload Photo" onPress={uploadPostScreen} />
      </View>
      <View style={styles.btn}>
        <Button title="Upload Video" onPress={uploadReelsScreen} />
      </View>
      <ScrollView>
        <Modal visible={openPost} animationType="slide">
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => { setOpenPost(false); setPickedImage(null); }} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickPosts} style={styles.uploadArea}>
              <Text style={styles.uploadText}>Choose Image</Text>
            </TouchableOpacity>
            {errors.pickedImage && <Text style={styles.error}>{errors.pickedImage}</Text>}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(e) => setTitle(e)}
                placeholder="Title"
              />
              {errors.Title && <Text style={styles.error}>{errors.Title}</Text>}
              <TextInput
                style={styles.input}
                onChangeText={(e) => setDescription(e)}
                placeholder="Description"
              />
              {errors.Description && <Text style={styles.error}>{errors.Description}</Text>}
              <Button title="Post" onPress={uploadPosts} color="green" />
            </View>
          </View>
        </Modal>
        <Modal visible={openReels} animationType="slide">
          <TouchableOpacity onPress={() => { setOpenReels(false); setPickedReel(null); }} style={styles.cancelButton}>
            <Text style={styles.uploadText}>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={pickReels} style={styles.uploadArea}>
              <Text style={styles.uploadText}>Choose Video</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(e) => setTitle(e)}
                placeholder="Title"
              />
              {errors.Title && <Text style={styles.error}>{errors.Title}</Text>}
              <TextInput
                style={styles.input}
                onChangeText={(e) => setDescription(e)}
                placeholder="Description"
              />
              {errors.Description && <Text style={styles.error}>{errors.Description}</Text>}
              <Button title="Post" onPress={uploadVideos} color="green" />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default UploadComponents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    gap: 100,
    marginLeft: '40%',
  },
  btn: {
    backgroundColor: 'red',
    height: 50,
    width: 80,
  },
  input: {
    color: 'black',
    width: '100%',
    flex: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 15,
    paddingBottom: 10,
    marginEnd: 40,
  },
  error: {
    color: 'red',
    marginHorizontal: 20,
  },
  cancelButton: {
    alignSelf: 'flex-end',
  },
  cancelText: {
    color: 'red',
    fontSize: 15,
    margin: 5,
  },
  modalContent: {
    margin:10,
    backgroundColor: '#f6ffff',
    position: 'absolute',
    top: 10,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
  },
  uploadArea: {
    height: 200,
    backgroundColor: 'lightblue',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    padding: '20%',
    margin: 30,
  },
  uploadText: {
    maxHeight: 20,
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  inputContainer: {
    marginHorizontal: 10,
  },
});
