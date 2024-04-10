import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import CustomButton from '../CustomComponents/CustomButton'



export default function FriendSuggestion() {
    return (
        <SafeAreaView  > 
            {/* horizontal line */}
                <View style={styles.hrline}></View>
                <Text style={[{fontSize:20,margin:5}]}>Suggestion for you</Text>
           
                <View style={styles.hrline}></View>
                {/* for scrolling horizontally */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                {/* main  container  */}
                <View style={styles.container} >
                    {/* Friend request 1 */}
                    <View style={styles.main}>
                   
                        <View style={styles.friendimg}><Image style={styles.friendimg} source={require('../Images/img/object.png')}/></View>
                        <Text>Mohankumar321</Text>
                        <View style={styles.followed} >
                        <Image source={require('../Images/img/lordshiva.jpg')} style={styles.followedimg}/><Text>By Rameshbhai</Text>
                        </View>
                        <CustomButton title="Follow" />
                    </View>
                 
                    {/* Friend request 2 */}
                    <View style={styles.main}>
                   
                        <View style={styles.friendimg}><Image style={styles.friendimg} source={require('../Images/img/car.jpg')}/></View>
                        <Text>Mohankumar321</Text>
                        <View style={styles.followed} >
                        <Image source={require('../Images/img/object.png')} style={styles.followedimg}/><Text>By Rameshbhai</Text>
                        </View>
                        <CustomButton title="Follow" />
                    </View>
                 
                    {/* Friend request 3 */}
                    <View style={styles.main}>
                   
                        <View style={styles.friendimg}><Image style={styles.friendimg} source={require('../Images/img/lordshiva.jpg')}/></View>
                        <Text>Mohankumar321</Text>
                        <View style={styles.followed} >
                        <Image source={require('../Images/img/car.jpg')} style={styles.followedimg}/><Text>By Rameshbhai</Text>
                        </View>
                        <CustomButton title="Follow" />
                    </View>
                 
                </View>
            </ScrollView>
                    <View style={styles.hrline}></View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    
    },
    main: {
        height: 240,
        width: 200,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 20,
        flex: 1,
        padding: 15,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: 20,
        marginVertical: 15,
   
    },
    hrline: {
        opacity: 1,
        height: 1,
        backgroundColor: 'black',
        marginVertical: 5,
        
    },
    friendimg: {
        maxHeight: 100,
        maxWidth: 100,
        borderRadius: 50,
        backgroundColor: "#c7e8ed"

    },
    followedimg: {
        height: 20,
        width: 20,
        marginHorizontal: 12,
        borderRadius: 10,
        backgroundColor: "#c7e8ed"
    },
    followed: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,

        justifyContent: 'space-between'
    },

})