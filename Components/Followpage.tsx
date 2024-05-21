import { StyleSheet, TextInput, View ,SafeAreaView} from 'react-native'
import React from 'react'
import TopTabNavigation from '../TopTabNavigation'
import * as Animatable from 'react-native-animatable';
export default function Followpage() {
  return (
    <Animatable.View animation={"slideInRight"} duration={100}>
       <TextInput
        autoCapitalize='none'
        clearButtonMode='always'
        autoCorrect={false}
        style={styles.input}
        placeholder='Search here'
      /><View style={{height:700,width:"100%",marginHorizontal:2,backgroundColor:"white"}}>

     <TopTabNavigation/>
      </View>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  input: {
    color: "black",
    minHeight: 40,
    flex: 1,
    borderRadius: 7,
    padding: 9,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: 'black',
    borderWidth: 1,
    margin:8
    
  }
})