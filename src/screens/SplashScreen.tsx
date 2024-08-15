import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import dotenvconfig from '../config/dotenvconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SplashScreen({navigation}) {
    const [spinner, setSpinner] = useState(true);
   

    useEffect(() => {
        handleNavigation()
        setTimeout(() => {
            setSpinner(false)
        }, 2000);
    })
    useEffect(() => {
        const timer = setTimeout(() => {
     
        }, 3000);
   
        // Clean up the timer to avoid memory leaks
        return () => clearTimeout(timer);
    }, []);

    const handleNavigation = async() => {
        try {
         const accessToken=  await AsyncStorage.getItem("accessToken")
         console.log("Authorization", accessToken);
         if(accessToken==null){
            navigation.replace("LoginUserScreen");
         }
         await axios.post(`${dotenvconfig.API_URL}/verify/token`, 
    null,
    {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`, 
        },
    }
);
            console.log("accessToken",accessToken);
            
            navigation.replace("DailygramScreen");
        } catch (error) {
            console.log(error);
            navigation.replace("LoginUserScreen");
        }
    };

    return (<>
        <View style={{ backgroundColor: '#f6fffe', height: 150 }}></View>
        <Animatable.View onAnimationEnd={handleNavigation} style={{ flex: 1, alignItems: 'center', backgroundColor: '#f5fffe' }}>
            <Animatable.Image animation="slideInDown" style={{ height: 200, width: 250, resizeMode: 'cover', borderRadius: 85 }} source={require('../assets/img/Logo.jpg')} />
            <Animatable.Text animation="bounceInRight" style={{ fontSize: 50, fontWeight: '700', padding: 30, color: 'green' }}>Dailygram</Animatable.Text>
            <Animatable.Text animation="bounceInLeft" style={{ fontSize: 25, fontWeight: '300', color: 'blue' }}>Social Media App</Animatable.Text>
            {spinner ? <ActivityIndicator style={{ padding: 50 }} size="large" color="blue" /> : null}
        </Animatable.View></>
    );
}
