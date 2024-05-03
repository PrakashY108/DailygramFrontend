import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Button, Image, View, TouchableOpacity, Share, Modal, ScrollView, Animated, TextInput } from 'react-native';
import { FlatList } from 'react-native';

export default function HomeMiddle() {
  const data = [
    {
      title: 'Car',
      url: require('../Images/img/car.jpg'),
      description: "I have brought a new car guys please like and follow me"
    },
    {
      title: 'Image',
      url: require('../Images/img/images.jpg'),
      description: "I have brought a new camera guys please like and follow me"
    },
    {
      title: 'Logo',
      url: require('../Images/img/Logo.jpg'),
      description: "I had designed a new logo guys please like and follow me"
    },
    {
      title: 'Lordshiva',
      url: require('../Images/img/lordshiva.jpg'),
      description: "This is the image of Lord Shiva captured by my camera"
    },
  ];

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentopen, setCommentOpen] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    setCommentOpen(true);
    console.log("Open comment");
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Dailygram post is here. Check it out!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Sharing");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Error while sharing");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setCommentOpen(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View>
        <Text style={styles.user}>prakashyadav.1</Text>
        <Image style={styles.post} source={item.url} />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleLike}>
            <Image style={[styles.icon, liked ? styles.liked : null]} source={require("../Images/icons/like2.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleComment}>
            <Image style={[styles.icon, commentopen ? styles.liked : null]} source={require("../Images/icons/comment.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Image style={styles.icon} source={require("../Images/icons/share.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Image style={[styles.icon, saved ? styles.saved : null]} source={require("../Images/icons/save.webp")} />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>a minute ago</Text>
      </View>

      {/* Modal starts here */}
      <Modal
        visible={commentopen}
        style={styles.modal}
        animationType='slide'
        transparent={true}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={{color:"black",fontSize:20,marginHorizontal:40,marginVertical:20}}>Comments</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text>X</Text>
          </TouchableOpacity>
          <ScrollView style={{ margin: 2}}>
            {/* comment */}
            <View style={styles.commentcontainer}>
              <View style={styles.commentuser}><Image style={styles.userphoto} source={require("../Images/img/Logo.jpg")} /><Text style={{ color: "black", marginLeft: 10, fontSize: 15 }}>prakash yadav</Text><Text style={{marginHorizontal:4}}>3 hour ago</Text></View>
              <View style={styles.comment}><Text style={{marginLeft:10}}>Very nice car Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, eos?</Text></View>
              <View style={{flex:1,flexDirection:"row"}}><Image style={{height:20,width:20,marginLeft:25}} source={require("../Images/icons/like2.png")}/><Text style={{marginHorizontal:5}}>35</Text>
              <Image style={{height:20,width:20,marginLeft:25}} source={require("../Images/icons/share.png")}/>
              </View>
            </View>
            {/* comment */}
            <View style={styles.commentcontainer}>
              <View style={styles.commentuser}><Image style={styles.userphoto} source={require("../Images/img/lordshiva.jpg")} /><Text style={{ color: "black", marginLeft: 10, fontSize: 15 }}>Ramesh </Text><Text style={{marginHorizontal:4}}>1 hour ago</Text></View>
              <View style={styles.comment}><Text style={{marginLeft:10}}>Very nice car Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, eos?</Text></View>
              <View style={{flex:1,flexDirection:"row"}}><Image style={{height:20,width:20,marginLeft:25}} source={require("../Images/icons/like2.png")}/><Text style={{marginHorizontal:5}}>30</Text>
              <Image style={{height:20,width:20,marginLeft:25}} source={require("../Images/icons/share.png")}/>
              </View>
            </View>
            {/* comment */}
            <View style={styles.commentcontainer}>
              <View style={styles.commentuser}><Image style={styles.userphoto} source={require("../Images/img/object.png")} /><Text style={{ color: "black", marginLeft: 10, fontSize: 15 }}>Dinesh yadav</Text><Text style={{marginHorizontal:4}}>30 min ago</Text></View>
              <View style={styles.comment}><Text style={{marginLeft:10}}>Very nice car Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, eos?</Text></View>
              <View style={{flex:1,flexDirection:"row"}}><Image style={{height:20,width:20,marginLeft:25}} source={require("../Images/icons/like2.png")}/><Text style={{marginHorizontal:5}}>15</Text>
              <Image style={{height:20,width:20,marginLeft:25}} source={require("../Images/icons/share.png")}/>
              </View>
            </View>
            {/* comment */}
            <View style={styles.commentcontainer}>
              <View style={styles.commentuser}><Image style={styles.userphoto} source={require("../Images/img/images.jpg")} /><Text style={{ color: "black", marginLeft: 10, fontSize: 15 }}>Mahesh</Text><Text style={{marginHorizontal:4}}>3 min ago</Text></View>
              <View style={styles.comment}><Text style={{marginLeft:10}}>Very nice car Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, eos?</Text></View>
              <View style={{flex:1,flexDirection:"row"}}><Image style={{height:20,width:20,marginLeft:25}} source={require("../Images/icons/like2.png")}/><Text style={{marginHorizontal:5}}>7</Text>
              <Image style={{height:20,width:20,marginLeft:25}} source={require("../Images/icons/share.png")}/>
              </View>
            </View>
          </ScrollView>
          <View style={{}}><TextInput style={{margin:10,borderColor:"black",borderRadius:5,borderWidth:1,height:40,fontSize:16}} placeholder='Enter your Comment here'/>
          <Button title='Post' color={"lightblue"}/></View>
        </SafeAreaView>
      </Modal>
    </View>
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  post: {
    margin: 10,
    width: "auto",
    marginHorizontal: 2,
    backgroundColor: "#acdee6"
  },
  user: {
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
  iconContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
  },
  liked: {
    tintColor: 'red',
  },
  saved: {
    tintColor: 'blue'
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    maxHeight: 100,
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: 'red'
  },
  safeArea: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 380,
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: 'white'
  },
  closeButton: {
    alignSelf: 'flex-end', 
    marginHorizontal: 20
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: 'white'
  },
  commentcontainer: {
    height: 110,
    marginHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10
  },
  commentuser: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 45,
    justifyContent: 'flex-start',
    alignItems: "center"
  },
  userphoto: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 15
  },
  comment: {
    height: 60,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop:15
  }
});
