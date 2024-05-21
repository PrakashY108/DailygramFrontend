import { ScrollView, StyleSheet, Text, View, Image, Share, TouchableOpacity, FlatList, Dimensions, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Video from 'react-native-video';
const { height, width } = Dimensions.get("screen")
export default function ReelsComponents() {
  const data = [
    {
      title: 'Title here',
      url: require('../Images/video/VID_20231116_194412_323.mp4'),
      description: "Todays event at silveroak university it was very good event and experience was awesome."
    },
    {
      title: 'Title here',
      url: require('../Images/video/VID_20231116_194412_323.mp4'),
      description: "Todays event at silveroak university it was very good event and experience was awesome."
    },
    {
      title: 'Title here',
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

      <Video
        controls={false}
        volume={100}
        paused={paused}
        resizeMode='cover'
        fullscreenOrientation='portrait'
        source={item.url}
        onError={() => console.warn("error while loading")}
        style={{ height: "100%", width: width, padding: 0, margin: 5, position: 'absolute', top: 0 }}
      />
      <View style={{position:"absolute",top:0,margin:20}}>
        <Text style={{fontSize:20,color:'white'}}>Reels</Text>
      </View>
      <TouchableOpacity style={styles.pause} onPress={handlepause}>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={{flexDirection:"row",alignItems:'center',height:"20%",top:"32%"}}>
          <Image style={{height:30,width:30,borderRadius:15,marginLeft:12}} source={require("../Images/img/Logo.jpg")}/>
          <Text style={{color:'white',fontSize:20,fontWeight:"700",marginHorizontal:10}}>Prakash yadav</Text>
        </View>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.boxIcon}>
          <TouchableOpacity onPress={handleLike}>
            <Image style={[styles.icons, liked ? styles.liked : null]} source={require("../Images/icons/like2.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlecomment}>
            <Image style={[styles.icons, commentclose ? styles.liked : null]} source={require("../Images/icons/comment.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Image style={[styles.icons, share ? styles.liked : null]} source={require("../Images/icons/share.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlesave}>
          </TouchableOpacity>
          <Image style={[styles.icons, saved ? styles.liked : null]} source={require("../Images/icons/save.webp")} />
        </View>

      </View>
      <View style={{ position: "absolute", bottom: 0, margin: 0 }}>
      </View>
    </View>)

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
    height: height-110,
    width: width,
    backgroundColor: 'black',
    resizeMode: "cover",

  },
  pause: {
    height: height, 
    width: width,
    position: 'absolute',zIndex:1
  },
  container: {
    height: "44%",
    width: width,
    marginHorizontal: 5,
    position: 'absolute',
    bottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 10,
    top:"45%",
  
  },
  description: {
    color: "white",
    fontWeight: "400",
    paddingHorizontal: 10,
   top:"45%",


  },
  boxIcon: {
    position: "absolute",
    right: 15,
    top:0,
    zIndex:1
  

  },
  liked: {
    tintColor: 'blue'
  },
  icons: {
    height: 40,
    width: 40,
    borderRadius: 18,
    backgroundColor: "white",
    padding: 17,
    paddingVertical: 10,
    marginVertical: 7
  }
})