import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import FollowingComponents from '../components/FollowingComponents'
import FollowComponents from '../components/FollowerComponents'
const Tab = createMaterialTopTabNavigator()
export default function TopTabNavigation() {
    return (

        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: "blue", tabBarInactiveTintColor: "black", tabBarIndicatorContainerStyle: { backgroundColor: "white" }, tabBarLabelStyle: { fontSize: 15 },
            tabBarStyle: { backgroundColor: 'blue',height:40,justifyContent:"center",paddingBottom:4},tabBarIndicatorStyle:{backgroundColor:"blue"},  
        }} >
            <Tab.Screen name="Followers" component={FollowComponents}></Tab.Screen>
            <Tab.Screen name="Following" component={FollowingComponents}></Tab.Screen>
        </Tab.Navigator>


    )
}

