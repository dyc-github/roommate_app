import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";

import { defaultContainer } from "../../styles/styles";

import { Button, Text, TextInput } from "react-native-paper";

import auth from "../../firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import UserContext from "../../context/user-context";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signUpError, setSignUpError] = React.useState();

  const { user, setUser } = React.useContext(UserContext);

  const signUp = () => {
    navigation.navigate("LoadingScreen");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        navigation.pop();
        navigation.navigate("PrimaryScreen");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        navigation.pop();
        setSignUpError(errorMessage);
      });
  };

  return (
    <View>
      <TextInput
        label="email"
        mode="outlined"
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={{ alignSelf: "stretch" }}
      ></TextInput>
      <TextInput
        label="password"
        mode="outlined"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        style={{ alignSelf: "stretch" }}
      ></TextInput>
      <Text>{signUpError}</Text>
      <Button mode="contained" onPress={signUp}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...defaultContainer
  }
});

export default SignUpScreen;


