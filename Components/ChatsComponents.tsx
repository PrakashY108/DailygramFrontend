import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import *as Animatable from 'react-native-animatable'


export default function ChatsComponent() {
    return (
        <Animatable.View animation={"slideInRight"} duration={100} style={{ flex: 1, alignItems: 'center', width: "100%" }}>
            <TextInput
                autoCapitalize='none'
                clearButtonMode='always'
                autoCorrect={false}
                style={styles.input}
                placeholder='Search here'

            />
            <Text style={{ fontSize: 20 }}>Messages</Text>
            
            <TouchableOpacity style={{ height: 70, flexDirection: "row", width: "100%", alignItems: 'center', gap: 20, margin: 2 }}>
                <Image style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 20 }} source={require("../Images/img/car.jpg")} />
                <View>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>Dinesh</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>I will be right back</Text>
                </View>
            </TouchableOpacity>
           
        
            <TouchableOpacity style={{ height: 70, flexDirection: "row", width: "100%", alignItems: 'center', gap: 20, margin: 2 }}>
                <Image style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 20 }} source={require("../Images/img/images.jpg")} />
                <View>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>Ramesh</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>hello👋</Text>
                </View>
            </TouchableOpacity>
        </Animatable.View >
    )
}

const styles = StyleSheet.create({
    input: {
        color: "black",
        width: "96%",
        borderRadius: 7,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 5,
        marginHorizontal: 20


    }
})