import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, TouchableWithoutFeedbackBase, Dimensions } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { getaccessTokenFromAsync } from '../utils/getaccessTokenfromAsync';
const { height, width } = Dimensions.get("window")
export default function Stories() {
  const [picked, setpicked] = useState()
  const [Stories, setStories] = useState([])
  const [selectedStory, setSelectedStory] = useState(null);
  const [current, setcurrent] = useState(0);
  useEffect(() => {
    fetchallStories()

  }, [])

  const fetchallStories = async () => {
    try {
      const accessToken = await getaccessTokenFromAsync()
      const response = await axios.post("http://10.0.2.2:6000/fetch/allstories",null, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Include accessToken in headers
        }
      })
      setStories(response.data);
      console.log("Stories",response.data);
      

    } catch (error) {
      console.log("error while fetching stories", error);

    }
  }
  const pickReels = async () => {
    try {

      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      setpicked(file);

      console.log("Image picked successfully");
      const userid = userData.userId
      await uploadStory(file, userid);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('You cancelled the pick');
      } else {
        console.log('Error while picking the file: ' + err);
      }
    }
  };

  const uploadStory = async (file, userid) => {
    try {
      console.log(userid)
      const data = file[0];
      const formData = new FormData();
      console.log(data)
      formData.append('file', {
        uri: data.uri,
        name: data.name,
        type: data.type,
        url: userid

      });
      formData.append('id', userid);
      formData.append('name', "stories");
      const response = await axios.post("http://10.0.2.2:6000/upload/cloudinary", formData, {
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
      title: 'Lordshiva',
      url: require('../assets/img/lordshiva.jpg'),
      story: 'Mauris ullamcorper varius turpis, id semper ipsum ultrices a. Integer vitae justo magna.',
    },
    {
      title: 'Car',
      url: require('../assets/img/car.jpg'),
      story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ultrices arcu. Mauris ullamcorper varius turpis, id semper ipsum ultrices a. Integer vitae justo magna.'
    },
    {
      title: 'Image',
      url: require('../assets/img/images.jpg'),
      story: 'Sed vitae ultrices arcu. Mauris ullamcorper varius turpis, id semper ipsum ultrices a. Integer vitae justo magna.'
    },
    {
      title: 'Logo',
      url: require('../assets/img/Logo.jpg'),
      story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ultrices arcu.'
    },

    {
      title: 'Lordshiva',
      url: require('../assets/img/lordshiva.jpg'),
      story: 'Mauris ullamcorper varius turpis, id semper ipsum ultrices a. Integer vitae justo magna.',
    },
    {
      title: 'Car',
      url: require('../assets/img/car.jpg'),
      story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ultrices arcu. Mauris ullamcorper varius turpis, id semper ipsum ultrices a. Integer vitae justo magna.'
    },
    {
      title: 'Image',
      url: require('../assets/img/images.jpg'),
      story: 'Sed vitae ultrices arcu. Mauris ullamcorper varius turpis, id semper ipsum ultrices a. Integer vitae justo magna.'
    },


  ];


  const handleStoryPress = (story) => {
    setSelectedStory(story);
  };

  const handleCloseModal = () => {
    setSelectedStory(null)
  };
  const handleincrease = () => {
    if (current != data.length - 1) {
      setcurrent(current + 1)
    }
    if (current == data.length) {
      handleCloseModal()
    }

  }
  const handledecrease = () => {
    if (current > 0) {
      setcurrent(current - 1)
    }
  }
  return (
    <SafeAreaView>
      <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

        <View style={styles.user}>
          <Image style={styles.story} source={require("../assets/img/Logo.jpg")} />
          <TouchableOpacity onPress={pickReels} style={{ position: "relative", flex: 1, alignSelf: "flex-end", top: 20 }}>
            <Image style={{
              height: 36, width: 36, backgroundColor: "white",
              borderRadius: 18, borderWidth: 1, position: "absolute", flex: 1, alignSelf: "flex-end", bottom: 28
            }} source={require("../assets/icons/pngwing.com.png")} />
          </TouchableOpacity>
          <Text style={styles.storyText}>Your story</Text >
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
      <Modal visible={selectedStory !== null} animationType="none" >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.storyindicatorcontainer}>
            {data.map((item, index) => {
              return (
                <View key={index} style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.5)", height: 3, marginLeft: 3 }}></View>)
            })}
          </View>
          <View >
            <View style={styles.userdetailcontainer}>
              <Image style={{ height: 40, width: 40, borderRadius: 20 }} source={data[current].url}></Image>
              <Text style={{ color: 'white', marginLeft: 20, fontSize: 25 }}>{data[current].title}</Text>
            </View>

            <Image style={{ height: "90%", width: width, resizeMode: "cover" }} source={data[current].url} />
          </View>

          <TouchableOpacity onPress={handledecrease} style={{ position: "absolute", height: height, width: "40%", left: 0, top: 0 }}  >
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseModal} style={{ position: "absolute", height: height, width: "20%", left: "40%", right: "40%" }}  >
          </TouchableOpacity>
          <TouchableOpacity onPress={handleincrease} style={{ position: "absolute", height: height, width: "40%", right: 0, top: 0 }}  >
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
    fontSize: 20

  },
  story: {
    maxHeight: 76,
    minHeight: 76,
    maxWidth: 76,
    minWidth: 76,
    borderRadius: 38,
    borderColor: 'green',
    borderWidth: 3,
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
    backgroundColor: "black"

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
  },
  storyindicatorcontainer: {
    width: '100%',
    height: 7,
    position: "absolute",
    top: "2.5%",
    zIndex: 1,
    alignItems: "center",
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 2
  },
  userdetailcontainer: {
    backgroundColor: "rgba(255,255,255,0.01)",
    alignItems: 'center',
    marginHorizontal: "5%",
    zIndex: 1,
    height: 40,
    margin: 5,
    position: "absolute",
    top: 5,
    width: '90%',
    flexDirection: 'row',
    borderRadius: 10
  }

}
);
