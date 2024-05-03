import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from 'react';
// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import TabNavigation from "./TabNavigation";
import LoginEmail from './Components/LoginEmail';
import LoginPassword from './Components/LoginPassword';
import CreateAccount from './Components/CreateAccount';
import ForgetPassword from './FunctionalComponents/ForgetPassword';
import NotificationComponent from './FunctionalComponents/NotificationComponent';


const Stack = createNativeStackNavigator<RootScreenPramProps>();

export type RootScreenPramProps = {
    Dailygram: { name: string },
    Email: { Email: string },
    Password: { Email: string },
    CreateAccount: { stats: string }
    ForgetPassword: { Email: string },
    notification: { userId: number }

}
type notificationProp = NativeStackScreenProps<RootScreenPramProps, 'notification'>
function StackNavigation({ navigation }: notificationProp) {
    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName='Email' screenOptions={{
                title: 'Dailygram', headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#80d2f2' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: 'bold', fontSize: 37 }
            }}>
                {/* screens */}
                <Stack.Screen name="Email" component={LoginEmail} />
                <Stack.Screen name="Password" component={LoginPassword} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="notification" component={NotificationComponent} />
                <Stack.Screen name="Dailygram" component={TabNavigation} options={{
                    title: 'Dailygram', headerTitleAlign: 'left',
                    headerRight: () => (
                        <View style={styles.container}>

                            <TouchableOpacity style={styles.container} >
                                <Image style={{ height: 20, width: 20, paddingTop: 3 }} source={require("./Images/icons/notification.png")}></Image>
                            </TouchableOpacity>

                        </View>
                    ),
                    headerStyle: { backgroundColor: '#80d2f2' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: 'bold', fontSize: 37 }
                }} />

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
