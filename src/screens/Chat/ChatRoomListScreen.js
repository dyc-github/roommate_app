import React from "react";
import { View, StyleSheet, Button, FlatList, onPress, Image, TouchableOpacity } from "react-native";
import { Text } from 'react-native-paper';

import { Users } from './TestUsers'

export default function ChatRoomListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList 
        data={Users}
        keyExtractor={item=>item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('Chat', {userName: item.userName})}}>
              <View style={styles.userInfo}>
                <View style={styles.profilePictureContainer}>
                  <Image
                    source={item.userImg}
                    style={styles.profilePicture}
                  />
                </View>
                <View style={styles.textContainer}>
                  <View style={styles.userInfoText}>
                    <Text style={styles.userNameText}>{item.userName}</Text>
                    <Text style={styles.postTimeText}>{item.messageTime}</Text>
                  </View>
                  <Text style={styles.textMessage}>{item.messageText}</Text>
                </View>
              </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  card:{
    width: '100%',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profilePictureContainer: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  userInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userNameText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTimeText: {
    fontSize: 12,
    color: '#666'
  },
  textMessage: {
    fontSize: 14,
  }
})