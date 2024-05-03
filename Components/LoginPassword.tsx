
import React, { useState } from "react";
import {
    View, Text, ScrollView, SafeAreaView, StyleSheet, Button, Image, TouchableOpacity, TextInput, ActivityIndicator
} from "react-native";
import axios from "axios";
import { useUser } from '../context/Usecontext';

// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootScreenPramProps } from '../StackNavigation'
import { CommonActions, StackActions } from "@react-navigation/native";
type Passwordprop = NativeStackScreenProps<RootScreenPramProps, 'Dailygram'>

export default function LoginPassword({ navigation, route }: Passwordprop) {
    const [password, setpassword] = useState("")
    const [PasswordError, setPasswordError] = useState("")
    const [isloading, setisloading] = useState(false)

    const handlePassword = () => {
        setisloading(true)
        console.log(route.params)
        const username = route.params.Email;
        axios.post("http://10.0.2.2:6000/login", { username, password }).then(() => {
            console.log("logged in")
            navigation.dispatch(CommonActions.navigate("Dailygram", { name: username }))
            axios.post("http://10.0.2.2:6000/fetchUser", { username })
                .then((response) => {
                    setisloading(false)
                    const id = response.data.userId;
                    // updating user in usercontext 
                    handlecontext(id, username)
                })
        }).catch((err) => {
            setisloading(false)
            setPasswordError("Please enter correct password")
            console.log("please enter correct password", err)

        })
    }
    //context
    const { setUserid, setEmail } = useUser();
    const handlecontext = (userid, email) => {
        setUserid(userid)
        setEmail(email)
    }
    if(isloading){
        return <ActivityIndicator style={{flex:1,alignItems:'center',justifyContent:"center"}} size={"large"} color={"blue"}></ActivityIndicator>
    }


    const forgretPassword = () => {
        navigation.navigate("ForgetPassword", { Email: "red" });
    }
    return (
        <ScrollView showsVerticalScrollIndicator={true}
            horizontal={false}>
            <SafeAreaView>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require("../Images/img/Logo.jpg")} />
                    <TextInput style={styles.input} secureTextEntry onChangeText={setpassword} value={password} placeholder="Enter your password " ></TextInput>
                    {PasswordError ? <Text style={{ color: 'red' }} >{PasswordError}</Text> : null}
                    <Button color={"green"} onPress={handlePassword} title="Log in" />
                    <TouchableOpacity onPress={forgretPassword}>
                        <Text> Forgot Password? <Text style={styles.link}>Click here</Text></Text>
                    </TouchableOpacity>



                </View>
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