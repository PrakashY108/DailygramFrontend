import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Button, Image, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import * as yup from "yup";
import axios from "axios";
import { useUser } from '../context/Usecontext';

const validationSchema = yup.object().shape({
    username: yup.string().required('Enter either phone number or email'), // Correct the field name to "data"
});

function LoginUser({ navigation }) {
    const [username, setusername] = useState("");
    const [usernameError, setusernameError] = useState("");
    const [isloading, setisloading] = useState(false);
    const [password, setpassword] = useState("")
    const [PasswordError, setPasswordError] = useState("")

    const handleEmail = async () => {
        setisloading(true)
        validationSchema.validate({ username })
            .then(() => {
                // Important Note: in fetching api in react native/app we use localhost = 10.0.2.2
                axios.post("http://10.0.2.2:6000/fetchUser", { username })
                    .then((response) => {
                        console.log(response.data)
                        handlePassword(username, response.data)
                    })
                    .catch((error) => {
                        // Handle error
                        setisloading(false)
                        console.log('Error while fetching:', error);
                        setPasswordError("Invalid credential Please enter correct details")
                    });
            })
            .catch((err) => {
                setisloading(false)
                // Validation failed, set error message
                console.log('Validation error:', err);
                setusernameError("Username cannot be empty")
            });
    };
    const handlePassword = (username, user) => {
        console.log(username);
        setisloading(true)
        axios.post("http://10.0.2.2:6000/login", { username, password }).then((response) => {
            console.log("Userdetails ", user);

            const userData = user;
            console.log(userData);

            // generate access token and save in database
            // updating user in usercontext 
            handlecontext(userData)
        }).catch((err) => {
            setisloading(false)
            setPasswordError("Please enter correct password")
            console.log("please enter correct password", err)

        })
    }
    //context
    const { setuserData, userData } = useUser();

    const handlecontext = async (usersData) => {
        console.log(usersData);
        await setuserData(usersData)
        setisloading(false)
        navigation.replace("Dailygram", { name: username })
        console.log("User context Updated sucessfully");
    }

    const forgretPassword = () => {
        navigation.navigate("ForgetPassword", { Email: "red" });
    }
    if (isloading) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <ActivityIndicator size={"large"} color={"blue"} />
            <Text style={{ color: "black", padding: 10, fontSize: 15 }}>Logging Please Wait...</Text>
        </View>
    }

    return (
        <ScrollView showsVerticalScrollIndicator={true} horizontal={false}>
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={styles.heading}>Welcome To Dailygram</Text>
                    <Image style={styles.logo} source={require("../Images/img/Logo.jpg")} />
                    <TextInput style={styles.input} onChangeText={(text) => setusername(text)} value={username} placeholder="Enter your username " />
                    {usernameError ? <Text style={{ color: 'red' }} >{usernameError}</Text> : null}
                    <TextInput style={styles.input} secureTextEntry onChangeText={setpassword} value={password} placeholder="Enter your password " ></TextInput>
                    {PasswordError ? <Text style={{ color: 'red' }} >{PasswordError}</Text> : null}
                    <View style={styles.btncontainer}>
                        <Button color={"green"} onPress={handleEmail} title="Log in" />
                        <View style={styles.forget}><Text> Forgot Password? </Text>
                            <TouchableOpacity onPress={forgretPassword}>
                                <Text style={styles.link}>Click here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
                <View style={styles.createAcc}>
                    <Button title="Create New Account" onPress={() => navigation.navigate("CreateAccount", { stats: "string" })} />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default LoginUser;

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        flex: 1,
        justifyContent: 'center',
        width: "90%",
        padding: "4%",
        marginTop: 40,
        borderColor: "transparent",
        borderWidth: 1,
        marginBottom: 100,
        borderRadius: 10,
        alignSelf: 'center'
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
        paddingVertical: 7,
        alignSelf: 'center',
        fontSize: 28,
        color: 'green'
    },
    link: {
        color: 'blue',
    },
    input: {
        color: "black",
        flex: 1,
        borderRadius: 10,
        padding: 8,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 15
    },
    btncontainer: {
        marginTop: 10,
        gap: 8
    }, createAcc: {
        position: "absolute",
        bottom: 15,
        left: "17%",
        width: "66%"
    },
    forget: {
        flex: 1,
        flexDirection: "row"
    }
});
