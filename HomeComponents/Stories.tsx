import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';

export default function Stories() {
  const data = [
    {
      title: 'Car',
      url: require('../Images/img/car.jpg')
    },
    {
      title: 'Image',
      url: require('../Images/img/images.jpg')
    },
    {
      title: 'Logo',
      url: require('../Images/img/Logo.jpg')
    },
    {
      title: 'Lordshiva',
      url: require('../Images/img/lordshiva.jpg')
    },
    {
      title: 'Lordshiva',
      url: require('../Images/img/lordshiva.jpg')
    },
    {
      title: 'Lordshiva',
      url: require('../Images/img/lordshiva.jpg')
    },

  ];

  return (
    <SafeAreaView>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.user}>
              <Image style={styles.story} source={require("../Images/img/Logo.jpg")} />
              <Text style={styles.storyText}>Your story</Text>
            </View>
        <View style={styles.stories}>
          {data.map((data, index) => (
            <View key={index} style={styles.user}>
              <Image style={styles.story} source={data.url} />
              <Text style={styles.storyText}>{data.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
  }
});
