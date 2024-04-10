import React, { useState } from 'react';
import { View, Button, Text ,StyleSheet} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const DocumentPickerExample = () => {
  const [pickedImage, setPickedImage] = useState(null);
  const [pickedReel, setPickedReel] = useState(null);

  const pickImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify the types of files you want to pick, e.g., DocumentPicker.types.pdf
      });
      setPickedImage(res);
      console.log("Image picked successfully"
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('You cancelled the pick');
      } else {
        console.log('Error while picking the file: ' + err);
      }
    }
  };
  const pickReel = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video], // You can specify the types of files you want to pick, e.g., DocumentPicker.types.pdf
      });
      setPickedReel(res);
      console.log(
        'URI : ' + res.uri,
        'Type : ' + res.type, // mime type
        'Name : ' + res.name,
        'Size : ' + res.size
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled the picker');
      } else {
        console.log('Error while picking the file: ' + err);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',margin:10 }}>
      <View style={styles.btn}>
        <Button  title="Upload Post" onPress={pickImage} />
        </View >
      <View style={styles.btn}>
      <Button title="Upload Reels" onPress={pickReel} />
        </View >
     
    </View>
  );
};

export default DocumentPickerExample;
const styles = StyleSheet.create({
  btn:{
    backgroundColor:'red',
     flex: 1,
       justifyContent: 'center', 
       alignItems: 'center',
       margin:5,
       marginVertical:3,
       maxHeight:40
  }
})
