import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { defaultContainer, defaultSection, spacing } from "../../styles/styles";

import { Button, Text, TextInput, useTheme } from "react-native-paper";

import auth from "../../firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import UserContext from "../../context/user-context";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState();

  const setUser = React.useContext(UserContext).setUser;

  const theme = useTheme();

  const login = () => {
    navigation.navigate("LoadingScreen");
    signInWithEmailAndPassword(auth, email, password)
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
        setLoginError(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.quarterCircle,
          { backgroundColor: theme.colors.secondaryContainer },
        ]}
      />
      <View style={styles.emailSignUpSection}>
        <Text style={styles.marginVerticalM} variant="displaySmall">
          Login
        </Text>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={[styles.textInput, styles.marginVerticalXS]}
        ></TextInput>
        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          style={[styles.textInput, styles.marginVerticalXS]}
        ></TextInput>
        <Text>{loginError}</Text>
        <Button style={styles.marginVerticalM} mode="contained" onPress={login}>
          Login
        </Button>
      </View>
      <View style={styles.externalSignUpSection}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...defaultContainer,
  },
  marginVerticalXS: {
    marginVertical: spacing.xs,
  },
  marginVerticalM: {
    marginVertical: spacing.m,
  },
  textInput: {
    alignSelf: "stretch",
    marginHorizontal: spacing.s,
  },
  emailSignUpSection: {
    flex: 2,
    ...defaultSection,
  },
  externalSignUpSection: {
    flex: 1,
    ...defaultSection,
  },

  quarterCircle: {
    position: "absolute",
    width: 270,
    height: 270,
    borderTopRightRadius: 640 / 2,
    bottom: 0,
    left: 0,
  },
});

export default LoginScreen;
