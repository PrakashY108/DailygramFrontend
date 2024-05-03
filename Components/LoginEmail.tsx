import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Button, Image, TextInput,ActivityIndicator} from "react-native";
import * as yup from "yup"; // Change the import statement for Yup
import axios from "axios";

const validationSchema = yup.object().shape({
    username: yup.string().required('Enter either phone number or email'), // Correct the field name to "data"
});

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootScreenPramProps } from '../StackNavigation'
type Emailprop = NativeStackScreenProps<RootScreenPramProps, 'Password'>
function Login({ navigation }:Emailprop) {
    const [username, setusername] = useState("");
    const [usernameError, setusernameError] = useState("");
    const [isloading, setisloading] = useState(false);

    const handleLogin =() => {
        setisloading(true)
        validationSchema.validate({ username })
            .then(() => {
                // Important Note: in fetching api in react native/app we use localhost = 10.0.2.2
                axios.post("http://10.0.2.2:6000/fetchUser", { username })
                    .then((response) => {
                        setisloading(false)
                        console.log(response.data);
                        navigation.navigate("Password",{Email:username});
                    })
                    .catch((error) => {
                        // Handle error
                        setisloading(false)
                        console.log('Error while fetching:', error);
                        setusernameError("User doesn`t exists")
                    });
            })
            .catch((err) => {
                setisloading(false)
                // Validation failed, set error message
                console.log('Validation error:', err);
                setusernameError("Username cannot be empty")
            });
    };
    if(isloading){
        return <ActivityIndicator style={{flex:1,justifyContent:"center",alignItems:"center"}} size={"large"} color={"blue"}/>
    }
  
    return (
        <ScrollView showsVerticalScrollIndicator={true} horizontal={false}>
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={styles.heading}>Welcome To Dailygram</Text>
                    <Image style={styles.logo} source={require("../Images/img/Logo.jpg")} />

                    <TextInput style={styles.input} onChangeText={(text) => setusername(text)} placeholder="Enter your username " />
                    {usernameError ? <Text style={{ color: 'red' }} >{usernameError}</Text> : null}
                    
                    <Button color={"green"} title=" Next " onPress={handleLogin} />

                </View>
                <View style={{ width: 500, flex: 1, flexDirection: 'row', justifyContent: 'center',alignSelf:'center' }}>
                    <Button title="Create New Account" onPress={() => navigation.navigate("CreateAccount", { stats: "string" })} />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        flex: 1,
        justifyContent: 'center',
        width: 410,
        padding: 40,
        marginTop: 40,
        borderColor: "transparent",
        borderWidth: 1,
        marginBottom: 100,
        borderRadius: 10,
        alignSelf:'center'
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
    title: {
        color: "black",
        fontSize: 50
    },
    text: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    heading: {
        paddingHorizontal: 10,
        paddingVertical:7,
        alignSelf:'center',
        fontSize: 28,
        color: 'green'
    },
    link: {
        color: 'blue',
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
        borderWidth: 1,
        marginVertical: 15
    }
});
