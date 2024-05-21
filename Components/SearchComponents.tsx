import { SafeAreaView, StyleSheet,Text, Image, TextInput, View, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import filter from "lodash.filter"
import { useUser } from '../context/Usecontext';
import { Button } from '@mui/joy';
export default function SearchComponents() {
  const {followers} =useUser();
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://10.0.2.2:6000/user/fetchall");
      setData(response.data);
      setOriginalData(response.data);
    
      
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log("Error while fetching data:", error);
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    const filteredData = filter(originalData, (user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const username =user.username;
      return fullName.includes(text.toLowerCase()) || username.includes(text.toLowerCase());
    });
    setData(filteredData);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (isError) {
    return <Text style={{ color: 'red', margin: 100 }}>Error while loading data</Text>;
  }

  const renderItem = ({ item }) => {
    
    return (
      <View style={{ borderColor: "blue", padding: 5, flex: 1, flexDirection: 'row', margin: 10, borderRadius: 10, height: 60 }}>
        <Image style={{ height: 43, width: 40, borderRadius: 20 }} source={require("../Images/img/Logo.jpg")} />
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.firstName} {item.lastName}</Text>
          <Text style={{ fontSize: 12 }}>{item.username}</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={{ fontSize: 11 }}>{item.follower}</Text><Text style={{ fontSize: 11 }}> followers</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
   

      <TextInput
        autoCapitalize='none'
        clearButtonMode='always'
        autoCorrect={false}
        style={styles.input}
        onChangeText={handleSearch}
        placeholder='Search here'
        value={query}
      />
     

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  input: {
    color: "black",
    minHeight: 40,
    flex: 1,
    borderRadius: 7,
    padding: 10,
    marginBottom: 8,
    marginTop:25,
    justifyContent: "center",
    alignItems: "center",
    borderColor: 'black',
    borderWidth: 1,
    margin:8
    
  }
})



// <Image style={{
//   height: 300,
//   width: 300,
//   flex: 1,
//   justifyContent: 'center',
//   alignContent: 'center',
//   alignSelf: 'center',
//   borderRadius: 150
// }} source={require("../Images/img/Logo.jpg")} />