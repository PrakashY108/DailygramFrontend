import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, Button } from 'react-native';

export default function Stories() {
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
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.user}>
          <Image style={styles.story} source={require("../Images/img/Logo.jpg")} />
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
            <Text style={styles.storyuser}>prakashyadav.1</Text>
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
    maxHeight: 110,
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
    borderRadius:5,
    marginVertical:5,
    paddingHorizontal:10,
    textAlignVertical:'center'


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
    alignItems: 'center'
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
