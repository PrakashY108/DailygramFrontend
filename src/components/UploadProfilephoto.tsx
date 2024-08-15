import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DocumentPicker from 'react-native-document-picker'

export default function UploadProfilephoto() {
  const [profilephoto, setprofilephoto] = useState({})
  const [profilephotoLabel, setprofilephotoLabel] = useState("Select profile photo")

  const handleprofilephoto = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(file);
      setprofilephoto(file);
      setprofilephotoLabel("Selected")
      console.log("Image picked successfully");
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('You cancelled the pick');
      } else {
        console.log('Error while picking the file: ' + err);
      }
    }
  }

  return (
    <View>
      <Button onPress={handleprofilephoto} title={profilephotoLabel} color="blue" />
    </View>
  )
}
