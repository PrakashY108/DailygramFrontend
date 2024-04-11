import { ScrollView, StyleSheet, Text, Image, View, TouchableOpacity, Share } from 'react-native'
import React, { useState } from 'react'

export default function HomeMain() {
  const data = [
    {
      title: 'Car',
      url: require('../Images/img/car.jpg'),
      description: "I have brought new car guys please like and follow me"
    },
    {
      title: 'Image',
      url: require('../Images/img/images.jpg'),
      description: "I have brought new camera  guys please like and follow me"
    },
    {
      title: 'Logo',
      url: require('../Images/img/Logo.jpg'),
      description: "I had designed new logo guys please like and follow me"
    },
    {
      title: 'Lordshiva',
      url: require('../Images/img/lordshiva.jpg'),
      description: "this is the image of lord shiva captured by my camera"
    },

  ];
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
    <ScrollView horizontal={false} showsVerticalScrollIndicator>
      <View style={styles.container}>
        {data.map((data, index) => (
          <View>
            <View key={index}><Text style={styles.user}>prakashyadav.1</Text></View>
            <View >
              <Image style={styles.post} source={data.url} />

            </View>
            <View style={styles.iconcontainer}><View style={styles.iconcontainer}>
              <TouchableOpacity onPress={handleLike}>
                <Image style={[styles.icon, liked ? styles.liked : null]} source={require("../Images/icons/like2.png")} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlecomment}>
                <Image style={[styles.icon, commentclose ? styles.liked : null]} source={require("../Images/icons/comment.png")} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare}>
                <Image style={[styles.icon, share ? styles.liked : null]} source={require("../Images/icons/share.png")} />
              </TouchableOpacity>

            </View>

              <TouchableOpacity onPress={handlesave}>
                <Image style={[styles.icon, saved ? styles.saved : null]} source={require("../Images/icons/save.webp")} />
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>{data.description}
            </Text>
            <Text style={styles.time}>a minute ago</Text>
          </View>))}
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  hrline: {
    opacity: 0.5,
    height: 1,
    backgroundColor: 'grey',
    marginTop: 15,
  },
  post: {
    margin: 10,
    // height: 420,
    width: "auto",
    marginHorizontal: 2,

    backgroundColor: "#acdee6"
  },
  btn: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 0
  },
  user: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 17,
  },
  description: {
    color: 'black',
    maxHeight: 30,
    marginHorizontal: 10
  },
  time: {
    marginHorizontal: 10
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 11,
    marginHorizontal: 6,
    left: 7


  },
  iconcontainer: {
    flex: 1,
    flexDirection: 'row',

  },
  liked: {
    tintColor: 'red',

  },
  saved: {
    tintColor: 'blue'
  }
})