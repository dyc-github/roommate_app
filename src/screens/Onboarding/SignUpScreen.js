import React from "react";

import auth from "../../firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import UserContext from "../../context/user-context";
import LoginSignUpBaseScreen from "./LoginSignUpBaseScreen";

const SignUpScreen = ({ navigation }) => {
  const setUser = React.useContext(UserContext).setUser;

  const signUp = (email, password) => {
    navigation.navigate("LoadingScreen");
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.pop();
          setUser(userCredential.user);
          resolve();
        })
        .catch((error) => {
          navigation.pop();
          reject(error);
        });
    });
  };

  return <LoginSignUpBaseScreen text="Sign up" registerFunction={signUp} />;
};

export default SignUpScreen;
