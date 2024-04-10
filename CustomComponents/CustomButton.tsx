import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Alert} from 'react-native'


 function CustomButton({title}) {
    
  return (
    <TouchableOpacity  style={styles.btn}>
      <Text style={[styles.text,]}>{title}</Text>
      
    </TouchableOpacity>
  )
}
export default CustomButton ;
const styles = StyleSheet.create({
    btn:{
  top:0,
backgroundColor:"#007bff",
alignItems:"center",
padding:10,
borderRadius:5,
maxWidth:200,

    },
 text:{
color:"white",
fontWeight:"900",
fontSize:17
    }
})