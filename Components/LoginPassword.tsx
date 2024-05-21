
import React, { useState } from "react";
import {
    View, Text, ScrollView, SafeAreaView, StyleSheet, Button, Image, TouchableOpacity, TextInput, ActivityIndicator
} from "react-native";
import axios from "axios";


// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootScreenPramProps } from '../StackNavigation'
import { CommonActions, StackActions } from "@react-navigation/native";
type Passwordprop = NativeStackScreenProps<RootScreenPramProps, 'Dailygram'>

export default function LoginPassword({ navigation, route }: Passwordprop) {
    const [password, setpassword] = useState("")
    const [PasswordError, setPasswordError] = useState("")
    const [isloading, setisloading] = useState(false)

    
    return (
        <ScrollView showsVerticalScrollIndicator={true}
            horizontal={false}>
            <SafeAreaView>
               
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        flex: 1,
        justifyContent: 'center',
        width: 410,
        alignSelf: "center",
        padding: 40,
        marginTop: 45,
        borderColor: "transparent",
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 10,
    },

    title: {
        color: "black",
        fontSize: 50
    },

    link: {
        color: 'blue'

    },
    logo: {
        height: 120,
        width: 120,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 30
    },
    input: {
        color: "black",
        width: 330,
        flex: 1,
        borderRadius: 10,
        padding: 8,
        marginBottom: 8,
        justifyContent: "center",
        alignItems: "center",
        borderColor: 'black',
        borderWidth: 1
    }

})