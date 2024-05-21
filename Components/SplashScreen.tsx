import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native'; // Import the hook for navigation

export default function SplashScreen() {
    const [spinner, setSpinner] = useState(true);
    const navigation = useNavigation(); // Get the navigation object using the hook

    useEffect(() => {
        setTimeout(() => {
            setSpinner(false)
        }, 2000);
    })
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 2500);

        // Clean up the timer to avoid memory leaks
        return () => clearTimeout(timer);
    }, [navigation]);

    const handleNavigation = () => {
        console.log("hello");
    };

    return (<>
        <View style={{ backgroundColor: '#f6fffe', height: 150 }}></View>
        <Animatable.View onAnimationEnd={handleNavigation} style={{ flex: 1, alignItems: 'center', backgroundColor: '#f5fffe' }}>
            <Animatable.Image animation="slideInDown" style={{ height: 200, width: 250, resizeMode: 'cover', borderRadius: 85 }} source={require('../Images/img/Logo.jpg')} />
            <Animatable.Text animation="bounceInRight" style={{ fontSize: 50, fontWeight: '700', padding: 30, color: 'green' }}>Dailygram</Animatable.Text>
            <Animatable.Text animation="bounceInLeft" style={{ fontSize: 25, fontWeight: '300', color: 'blue' }}>Social Media App</Animatable.Text>
            {spinner ? <ActivityIndicator style={{ padding: 50 }} size="large" color="blue" /> : null}
        </Animatable.View></>
    );
}
