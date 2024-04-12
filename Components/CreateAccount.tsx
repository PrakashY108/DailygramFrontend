
import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Button, Image, TextInput } from "react-native";
import axios from 'axios'; // Import Axios for making HTTP requests
// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootScreenPramProps } from '../StackNavigation'
type Accountprop = NativeStackScreenProps<RootScreenPramProps, 'CreateAccount2'>


function CreateAccount({ navigation }: Accountprop) {
    const [firstName, setFirstName] = useState('');
    const [usercreated, setusercreated] = useState(false);
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [DOB, setDOB] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const createUser = async () => {
        try {
            const response = await fetch('http://localhost:6000/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phoneNo: phoneNumber,
                    DOB,
                    username,
                    password,
                }),
            });
            const data = await response.json();
            console.log(data);
            // Handle navigation or display success message here
            setusercreated(true);
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle error or display error message here
        }
    
        if (!setusercreated) {
            console.log("error meri");
        } else {
            navigation.navigate("Dailygram", { name: 'r' });
        }
    };
    
    return (
        <ScrollView showsVerticalScrollIndicator={true}
            horizontal={false}>
            <SafeAreaView>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require("../Images/img/Logo.jpg")} />
                    <TextInput style={styles.input} placeholder=" Enter First Name"></TextInput>
                    <TextInput style={styles.input} placeholder=" Enter Last Name"></TextInput>
                    <TextInput style={styles.input} placeholder=" Enter Email "></TextInput>
                    <TextInput style={styles.input} placeholder=" Enter Phone Number"></TextInput>
                    <TextInput style={styles.input} placeholder="Enter DOB"></TextInput>
                    <TextInput style={styles.input} placeholder="Create Username" ></TextInput>
                    <TextInput style={styles.input} placeholder="Create Password" ></TextInput>
                    <TextInput style={styles.input} placeholder="Confirm Password" ></TextInput>

                    <Button onPress={createUser} color={"green"} title=" Create Account " />

                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
export default CreateAccount;
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