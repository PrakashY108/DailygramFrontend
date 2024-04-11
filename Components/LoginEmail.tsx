
import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Button, Image, TextInput } from "react-native";
// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'



function Login({ navigation }) {
    const [email, setemail] = useState("")
    const [EmailError, setEmailError] = useState("")


    const validateEmail = (email) => {
        // Regular expression for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const handleValidation = () => {
        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            valid = false;
        } else {
            setEmailError('');
            console.log("logged in");
            navigation.navigate("Password");

        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={true}
            horizontal={false}>
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={styles.heading}>Welcome To Dailygram</Text>
                    <Image style={styles.logo} source={require("../Images/img/Logo.jpg")} />

                    <TextInput style={styles.input} onChangeText={setemail} value={email} placeholder="Enter your email " ></TextInput>
                    {EmailError ? <Text style={{ color: 'red' }} >{EmailError}</Text> : null}


                    <Button color={"green"} title=" Next " onPress={handleValidation} />


                </View>

                <View style={{ maxWidth: 400, flex: 1, flexDirection: 'row', justifyContent: 'center' }}><Button title="Create New Account" onPress={() => navigation.navigate("CreateAccount")}></Button></View>
            </SafeAreaView>
        </ScrollView>
    )
}
export default Login;
const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        flex: 1,
        justifyContent: 'center',
        width: 410,
        padding: 40,
        marginTop: 45,
        borderColor: "transparent",
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 10,
        gap: 5
    }, logo: {
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
        paddingVertical: 10,
        fontSize: 30,
        color: 'green'

    },
    link: {
        color: 'blue',


    }, input: {
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


})