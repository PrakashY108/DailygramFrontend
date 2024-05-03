import { ScrollView, StyleSheet, Text, View, Image, Share, TouchableOpacity,FlatList } from 'react-native'
import React, { useState } from 'react'
import Video from 'react-native-video';
export default function ReelsComponents() {
  const data = [
    {
      title: 'Logo',
      url: require('../Images/video/VID_20231116_194412_323.mp4'),
      description: "Todays event at silveroak university it was very good event and experience was awesome."
    },
    {
      title: 'Logo',
      url: require('../Images/video/VID_20231116_194412_323.mp4'),
      description: "Todays event at silveroak university it was very good event and experience was awesome."
    },
  ]
  const [liked, setLiked] = useState(false);
  const [saved, setsaved] = useState(false);
  const [commentclose, commentopen] = useState(false);
  const [share, setshare] = useState(false);
  const [paused, setpaused] = useState(false);


  const handleLike = () => {
    setLiked(!liked);
  };
  const handlecomment = () => {
    commentopen(!commentclose);
    console.log("open comment");

  };
  const handlesave = () => {
    setsaved(!saved);
  };
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Dailygram post is here Check it out!!!!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {

          console.log("Sharing");
        } else {

        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Error while sharing");

      }
    } catch (error) {
      console.log(error);

    }
  };
  const handlepause = () => {
    console.log("kdsbfhswa");
    
    if (!paused) {
      console.log("Pausing video");
      setpaused(true);
      console.log(paused);
      
    } else {
      console.log("Resuming video");
      setpaused(false);
      console.log(paused);
      
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.video}>
      <TouchableOpacity onPress={handlepause}>
        <Video 
        controls={false}
        volume={100}
       
        paused={paused}
       
        resizeMode='contain'
        fullscreen
        fullscreenOrientation='landscape'
        source={item.url}
        onError={() => console.warn("error while loading")}
        style={{ height: 760, width: "100%" }}
      />
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.boxIcon}>
        <TouchableOpacity onPress={handleLike}>
          <Image style={[styles.icons, liked ? styles.liked : null]} source={require("../Images/icons/like.jpg")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlecomment}>
          <Image style={[styles.icons, commentclose ? styles.liked : null]} source={require("../Images/icons/comment.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Image style={[styles.icons, share ? styles.liked : null]} source={require("../Images/icons/share.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlesave}>
          <Image style={[styles.icons, saved ? styles.liked : null]} source={require("../Images/icons/save.webp")} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    </View>
  );
  return (
  
      <FlatList
        data={data}
        pagingEnabled
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
  
  );
}

const styles = StyleSheet.create({
  video: {
    height: 760,
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: 'black'

  },
  text: {
    position: "relative",
    bottom: 100,
    width: '100%',
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 15,
    flexWrap: 'wrap',
    maxHeight: 40

  },
  description: {
    position: "relative",
    bottom: 100,
    width: '100%',
    color: 'white',
    fontSize: 15,
    paddingHorizontal: 15,
    flexWrap: 'wrap',
    maxHeight: 40,
    paddingTop: 10

  },
  boxIcon: {
    position: "relative",
    bottom: 400,
    left: 330,
    width: '100%',
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 15
  },
  liked: {
    backgroundColor: 'green',
    tintColor: '#8ad0d4'
  },

  icons: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 17,
    paddingVertical: 10,
    marginVertical: 7
  }
})