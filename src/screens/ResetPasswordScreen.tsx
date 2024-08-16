import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import * as yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootScreenPramProps } from '../navigation/StackNavigation';;

type forgetPasswordProps = NativeStackScreenProps<RootScreenPramProps, 'ResetpasswordScreen'>;

const validationSchema = yup.object().shape({
       password: yup.string().required('Password is required'),
       confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
   });
export default function ResetpasswordComponent({ navigation, route }: ResetpasswordScreen) {
    
    const { email } = route.params;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<any>({});

    const handleChangePassword = async () => {
      console.log(email);
        try {
             await validationSchema.validate({ password, confirmPassword }, { abortEarly: false });
            Alert.alert("Password Changed Successfully!!");
            navigation.navigate("LoginUserScreen");
        } catch (err) {
            if (err.inner) {
                // Validation failed, set errors
                const newErrors = {};
                err.inner.forEach((e) => {
                    newErrors[e.path] = e.message;
                });
                setErrors(newErrors);
            } else {
                console.error("Error:", err);
            }
        }
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                placeholder='Create new password'
                autoCapitalize='none'
                clearButtonMode='always'
                secureTextEntry={true}
            />
            {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

            <TextInput
                style={styles.input}
                onChangeText={(text) => setConfirmPassword(text)}
                placeholder='Confirm your password'
                autoCapitalize='none'
                clearButtonMode='always'
              
            />
            {errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}

            <View style={styles.btn}>
                <Button color={"green"} onPress={handleChangePassword} title='Change Password' />
            </View>
        </View>
    );
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
    error: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 20
    },
});
