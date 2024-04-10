import { ScrollView, StyleSheet, Text, View,Image,Share,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Video from 'react-native-video';
export default function ReelsComponents() {
  const data = [
    {
      title: 'Logo',
      url:require('../Images/video/VID_20231116_194412_323.mp4'),
      description:"Todays event at silveroak university it was very good event and experience was awesome."
    },
    {
      title: 'Logo',
      url:require('../Images/video/VID_20231116_194412_323.mp4'),
      description:"Todays event at silveroak university it was very good event and experience was awesome."
    },
]
const [liked, setLiked] = useState(false);
const [saved, setsaved] = useState(false);
const [commentclose, commentopen] = useState(false);
const [share, setshare] = useState(false);


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
  return (
    
    <ScrollView showsVerticalScrollIndicator>
      {data.map((data, index) => (
      <View key={index} style={styles.video}>
        <Video controls={false} volume={100} muted paused={true}
          resizeMode='contain' fullscreen fullscreenOrientation='landscape'
          source={data.url}
          onError={() => console.warn("errorwhile loading")}
          style={{ height: 760, width: "100%" }} />
        <Text style={styles.text}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <View style={styles.boxIcon}>
        <TouchableOpacity onPress={handleLike}>
                <Image style={[styles.icons, liked ? styles.liked : null]} source={require("../Images/icons/like.jpg")} />
              </TouchableOpacity>
          <TouchableOpacity onPress={handlecomment}>
                <Image style={[styles.icons, commentclose ? styles.liked : null]} source={require("../Images/icons/comment.png")} />
              </TouchableOpacity>

              <TouchableOpacity  onPress={handleShare}>
                    <Image style={[styles.icons, share ? styles.liked : null]} source={require("../Images/icons/share.png")} />
              </TouchableOpacity>
                       
              <TouchableOpacity onPress={handlesave}>
                <Image style={[styles.icons, saved ? styles.liked : null]} source={require("../Images/icons/save.webp")} />
              </TouchableOpacity>
        </View>
      </View>))}
     
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  video: {
   height:760,
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor:'black'
    
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
  boxIcon:{
    position: "relative",
    bottom: 400,
    left:330,
    width: '100%',
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 15
  },
liked:{
backgroundColor:'green',
tintColor:'#8ad0d4'
},

  icons:{
    height:40,
    width:40,
    borderRadius:20,
   backgroundColor:"white",
   padding:17,
   paddingVertical:10,
   marginVertical:7
  }
})