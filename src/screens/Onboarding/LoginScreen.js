import React from "react";

import auth from "../../firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

import LoginSignUpBaseScreen from "./LoginSignUpBaseScreen";
import UserContext from "../../context/user-context";

const LoginScreen = ({ navigation }) => {
  const { user, setUser } = React.useContext(UserContext);
  const login = (email, password) => {
    navigation.navigate("LoadingScreen");
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
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

  return <LoginSignUpBaseScreen text="Login" registerFunction={login} />;
};

export default LoginScreen;
