import React from "react";
import { StyleSheet, View } from "react-native";

import { defaultContainer, defaultSection, spacing } from "../../styles/styles";

import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { AuthErrorCodes } from "firebase/auth";

const LoginSignUpBaseScreen = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorText, setErrorText] = React.useState();

  const callRegisterFunction = () => {
    props.registerFunction(email, password).catch((error) => {
      let errorMessage = "";
      switch (error.code) {
        case AuthErrorCodes.INVALID_EMAIL:
          errorMessage = "*Email is invalid.";
          break;
        case AuthErrorCodes.EMAIL_EXISTS:
          errorMessage = "*An account with this email already exists.";
          break;
        case AuthErrorCodes.INVALID_PASSWORD:
          errorMessage = "*Password is invalid.";
          break;
        case AuthErrorCodes.USER_DELETED:
          errorMessage = "*User not found.";
          break;
        default:
          errorMessage = "*Something went wrong.";
          console.log(error.code);
      }
      setErrorText(errorMessage);
    });
  };

  const theme = useTheme();

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
          {props.text}
        </Text>
        <TextInput
          label="Email"
          mode="outlined"
          autoCapitalize="none"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={[styles.textInput, styles.marginVerticalXS]}
        ></TextInput>
        <TextInput
          label="Password"
          mode="outlined"
          autoCapitalize="none"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          style={[styles.textInput, styles.marginVerticalXS]}
        ></TextInput>
        <Text style={{ color: theme.colors.error }}>{errorText}</Text>
        <Button
          style={styles.marginVerticalM}
          mode="contained"
          onPress={callRegisterFunction}
        >
          {props.text}
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

export default LoginSignUpBaseScreen;
