import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

import { addDoc, collection, query, getDocs, orderBy, onSnapshot} from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import db from '../../firebase/db';
import auth from '../../firebase/auth';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { GiftedChat, Bubble, Send} from 'react-native-gifted-chat';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 2,
                text: "Hello World",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "Benson",
                    avatar: require('./testComponent/IMG_1326.jpg')
                }
            },
            {
                _id: 1,
                text: "I am Benson the Cat",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "Benson",
                    avatar: require('./testComponent/IMG_1326.jpg')
                }
            }
        ])
    }, []);
 
    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        const {_id, createdAt, text, user} = messages[0];

        addDoc(collection(db, 'chats'), { _id, createdAt,  text, user });
    }, [])

    const renderSend = (props) => {
        return(
            <Send {...props}>
                <View>
                    <Icon
                        // Used Icon from react-native-vector-icons due to IconButton from react-native-paper not working
                        style={{marginBottom: 5, marginRight: 5}}
                        name='send-circle-outline'
                        size={32}
                    />
                </View>
            </Send>
        )
    }

    const renderBubble = (props) => {
        return(
            <Bubble 
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    };
 
    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ChatScreen;