import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable"

import { SafeAreaView, StyleSheet, Text, Image, TextInput, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import axios from 'axios';
import filter from "lodash.filter"
import dotenvconfig from "../config/dotenvconfig";
import { getaccessTokenFromAsync } from '../utils/getaccessTokenfromAsync';
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/Usecontext";

function ChatsScreen() {
    const navigation = useNavigation()
    const {userData, setuserData} = useUser()
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (query.length > 0) {

        }
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const accessToken = await getaccessTokenFromAsync()
            console.log(accessToken);
            const response = await axios.post(`${dotenvconfig.API_URL}/fetch/users`, { accessToken });
            console.log(response.data);
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
            const username = user.username;
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
     const {username,userid} = item
        return (
            <TouchableOpacity onPress={() => navigation.navigate("ChatsComponents", { username,userid})} style={styles.chatcards}>
                <Image style={styles.chatcardlogo} source={require("../assets/img/Logo.jpg")} />
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.firstName} {item.lastName}</Text>
                    <Text style={{ fontSize: 12 }}>{item.username}</Text>

                </View>
            </TouchableOpacity>
        );
    };
    return (
        <Animatable.View animation={"slideInRight"} duration={100} style={{ flex: 1, alignItems: 'center', width: "100%" }}>
            <SafeAreaView style={{ width: "95%" }}>
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
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </Animatable.View >
    )
}
const styles = StyleSheet.create({
    input: {
        color: "black",
        minHeight: 40,
        maxWidth: "93%",
        flex: 1,
        borderRadius: 7,
        marginBottom: 8,
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        borderColor: 'black',
        borderWidth: 1,
        margin: 8,
        width: "100%"
    },
    chatcards: {
        borderColor: "blue",
        padding: 3,
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        borderRadius: 10,
        height: 60,
        borderWidth: 1,
        maxWidth: "100%",
        backgroundColor: "lightblue"
    },
    chatcardlogo: {
        height: 43,
        width: 40,
        borderRadius: 20
    }
})

export default ChatsScreen