import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import  DocumentPicker from 'react-native-document-picker'

export default function UploadProfilephoto() {
  const [profilephoto ,setprofilephoto ]=useState({})

  const handleprofilephoto=async ()=>{
    const file =await DocumentPicker.pick({
      type :[DocumentPicker.types.images]
    })
  console.log(file);
  setprofilephoto(file)

  }
  return (
    <View>
     <Button onPress={handleprofilephoto} title='Upload Profile Photo' color="blue" />
    </View>
  )
}

const styles = StyleSheet.create({})