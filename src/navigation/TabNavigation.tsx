import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import searchScreen from '../screens/SearchScreen.tsx'
import homePageScreen from '../screens/HomePageScreen.tsx'
import reelsScreen from '../screens/ReelsScreen.tsx'
import profileScreen from '../screens/ProfileScreen.tsx'
import UploadScreen from '../screens/UploadScreen.tsx'

const Tab = createBottomTabNavigator()
export default function TabNavigation() {
  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={{ headerShown: false }}  >
      <Tab.Screen
        name='Home' component={homePageScreen}
        options={{
          tabBarActiveBackgroundColor: '#80d2f2',
          tabBarIcon: ({ focused }) => (
            <View >
              <Image style={{ height: 25, width: 25 }}
                source={require('../assets/icons/home.png')} />
            </View>
          ),
        }} />
      <Tab.Screen name='Search' component={searchScreen}
        options={{
          tabBarActiveBackgroundColor: '#80d2f2',
          tabBarIcon: ({ focused }) => (
            <View >
              <Image style={{ height: 25, width: 25 }}
                source={require('../assets/icons/search.png')} />
            </View>
          ), tabBarHideOnKeyboard: true,
        }} />
      <Tab.Screen name='Upload' component={UploadScreen}
        options={{
          tabBarActiveBackgroundColor: '#80d2f2',
          tabBarIcon: ({ focused }) => (
            <View >
              <Image style={{ height: 25, width: 25, borderRadius: 12.5 }}
                source={require('../assets/icons/upload.png')} />
            </View>
          )
        }} />
      <Tab.Screen name='Reels' component={reelsScreen}
        options={{
          tabBarActiveBackgroundColor: '#80d2f2',
          tabBarIcon: ({ focused }) => (
            <View >
              <Image style={{ height: 25, width: 25 }}
                source={require('../assets/icons/reels.png')} />
            </View>
          )
        }} />
      <Tab.Screen name="Profile" component={profileScreen}
        options={{
          tabBarActiveBackgroundColor: '#80d2f2',
          tabBarIcon: ({ focused }) => (
            <View >
              <Image style={{ height: 25, width: 25, borderRadius: 12.5 }}
                source={require('../assets/img/Logo.jpg')} />
            </View>
          )
        }} />

    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})