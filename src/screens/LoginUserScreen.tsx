import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Button, Image, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import * as yup from "yup";
import { useNavigation } from '@react-navigation/native';
import { validationSchemaLoginacc } from "../utils/ValidationSchema";
import  axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
function LoginUser() {
    const navigation = useNavigation()
    const [username, setusername] = useState("");
    const [Error, setError] = useState("");
    const [isloading, setisloading] = useState(false);
    const [password, setpassword] = useState("")
   
    const [errors, setErrors] = useState<any>({});


    const handleEmail = async () => {
        try{
            await validationSchemaLoginacc.validate({ username, password }, { abortEarly: false })
                const response=  await axios.post("http://10.0.2.2:6000/user/login",{username,password}).then(async(response)=>{

                    console.log(response.data);
                    // Storing accessToken in async storage 
                    const accessToken= response.data.accessToken
                    console.log(accessToken);
                    await AsyncStorage.setItem("accessToken",accessToken)
                   const token=  await AsyncStorage.getItem("accessToken")
                   console.log("token",token);
                  navigation.navigate("DailygramScreen")
                }).catch((err)=>{
                    setError("Invalid credentials")
                    console.log("Invalid credentials")
                })
          
        } catch (error) {
            if (error instanceof yup.ValidationError) {
              // Validation failed, update the errors state with error messages
              const newErrors = {};
              error.inner.forEach((e) => {
                newErrors[e.path] = e.message;
              });
              setErrors(newErrors);
            }
          }

        };
    return (
        <ScrollView style={{backgroundColor:"#ffffff"}} showsVerticalScrollIndicator={true} horizontal={false}>
            <SafeAreaView>

                <View style={styles.container}>
                    <Text style={styles.heading}>Welcome To Dailygram</Text>
                    <Image style={styles.logo} source={require("../assets/img/Logo.jpg")} />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter username "
                        onChangeText={(text) => setusername(text)}
                    />
                    {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        onChangeText={(text) => setpassword(text)}
                    />
                    {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
                    {Error?<Text style={styles.error}>{Error}</Text>:null}
                    <View style={styles.btncontainer}>
                        <Button color={"green"} onPress={handleEmail} title="Log in" />
                        <View style={styles.forget}><Text> Forgot Password? </Text>
                            <TouchableOpacity onPress={()=>navigation.navigate("ForgetPasswordScreen")}>
                                <Text style={styles.link}>Click here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                <View style={styles.createAcc}>
                    <Button title="Create New Account" onPress={() => navigation.navigate("CreateAccountScreen")} />
                </View>


            </SafeAreaView>
        </ScrollView>
    );
}

export default LoginUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: "90%",
        padding: "4%",
        marginTop: 20,
        borderColor: "transparent",
        borderWidth: 1,
        marginBottom: 100,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor:"#f6fffe",

        
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
        marginVertical: 15,
    
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
    },
    error: {
        color: 'red',
        marginBottom: 5
    },
});