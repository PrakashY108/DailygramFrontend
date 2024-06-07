import React, { Context } from 'react';
import { StyleSheet } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// navigation
import TabNavigation from "./TabNavigation";
import loginUserScreen from '../screens/LoginUserScreen';
import loginPasswordScreen from '../screens/LoginPasswordScreen';
import createAccountScreen from '../screens/CreateAccountScreen';
import forgetPasswordScreen from '../screens/ForgetPasswordScreen';
import otppasswordScreen from '../screens/0tpPasswordScreen';
import editProfileScreen from '../screens/EditProfileScreen';
import resetpasswordScreen from '../screens/ResetPasswordScreen'
import splashScreen from '../screens/SplashScreen';
import followpageScreen from '../screens/FollowPageScreen';
import notificationScreen from '../screens/NotificationScreen';
import menuScreen from '../screens/MenuScreen';
import ChatsScreen from '../screens/ChatsScreen';
import { useUser } from "../context/Usecontext"
const Stack = createNativeStackNavigator<RootScreenPramProps>();
export type RootScreenPramProps = {
    PasswordScreen: { Email: string },
    DailygramScreen: { name: string },
    otpPasswordScreen: { email: string },
    // forgetpassword: { email: string }
    // CreateAccount: { stats: string }
    // ForgetPassword: { Email: string },
    // Resetpassword: { email: string }
}
function StackNavigation() {
    const { userData, setuserData } = useUser();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{
                title: 'Dailygram', headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#80d2f2' },
                headerTintColor: 'black',
                headerTitleStyle: { fontWeight: '900', fontSize: 36 }
            }}>
                <Stack.Screen name="SplasScreen" component={splashScreen}
                    options={{ headerShown: false }} />  
                          <Stack.Screen name="LoginUserScreen" component={loginUserScreen} />
                          <Stack.Screen name="PasswordScreen" component={loginPasswordScreen} />
                
                      <Stack.Screen name="DailygramScreen" component={TabNavigation}
                          options={{ headerShown: false }} />
        
                <Stack.Screen name="CreateAccountScreen" component={createAccountScreen} />
                <Stack.Screen name="ForgetPasswordScreen" component={forgetPasswordScreen} />
                <Stack.Screen name="MenuScreen" component={menuScreen} />
                <Stack.Screen name="NotificationScreen" component={notificationScreen}
                    options={{
                        title: 'Notifications', headerTitleAlign: 'left',
                        headerStyle: { backgroundColor: 'white' },
                        headerTintColor: 'black',
                        headerTitleStyle: { fontWeight: '700', fontSize: 20 }
                    }} />
                <Stack.Screen name="Chats" component={ChatsScreen} options={{
                    title: 'Chats', headerTitleAlign: 'left',
                    headerStyle: { backgroundColor: 'white' },
                    headerTintColor: 'black',
                    headerTitleStyle: { fontWeight: '700', fontSize: 20 }
                }} />

                <Stack.Screen name="otpPasswordScreen" component={otppasswordScreen} />
                <Stack.Screen name="EditProfileScreen" component={editProfileScreen}
                    options={{
                        title: "Edit Profile",
                        headerStyle: { backgroundColor: "#80d2f2" },
                        headerTitleStyle: { fontSize: 25, fontWeight: "500", color: "black" },
                        headerTitleAlign: "left"
                    }} />
                <Stack.Screen name="ResetpasswordScreen" component={resetpasswordScreen} />
                <Stack.Screen name="FollowPageScreen" component={followpageScreen}
                    options={{
                        title: userData.username,
                        headerStyle: { backgroundColor: "white" },
                        headerTitleStyle: { fontSize: 25, fontWeight: "300" },
                        headerTitleAlign: "left"
                    }} /> 

            </Stack.Navigator>
        </NavigationContainer>);

}
export default StackNavigation;
const styles = StyleSheet.create({})
