import { StyleSheet, Text, Touchable, Image, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchComponents from './Components/SearchComponents'
import HomePage from './Components/HomePage'
import ReelsComponents from './Components/ReelsComponents'
import ProfileComponents from './Components/ProfileComponents'
import UploadComponents from './Components/UploadComponents'

const Tab = createBottomTabNavigator()
export default function TabNavigation() {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}  >
      <Tab.Screen
        name='Home' component={HomePage} options={{
          tabBarActiveBackgroundColor: '#80d2f2',
          tabBarIcon: ({ focused }) => (
            <View >
              <Image style={{ height: 25, width: 25 }} source={require('./Images/icons/home.png')} />
            </View>
          ),
        }} />
      <Tab.Screen name='Search'  component={SearchComponents} options={{
        tabBarActiveBackgroundColor: '#80d2f2',
        tabBarIcon: ({ focused }) => (
          <View >
            <Image style={{ height: 25, width: 25 }} source={require('./Images/icons/search.png')} />
          </View>
        ),tabBarHideOnKeyboard: true,
      }} />
      <Tab.Screen name='Upload' component={UploadComponents} options={{
        tabBarActiveBackgroundColor: '#80d2f2',
        tabBarIcon: ({ focused }) => (
          <View >
            <Image style={{ height: 25, width: 25, borderRadius: 12.5 }} source={require('./Images/icons/upload.png')} />
          </View>
        )
      }} />
      <Tab.Screen name='Reels' component={ReelsComponents} options={{
        tabBarActiveBackgroundColor: '#80d2f2',
        tabBarIcon: ({ focused }) => (
          <View >
            <Image style={{ height: 25, width: 25 }} source={require('./Images/icons/reels.png')} />
          </View>
        )
      }} />
      <Tab.Screen name="Profile" component={ProfileComponents} options={{
        tabBarActiveBackgroundColor: '#80d2f2',
        tabBarIcon: ({ focused }) => (
          <View >
            <Image style={{ height: 25, width: 25, borderRadius: 12.5 }} source={require('./Images/img/Logo.jpg')} />
          </View>
        )
      }} />

    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})