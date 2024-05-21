
import { View, Text, ScrollView, Image, Button, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import UserPosts from './UserPosts';
import { useUser } from '../context/Usecontext';

import { useNavigation } from '@react-navigation/native';

const ProfileComponents = () => {
  const navigation = useNavigation();
  const { userData, setuserData } = useUser();
  console.log(userData);

  const handleEdit = () => {
    navigation.navigate("EditProfile")
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ maxHeight: 50, width: "100%", backgroundColor: "#80d2f2", flex: 1, flexDirection: "row" }}><Text style={{ fontSize: 35, fontWeight: "bold", color: "black", width: "70%", marginLeft: 10 }}>Dailygram</Text>
        
        <TouchableOpacity onPress={()=>navigation.navigate("Menu")}><Image style={{ height: 40, width: 40, marginLeft: 50, marginVertical: 5 }} source={require("../Images/icons/menu-bar.png")} />
          </TouchableOpacity>
          </View>
      <View style={styles.top}>
        <Image style={styles.img} resizeMode='contain' source={require("../Images/img/Logo.jpg")} />
        <View style={styles.box}>
          <Text>{userData.posts}</Text>
          <Text>posts</Text>
        </View>
        <View style={styles.box}>
          <TouchableOpacity onPress={() => navigation.navigate("FollowPage")}>
            <Text>{userData.follower}</Text>
            <Text>follower</Text></TouchableOpacity>
        </View>
        <View style={styles.box}>
          <TouchableOpacity onPress={() => navigation.navigate("FollowPage")}><Text>{userData.following}</Text>
            <Text>following</Text></TouchableOpacity>
        </View>
      </View>
      <Text style={styles.text}>{userData.username}</Text>
      <Text style={{ height: 50, color: "black", marginHorizontal: "7%", fontWeight: "300" }}>{userData.Bio}</Text>
      <View style={{ marginTop: 5, width: "80%", marginHorizontal: "10%" }}>
        <Button color={"#26e0d4"} onPress={handleEdit} title="Edit Profile" />
      </View>
      <UserPosts />
    </View>)
};



export default ProfileComponents;

const styles = StyleSheet.create({
  top: {
    maxHeight: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: "7%",
    marginTop: "3%",
    alignItems: "center"

  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  box: {

  },
  post: {
    height: 260,
    width: 150,
    borderWidth: 2,
    borderColor: 'white',
  },
  postImage: {
    height: 300,
    width: 200,
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 30,
  }, text: {
    marginHorizontal: "7%",
    fontSize: 20,
    color: "black"
  }
});
