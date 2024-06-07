import { StyleSheet,Button, View, TextInput,Text,SafeAreaView, ActivityIndicator,Image   } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootScreenPramProps } from '../navigation/StackNavigation'

import * as yup from 'yup'
export const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
});
type otppasswordprop = NativeStackScreenProps<RootScreenPramProps, 'otpPasswordScreen'>
export default function ForgetPassword({navigation}:otppasswordprop) {
  const [email,setemail] =useState("");
  const [emailerror,setemailerror] =useState("");
  const [isloading,setisloading]=useState(false)
  
  
  const handlemail= async()=>{
    try {
      console.log(email);
     await validationSchema.validate({email},{ abortEarly: false })
     console.log("Validated");
     await axios.post("http://10.0.2.2:6000/send/mail/otp",{email}).then(()=>{
       navigation.navigate("otpPasswordScreen",{email:email})
     }).catch((err)=>{
      setemailerror("User with this email does not exists")
      console.log("Invalid Email",err);
      
     })
    } catch (error) {
      console.log(error);
       setemailerror(error.message)
      console.log(emailerror);
      
    }
   
    
  }
if(isloading){
  return<View style={{flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"large"} color={"blue"}/>
  <Text style={{color:'black',fontSize:18,padding:20}}>Sending mail please wait ...</Text></View>
}
  return (
    <SafeAreaView>
       <Image style={styles.logo} source={require("../assets/img/Logo.jpg")} />
      <TextInput style={styles.input} onChangeText={(text)=>setemail(text)}  placeholder='Enter your email' 
      autoCapitalize='none'
      clearButtonMode='always'
      ></TextInput>
       <Text style={styles.error}>{emailerror}</Text>
      <View style={styles.btn}><Button color={"green"} onPress={handlemail} title='Get OTP'></Button></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input:{
    borderRadius:10,
    borderColor:"black",
    borderWidth:1,
    marginHorizontal:20,
    marginVertical:15,
    paddingHorizontal:10,
    color:'black'
  },
  btn:{
 width:'40%',

 alignSelf:'center'

  },
  logo: {
    height: 120,
    width: 120,


    alignSelf: 'center',
    borderRadius: 70
},
error: {
  color: 'red',
  marginBottom: 5,
  marginLeft:30
},
 
})