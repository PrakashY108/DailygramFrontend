import { Button, StyleSheet, TextInput, View, Text,Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { useUser } from "../context/Usecontext"
import { validationSchemaEditprofile } from '../utils/ValidationSchema'
import axios from 'axios'



export default function EditProfile() {
  const { userData, setuserData } = useUser()
  const [firstName, setFirstName] = useState(`${userData.firstName}`);
  const [lastName, setLastName] = useState(`${userData.lastName}`);
  const [email, setEmail] = useState(`${userData.email}`);
  const [phoneNo, setPhoneNo] = useState(`${userData.phoneNo}`);
  const [DOB, setDob] = useState(`${userData.DOB}`);
  const [username, setUsername] = useState(`${userData.username}`);
  const [Bio, setBio] = useState(`${userData.Bio}`);
  const [errors, setErrors] = useState<any>({});
  const [errorCannoteditphone, seterrorcannoteditphone] = useState(false);
  const [errorCannoteditEmail, seterrorcannoteditEmail] = useState(false);

  const handleUpdate = async () => {
    try {
      const userId = userData.userId;
         await validationSchemaEditprofile.validate({ firstName, lastName, username, phoneNo, email, DOB }, { abortEarly: false });

        const response = await axios.post("http://10.0.2.2:6000/update/user", { 
          firstName,
            lastName,
            DOB,
            username,
            userId
        });

         // Handle successful response
         console.log(response.data);
         console.log("Profile updated successfully");

        Alert.alert("Profile Updated Successfully!!");
     
    } catch (err) {
        if (err.inner) {
            // Validation failed, set errors
            const newErrors = {};
            err.inner.forEach((e) => {
                newErrors[e.path] = e.message;
            });
            setErrors(newErrors);
        } else {
            console.error("Error:'An error occurred while updating profile. Please try again", err);
        }
    }
};



return (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.label}>First Name</Text>
    <TextInput style={styles.input} value={firstName} onChangeText={(text) => setFirstName(text)} placeholder='Edit firstname' />
    {errors.firstName ? <Text style={styles.error}>{errors.firstName}</Text> : null}

    <Text style={styles.label}>Last Name</Text>
    <TextInput style={styles.input} value={lastName} onChangeText={(text) => setLastName(text)} placeholder='Edit lastname' />
    {errors.lastName ? <Text style={styles.error}>{errors.lastName}</Text> : null}

    <Text style={styles.label}>UserName</Text>
    <TextInput style={styles.input} value={username} onChangeText={(text) => setUsername(text)} placeholder=' username' />
    {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}

    <Text style={styles.label}>Email</Text>
    <TextInput style={styles.input} value={email} placeholder='Email' />
    {errorCannoteditEmail ? <Text style={styles.error}>You cannot edit Email</Text> : null}

    <Text style={styles.label}>Phone Number</Text>
    <TextInput style={styles.input} value={phoneNo} placeholder='PhoneNumber' />
    {errorCannoteditphone ? <Text style={styles.error}>You cannot edit PhoneNumber</Text> : null}

    <Text style={styles.label}>Date of Birth</Text>
    <TextInput style={styles.input} value={DOB} onChangeText={(text) => setDob(text)} placeholder='DOB' />
    {errors.DOB ? <Text style={styles.error}>{errors.DOB}</Text> : null}
    <Text style={styles.label}>Bio</Text>
    <TextInput style={styles.input} value={Bio} onChangeText={(text) => setBio(text)} placeholder='DOB' />


    <View style={{ marginTop: 5, width: "80%", marginHorizontal: "10%" }}>
      <Button color={"#26e0d4"} onPress={handleUpdate} title="Update Profile" />
    </View>
  </View>
)
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 8,
    borderBottomWidth: 1,
    width: "90%",
    marginHorizontal: "5%",
    padding: 10,
    marginBottom: "2%",
    fontSize: 15
  },
  label: {
    color: "blue",
    fontSize: 15,
    marginHorizontal: "10%",
  },
  error: {
    color: 'red',
    marginBottom: 5,
    marginHorizontal: "8%",

  },
})