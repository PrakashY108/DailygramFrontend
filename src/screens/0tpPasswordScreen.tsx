import { StyleSheet, Button, TextInput, View, Image, SafeAreaView, Text } from 'react-native';
import React, { useState } from 'react';
import dotenvconfig from '../config/dotenvconfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootScreenPramProps } from '../navigation/StackNavigation';
import axios from 'axios';

type otpPasswordProps = NativeStackScreenProps<RootScreenPramProps, 'otpPasswordScreen'>;

export default function Otppassword({ navigation, route }: otpPasswordProps) {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOTP = async () => {
    const { email } = route.params;
    console.log(route.params, email);

    try {
      await axios.post(`${dotenvconfig.API_URL}/verify/otp`, { otp, email });
      navigation.navigate("ResetpasswordScreen", { email: email });
    } catch (error) {
      setErrorMessage("Invalid OTP. Please try again.");
      console.log("Invalid OTP", error);
    }
  };

  return (
    <SafeAreaView>
      <Image style={styles.logo} source={require("../assets/img/Logo.jpg")} />
      <TextInput 
        style={styles.input} 
        onChangeText={(text) => setOtp(text)} 
        placeholder='Enter OTP here' 
        value={otp}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <View style={styles.btn}>
        <Button color={"green"} onPress={handleOTP} title='Reset password'></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    margin: 15,
    paddingHorizontal: 10,
  },
  btn: {
    width: '40%',
    alignSelf: 'center',
    marginTop: 20,
  },
  logo: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    borderRadius: 70,
    marginVertical: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
