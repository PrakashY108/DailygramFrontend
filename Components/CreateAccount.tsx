import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Button, Image, TextInput,Alert } from "react-native";
import axios from 'axios'; // Import Axios
import { validationSchema } from "./ValidationSchema"
import UploadProfilephoto from "./UploadProfilephoto";


// Define Yup validation schema

function CreateAccount({ navigation }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNumber] = useState('');
    const [DOB, setDob] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<any>({});
    const createAccount = () => {
        validationSchema.validate({
            firstName,
            lastName,
            email,
            phoneNo,
            DOB,
            username,
            password,
            confirmPassword 
        }, { abortEarly: false })
      .then(()=>{
        //validation completed
                // Important Note: in fetching api in react native/ app we use localhost = 10.0.2.2
                try {
                    axios.post('http://10.0.2.2:6000/createUser', {    //10.0.2.2 = localhost
                    firstName,
                    lastName,
                    email,
                    phoneNo,
                    DOB,
                    username,
                    password
                }).then(response => {
                    // Handle successful response
                    console.log(response.data);
                    navigation.navigate("Login");
                        // Navigate to another screen upon successful account creation
                        Alert.alert("Account created Successsfully .Login here")
                    })
                        .catch(error => {
                            // Handle error
                            console.error('Error creating account:', error);
                        });
                } catch (error) {
                    console.log("big error")
                }


            })
            .catch(err => {
                // Validation failed, set errors
                const newErrors: any = {};
                err.inner.forEach((e: any) => {
                    newErrors[e.path] = e.message;
                });
                setErrors(newErrors);
            });
    };

    return (
        <ScrollView showsVerticalScrollIndicator={true} horizontal={false}>
            <SafeAreaView>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require("../Images/img/Logo.jpg")} />
                    <TextInput
                        style={styles.input}
                        placeholder=" Enter First Name"
                        onChangeText={(text) => setFirstName(text)}
                    />
                    {errors.firstName ? <Text style={styles.error}>{errors.firstName}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder=" Enter Last Name"
                        onChangeText={(text) => setLastName(text)}
                    />
                    {errors.lastName ? <Text style={styles.error}>{errors.lastName}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder=" Enter Email"
                        onChangeText={(text) => setEmail(text)}
                    />
                    {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder=" Enter Phone Number"
                        onChangeText={(text) => setPhoneNumber(text)}
                    />
                    {errors.phoneNo ? <Text style={styles.error}>{errors.phoneNo}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter DOB in YYYY/MM/DD"
                        onChangeText={(text) => setDob(text)}
                    />
                    {errors.DOB ? <Text style={styles.error}>{errors.DOB}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Create Username"
                        onChangeText={(text) => setUsername(text)}
                    />
                    {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Create Password"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                    {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry
                    />
                    {errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}
                    <View style={styles.btn}>
                    <UploadProfilephoto/>
                    <Button  onPress={createAccount} color={"green"} title=" Create Account " />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
export default CreateAccount;

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        flex: 1,
        justifyContent: 'center',
        width: "98%",
        padding: 40,
        borderColor: "transparent",
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 10,
        gap: 5
    },
    logo: {
        height: 120,
        width: 120,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 70,
        margin:0
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
    },
    input: {
        color: "black",
        width: "100%",
        flex: 1,
        borderRadius: 10,
        padding: 8,
        marginBottom: 8,
        justifyContent: "center",
        alignItems: "center",
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 15
    },
    error: {
        color: 'red',
        marginBottom: 5
    },
    btn:{
        paddingTop:10,
        paddingBottom:10,
        gap:30
    }
});
