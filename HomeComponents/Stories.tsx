import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, TouchableWithoutFeedbackBase } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useUser } from '../context/Usecontext';
export default function Stories() {
  const [picked, setpicked] = useState()
  const {userid} =useUser();
  const pickFile = async () => {
    try {
      const file = await DocumentPicker.pick(
        { type: [DocumentPicker.types.images, DocumentPicker.types.video] })
      setpicked(file)
      console.log("File picked successfully");
  uploadFile(picked,userid)
    } catch {
      if (DocumentPicker.isCancel(err)) {
        console.log("You cancelled the pick")
      } else {
        console.log("Error while picking");

      }
    }
  }
   
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
        id :userid,
        
      });
      console.log(formData)
      formData.append('id', userid);
      
      const response = await axios.post("http://10.0.2.2:6000/upload/story", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Story uploaded successfully");
      
      console.log(response.data);
    } catch (err) {
      console.log('Error uploading file:', err);
    }
  };
  const data = [
    {
      title: 'Car',
      url: require('../Images/img/car.jpg'),
      story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ultrices arcu. Mauris ullamcorper varius turpis, id semper ipsum ultrices a. Integer vitae justo magna.'
    },
    {
      title: 'Image',
      url: require('../Images/img/images.jpg'),
      story: 'Sed vitae ultrices arcu. Mauris ullamcorper varius turpis, id semper ipsum ultrices a. Integer vitae justo magna.'
    },
    {
      title: 'Logo',
      url: require('../Images/img/Logo.jpg'),
      story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ultrices arcu.'
    },
    {
      title: 'Lordshiva',
      url: require('../Images/img/lordshiva.jpg'),
      story: 'Mauris ullamcorper varius turpis, id semper ipsum ultrices a. Integer vitae justo magna.'
    },
    {
      title: 'Lordshiva',
      url: require('../Images/img/lordshiva.jpg'),
      story: 'Sed vitae ultrices arcu. Integer vitae justo magna.'
    },
    {
      title: 'Lordshiva',
      url: require('../Images/img/lordshiva.jpg'),
      story: 'Integer vitae justo magna.'
    },
  ];

  const [selectedStory, setSelectedStory] = useState(null);

  const handleStoryPress = (story) => {
    setSelectedStory(story);
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
  };

  return (
    <SafeAreaView>
      <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.user}>
          <Image style={styles.story} source={require("../Images/img/Logo.jpg")} />
          <TouchableOpacity onPress={pickFile} style={{ position: "relative", flex: 1, alignSelf: "flex-end", top: 20 }}>
            <Image style={{ height: 36, width: 36, backgroundColor: "white", borderRadius: 18, borderWidth: 1, position: "absolute", flex: 1, alignSelf: "flex-end", bottom: 28 }} source={require("../Images/icons/pngwing.com.png")} />
          </TouchableOpacity>

          <Text style={styles.storyText}>Your story</Text>
        </View>

        <View style={styles.stories}>
          {data.map((story, index) => (
            <TouchableOpacity key={index} onPress={() => handleStoryPress(story)}>
              <View style={styles.user}>
                <Image style={styles.story} source={story.url} />
                <Text style={styles.storyText}>{story.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Modal visible={selectedStory !== null} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalContent} onPress={handleCloseModal}>
            <Text style={styles.storyuser}>{selectedStory?.title}</Text>
            <Image style={styles.modalImage} source={selectedStory?.url} />
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stories: {
    backgroundColor: 'white',
    height: 122,
    flex: 1,
    flexDirection: 'row',
    borderRightColor: 'red'
  },
  storyuser: {
    backgroundColor: 'lightblue',
    width: '100%',
    height: 30,
    marginTop: 10,
    fontWeight: "bold",
    borderRadius: 5,
    marginVertical: 30,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
    fontSize:20

  },
  story: {
    maxHeight: 76,
    minHeight: 76,
    maxWidth: 76,
    minWidth: 76,
    borderRadius: 38,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: '#c7e8ed',
    marginHorizontal: 10,
    marginBottom: 3,
    marginTop: 10
  },
  user: {
    flex: 1,
    alignItems: 'center',
    height: 17
  },
  storyText: {
    fontSize: 13,
    maxWidth: 80,
    maxHeight: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    height: "100%",
    width: "100%"
  },
  modalImage: {

    borderRadius: 10,
    marginBottom: 10
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center'
  }
});
