import React, { useContext } from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// navigation
import TabNavigation from "./TabNavigation";
import LoginUser from './Components/LoginUser';
import LoginPassword from './Components/LoginPassword';
import CreateAccount from './Components/CreateAccount';
import ForgetPassword from './FunctionalComponents/ForgetPassword';
import otppassword from './FunctionalComponents/OtpPassword';
import EditProfile from './Components/EditProfile';
import Resetpassword from './FunctionalComponents/ResetpasswordComponent'
import SplashScreen from './Components/SplashScreen';
import Followpage from './Components/Followpage';
import { useUser } from './context/Usecontext';
import NotificationComponent from './FunctionalComponents/NotificationComponent';
import MenuComponents from './Components/MenuComponents';
import ChatsComponent from './Components/ChatsComponents';

const Stack = createNativeStackNavigator<RootScreenPramProps>();

export type RootScreenPramProps = {
    Dailygram: { name: string },
    Password: { Email: string },
    CreateAccount: { stats: string }
    ForgetPassword: { Email: string },
    forgetpassword: { email: string }
    otppassword: { email: string },
    Resetpassword: { email: string }}
function StackNavigation() {
    const { userData } = useUser();
    
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash' screenOptions={{
                title: 'Dailygram', headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#80d2f2' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: '900', fontSize: 36 }
            }}>
                {/* screens */}
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginUser} />
                <Stack.Screen name="Password" component={LoginPassword} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="Menu" component={MenuComponents} />
                <Stack.Screen name="Notification" component={NotificationComponent} options={{
                title: 'Notifications', headerTitleAlign: 'left',
                headerStyle: {backgroundColor: 'white' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: '700', fontSize: 20 }
            }} />
                <Stack.Screen name="Chats" component={ChatsComponent} options={{
                title: 'Chats', headerTitleAlign: 'left',
                headerStyle: {backgroundColor: 'white' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: '700', fontSize: 20 }
            }} />
              
                <Stack.Screen name="otppassword" component={otppassword} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Edit Profile", headerStyle: { backgroundColor: "#80d2f2" }, headerTitleStyle: { fontSize: 25, fontWeight: "500", color: "black" }, headerTitleAlign: "left" }} />
                <Stack.Screen name="Resetpassword" component={Resetpassword} />
                <Stack.Screen name="FollowPage" component={Followpage} options={{ title: userData.username, headerStyle: { backgroundColor: "white" }, headerTitleStyle: { fontSize: 25, fontWeight: "300" }, headerTitleAlign: "left" }} />
                <Stack.Screen name="Dailygram" component={TabNavigation} options={{headerShown:false}}/>

            </Stack.Navigator>
        </NavigationContainer>);

}
export default StackNavigation;
const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        alignItems: 'center',
        paddingVertical: 5


    }
})
