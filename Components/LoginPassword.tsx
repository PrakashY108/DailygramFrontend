
import React, { useState } from "react";
import {
    View, Text, ScrollView, SafeAreaView, StyleSheet, Button, Image, TouchableOpacity, TextInput
} from "react-native";


// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootScreenPramProps } from '../StackNavigation'
type Passwordprop = NativeStackScreenProps<RootScreenPramProps, 'Password'>
export default function LoginPassword({ navigation }: Passwordprop) {
    const [password, setpassword] = useState("")

    const [PasswordError, setPasswordError] = useState("")

    const validateEmail = (password) => {

        return password.length >= 6;
    };
    const handleValidation = () => {
        let valid = true;

        if (!validateEmail(password)) {
            setPasswordError('Password must be 6 characters');
            valid = false;
        } else {
            setPasswordError('');
            console.log("logged in");
            navigation.replace("Dailygram", { name: 'prakash' })

        }
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

                    <TextInput style={styles.input} onChangeText={setpassword} value={password} placeholder="Enter your password " ></TextInput>
                    {PasswordError ? <Text style={{ color: 'red' }} >{PasswordError}</Text> : null}


                    <Button color={"green"} onPress={handleValidation} title="Log in" />

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