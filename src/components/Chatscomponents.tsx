import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import dotenvconfig from '../config/dotenvconfig';
import { getaccessTokenFromAsync } from '../utils/getaccessTokenfromAsync';

const Chatscomponents = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [previousmessages, setpreviousMessages] = useState([]);
  const [loggeduserid, setloggeduserid] = useState();
  const getmessages = async () => {

    const accessToken = await getaccessTokenFromAsync()

    try {
      const receiver_id = await route.params.userid;
      console.log("recei", receiver_id);

      const response = await axios.post(`${dotenvconfig.API_URL}/chats/fetch`, { accessToken, receiver_id });
      const loguserid = response.data.userid;
      setloggeduserid(loguserid)
      const result = await response.data.result
      if (result && result.length > 0) {
        const fetchedMessages = result.map(message => ({
          _id: message.chatsid,
          text: `${message.message}`,
          createdAt: new Date(message.created_at),
          user: {
            _id: message.sender_id,
          },
        }));
        setMessages(fetchedMessages);
      } else {
        return (<View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>No message yet...</Text>
        </View>)
      }

    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
    return;
  }

  useEffect(() => {
    getmessages()

  }, []);
  const onSend = useCallback(async (messages = []) => {
    const message = messages[0].text;
    const accessToken = await getaccessTokenFromAsync()
    const receiver_id = await route.params.userid;
    console.log("receiver id ", receiver_id);
    axios.post(`${dotenvconfig.API_URL}/chats/save/${receiver_id}`, { message, accessToken }).then(() => {

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    })
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <Image
          style={styles.profilepic}
          source={require('../assets/icons/support.png')}
        />
        <Text style={styles.headerText}>{route.params.username}</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: loggeduserid,
        }}
      />
    </View>
  );
};

export default Chatscomponents;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'lightblue',
    height: 55,
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilepic: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
