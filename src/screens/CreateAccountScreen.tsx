import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Button, Image, TextInput, Alert, Modal } from "react-native";
import axios from 'axios';
import dotenvconfig from "../config/dotenvconfig";
import { validationSchemaCreateAcc } from "../utils/ValidationSchema";
import DatePicker from "react-native-date-picker";
import DocumentPicker from 'react-native-document-picker';
import * as yup from "yup";

function CreateAccount({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNumber] = useState('');
    const [DOB, setDob] = useState(new Date());
    const [ChoosenDOB, setChoosenDOB] = useState(new Date());
    const [DOBpicked, setDOBpicked] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [profilephoto, setProfilePhoto] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [profilePhotoLabel, setProfilePhotoLabel] = useState("Select profile photo");

    const createAccount = async () => {
        try {
            await validationSchemaCreateAcc.validate({
                firstName, lastName, email, phoneNo, DOB, username, password, confirmPassword
            }, { abortEarly: false });

            axios.post(`${dotenvconfig.API_URL}/user/createUser`, {
                firstName,
                lastName,
                email,
                phoneNo,
                DOB,
                username,
                password
            }).then((response) => {
                console.log("response", response.data);
                navigation.navigate("LoginUserScreen");
                Alert.alert("Account created Successfully. Login here");
            }).catch(error => {
                console.error("Error creating account:", error);
                Alert.alert("User already exists");
            });
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const newErrors = {};
                error.inner.forEach((e) => {
                    newErrors[e.path] = e.message;
                });
                setErrors(newErrors);
            }
        }
    };

    const handleDate = (newDate) => {
        setChoosenDOB(newDate);
        setDob(newDate.toISOString().slice(0, 10)); // Format the date as a string
        setDOBpicked(true);
    };

    const handleProfilePhoto = async () => {
        try {
            const file = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            console.log(file);
            setProfilePhoto(file[0]);
            setProfilePhotoLabel("Selected");
            console.log("Image picked successfully");
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('You cancelled the pick');
            } else {
                console.log('Error while picking the file: ' + err);
            }
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <SafeAreaView>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require("../assets/img/Logo.jpg")} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter First Name"
                        onChangeText={(text) => setFirstName(text)}
                    />
                    {errors.firstName ? <Text style={styles.error}>{errors.firstName}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Last Name"
                        onChangeText={(text) => setLastName(text)}
                    />
                    {errors.lastName ? <Text style={styles.error}>{errors.lastName}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Email"
                        onChangeText={(text) => setEmail(text)}
                    />
                    {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Phone Number"
                        onChangeText={(text) => setPhoneNumber(text)}
                    />
                    {errors.phoneNo ? <Text style={styles.error}>{errors.phoneNo}</Text> : null}
                    <View style={{}}>
                        <View style={{ flex: 1, flexDirection: "row", gap: 10, alignItems: "center" }}>
                            <Button title={"Select"} onPress={() => setShowDatePicker(true)} />
                            {DOBpicked ? <Text style={{ fontSize: 15 }}>{ChoosenDOB.toDateString()}</Text> : null}
                        </View>
                        {showDatePicker && <Modal transparent>
                            <View style={styles.datepicker}>
                                <DatePicker
                                    date={DOB}
                                    onDateChange={handleDate}
                                    mode="date"
                                    minimumDate={new Date(1900, 0, 1)}
                                    maximumDate={new Date()}
                                />
                                <View style={{ width: 100, flex: 1, justifyContent: "flex-end", alignSelf: "center", bottom: 10 }}>
                                    <Button onPress={() => setShowDatePicker(false)} title="Select" />
                                </View>
                            </View>
                        </Modal>}
                    </View>
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
                        <View>
                            <Button onPress={handleProfilePhoto} title={profilePhotoLabel} color="blue" />
                        </View>
                        <Button onPress={createAccount} color={"green"} title="Create Account" />
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
        width: "95%",
        padding: 40,
        borderColor: "transparent",
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 10,
        gap: 5,
        backgroundColor: "#f1ffff",
        alignSelf: "center"
    },
    logo: {
        height: 120,
        width: 120,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 70,
        margin: 0
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
    btn: {
        paddingTop: 10,
        paddingBottom: 10,
        gap: 30
    },
    datepicker: {
        backgroundColor: "white",
        position: "absolute",
        bottom: 200,
        alignSelf: "center",
        height: 250,
        width: "80%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black"
    }
});
