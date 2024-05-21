import { StyleSheet, Button, TextInput, View, Image, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootScreenPramProps } from '../StackNavigation';
import axios from 'axios';

type otpPasswordProps = NativeStackScreenProps<RootScreenPramProps, 'otppassword'>;
export default function Otppassword({ navigation, route }: otpPasswordProps) {

  const { email } = route.params;
  console.log(route.params);

  const [password, setpassword] = useState("")


  const handleOTP = async () => {
    console.log(password);
    
    const response = await axios.post("http://10.0.2.2:6000/verifyOtp", { email, password })
    .then(() => {
      console.log("Correct Otp");
      console.log(email);
      navigation.navigate("Resetpassword",{email:email})
    })
      .catch(() => {
        console.log("Incorrect OTP");
      })
  }
  return (

    <SafeAreaView>
      <Image style={styles.logo} source={require("../Images/img/Logo.jpg")} />
      <TextInput style={styles.input} onChangeText={(a) => setpassword(a)} placeholder='Enter OTP here' />
      <View style={styles.btn}><Button color={"green"} onPress={handleOTP} title='Reset password'></Button></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    margin: 15
  },
  btn: {
    width: '40%',

    alignSelf: 'center'

  },
  logo: {
    height: 120,
    width: 120,


    alignSelf: 'center',
    borderRadius: 70
  }
})