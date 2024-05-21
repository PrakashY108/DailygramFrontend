import { StyleSheet,Button, View, TextInput,Text,SafeAreaView, ActivityIndicator,Image   } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootScreenPramProps } from '../StackNavigation'

import * as yup from 'yup'
export const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
});
type otppasswordprop = NativeStackScreenProps<RootScreenPramProps, 'otppassword'>
export default function ForgetPassword({navigation}:otppasswordprop) {
  const [email,setemail] =useState("");
  const [emailerror,setemailerror] =useState<any>({});
  const [isloading,setisloading]=useState(false)
  
  
  const handlemail= async()=>{
    console.log(email);
    setisloading(true)
    try {
      validationSchema.validate({ email},{ abortEarly: false })
      .then(() => {
        
        axios.post("http://10.0.2.2:6000/fetchUser", {email})
        .then((response) => {
          setisloading(false)
          console.log(response.data);
          
        })
        .catch((error) => {
          // Handle error
          setisloading(false)
          console.log('Error while fetching:', error);
          
        });
        const response =  axios.post("http://10.0.2.2:6000/sendotp",{email})
        setisloading(false)
        console.log(email);
        
        console.log(response);
        navigation.navigate("otppassword",{email:email})
        
            })
            .catch((err) => {
                setisloading(false)
                // Validation failed, set error message
                console.log('Validation error:', err);
                setemailerror(" cannot be empty")
            });
    
    
  } catch (error) {
    setisloading(false)
    console.log("error while sending mail",error)
  }
}
if(isloading){
  return<View style={{flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"large"} color={"blue"}/>
  <Text style={{color:'black',fontSize:18,padding:20}}>Sending mail please wait ...</Text></View>
}
  return (
    <SafeAreaView>
       <Image style={styles.logo} source={require("../Images/img/Logo.jpg")} />
      <TextInput style={styles.input} onChangeText={(text)=>setemail(text)}  placeholder='Enter your email' 
      autoCapitalize='none'
      clearButtonMode='always'
      ></TextInput>
       {emailerror.email ? <Text style={styles.error}>{emailerror.email}</Text> : null}
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
  marginBottom: 5
},
 
})