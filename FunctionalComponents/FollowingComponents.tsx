import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-animatable'

export default function FollowingComponents() {
  return (
    <SafeAreaView style={{ marginTop: 10 }}>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', alignItems: "center", maxHeight: 50, width: "100%", margin: 2, position: "absolute" }}>
        <Image style={{ height: 50, width: 50, borderRadius: 25, margin: 15 }} source={require("../Images/img/car.jpg")} />
        <View style={{ width: "55%" }}>
          <Text style={{ fontSize: 18, color: "black" }}>prakash</Text>
          <Text style={{ fontSize: 15, fontWeight: "300" }}>prakashyadav</Text>
        </View>
        <View>
          <TouchableOpacity>
            <View style={{ borderRadius: 8, borderColor: "blue", backgroundColor: "#80d2f2", height: 30, width: 80, alignItems: "center", justifyContent: "center", }}><Text style={{color:"white"}}>Following</Text></View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})