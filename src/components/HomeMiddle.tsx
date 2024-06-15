import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Button, Image, View, TouchableOpacity, Share, Modal, ScrollView, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import { getaccessTokenFromAsync } from "../utils/getaccessTokenfromAsync"
export default function HomeMiddle() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentopen, setCommentOpen] = useState(false);
  const [Posts, setPosts] = useState([]);
  const [follow, setfollow] = useState("follow");


  useEffect(() => {
    fetchallPosts()
  }, [])
  const fetchallPosts = async () => {
    try {
      const accessToken = await getaccessTokenFromAsync()
      console.log(accessToken);
      const response = await axios.post("http://10.0.2.2:6000/fetch/allposts", { accessToken });
      await setPosts(response.data)
      console.log("Found posts", Posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };  




  const handleLike = async (id) => {
    const postid = id;
    console.log(postid);
    
    if (!liked) {
      const response = await axios.post(`http://10.0.2.2:6000/posts/${postid}/likes`, { task: "like" })
      console.log(response.data);

      setLiked(true)
    }
    else {
      const response = await axios.post(`http://10.0.2.2:6000/posts/${postid}/likes`, { task: "dislike" })
      setLiked(false)
      console.log(response.data);

    } 
  };

  const handleComment = () => {
    setCommentOpen(true);
    console.log("Open comment");
  };


  const handleSave = async (id) => {
    const postid = id;
    try {
      if (!saved) {
        const response = await axios.post(`http://10.0.2.2:6000/posts/${postid}/saves`, { task: "save" })
        console.log(response.data);
        setSaved(true)

      }
      else {
        const response = await axios.post(`http://10.0.2.2:6000/posts/${postid}/saves`, { task: "unsave" })
        console.log(response.data);
        setSaved(false)
      }
    } catch (error) {
      console.log(error);

    }

  };

  const handleShare = async (id) => {
    const postid = id;

    try {
      const result = await Share.share({
        message: 'Dailygram post is here. Check it out!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared successfully");

          const response = await axios.post(`http://10.0.2.2:6000/posts/${postid}/shares`)
          console.log(response.data);
        } else {
          console.log("Sharing");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
 
  const handleClose = () => {
    setCommentOpen(false);
  };
  const handlefollow = async (following: Number) => {
    try {
      const accessToken = await  getaccessTokenFromAsync()

      if (follow === "follow") {
        console.log("following");
        const followingtoid = following;
        console.log(followingtoid);
        console.log("accessToken",accessToken);
        const response = await axios.post(`http://10.0.2.2:6000/userid/${followingtoid}/follow`, { accessToken })
        console.log(response.data);
        setfollow("following")
      } else {
        console.log("Unfollowing");
        const followingtoid = following;
        console.log(followingtoid);
        console.log("accessToken",accessToken);
        const response = await axios.post(`http://10.0.2.2:6000/userid/${followingtoid}/unfollow`, { accessToken })
        console.log(response.data);
        setfollow("follow")
      }
    } catch (error) {
      console.log("Error while following", error);

    }
  } 
  const renderItem = ({ item }) => (

    <SafeAreaView style={styles.container}> 
      <View style={{ marginTop: 5 }}> 
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.user}>{item.username}</Text>
          <TouchableOpacity onPress={() => handlefollow(item.userid)}>
            <View style={{ borderRadius: 6, borderWidth: 1, borderColor: "lightblue", padding: 2, paddingHorizontal: 5 }}><Text style={{ fontWeight: "700" }}>{follow}</Text></View>
          </TouchableOpacity>
        </View> 
        <Image resizeMethod='auto' style={styles.post} source={{uri :item.url}} />
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icontouchables} onPress={() => { item.likes,handleLike(item.postid) }}>
            <Image style={[styles.icon, liked ? styles.liked : null]} source={require("../assets/icons/like2.png")} />
            <Text style={styles.iconcount}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icontouchables} onPress={handleComment}>
            <Image style={[styles.icon, commentopen ? styles.liked : null]} source={require("../assets/icons/comment.png")} />
            <Text style={styles.iconcount}> {item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icontouchables} onPress={() => { handleShare(item.postid) }}>
            <Image style={styles.icon} source={require("../assets/icons/share.png")} />
            <Text style={styles.iconcount}>{item.shares}</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.icontouchables} onPress={() => { handleSave(item.postid) }} >
            <Image style={[styles.icon, saved ? styles.saved : null]} source={require("../assets/icons/save.webp")} />
            <Text style={styles.iconcount}>{item.saved} </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>a minute ago</Text>
      </View>

      {/* Modal starts here */}
      <Modal
        visible={commentopen}
        style={styles.modal}
        transparent={true}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={{ color: "black", fontSize: 20, marginHorizontal: 40, marginVertical: 20 }}>Comments</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text>X</Text>
          </TouchableOpacity>
          <ScrollView style={{ margin: 2 }}>
            {/* comment */}
            <View style={styles.commentcontainer}>
              <View style={styles.commentuser}><Image style={styles.userphoto} source={require("../assets/img/Logo.jpg")} /><Text style={{ color: "black", marginLeft: 10, fontSize: 15 }}>prakash yadav</Text><Text style={{ marginHorizontal: 4 }}>3 hour ago</Text></View>
              <View style={styles.comment}><Text style={{ marginLeft: 10 }}>Very nice car Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, eos?</Text></View>
              <View style={{ flex: 1, flexDirection: "row" }}><Image style={{ height: 20, width: 20, marginLeft: 25 }} source={require("../assets/icons/like2.png")} /><Text style={{ marginHorizontal: 5 }}>35</Text>
                <Image style={{ height: 20, width: 20, marginLeft: 25 }} source={require("../assets/icons/share.png")} />
              </View>
            </View>
          </ScrollView>
          <View style={{}}><TextInput style={{ margin: 10, borderColor: "black", borderRadius: 5, borderWidth: 1, height: 40, fontSize: 16 }} placeholder='Enter your Comment here' />
            <Button title='Post' color={"lightblue"} /></View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
 
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={Posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom:15
  },
  post: {
    margin: 10,
    height: 400,
    width: "auto",
    marginHorizontal: 2,
    backgroundColor: "#acdee6"
  },
  user: {
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 17,
    alignItems: "center"
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
    tintColor: 'green',
  },
  saved: {
    tintColor: 'green'
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
    marginTop: 15
  },
  iconcount: {
    fontSize: 20,
    marginLeft: 5,
    marginRight: 10

  },
  icontouchables: {
    height: 40,

    flexDirection: 'row',
    margin: 2,
    gap: 2,
    alignItems: "center",
  }

});
