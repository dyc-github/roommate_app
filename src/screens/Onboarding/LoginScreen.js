import React from "react";

import auth from "../../firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import UserContext from "../../context/user-context";

import LoginSignUpBaseScreen from "./LoginSignUpBaseScreen";

const LoginScreen = ({ navigation }) => {
  const setUser = React.useContext(UserContext).setUser;

  const login = (email, password, setErrorMessage) => {
    navigation.navigate("LoadingScreen");
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        navigation.pop();
        navigation.navigate("PrimaryScreen");
      })
      .catch((error) => {
        navigation.pop();
        setErrorMessage(error.code);
      });
  };

  return <LoginSignUpBaseScreen text="Login" registerFunction={login} />;
};

export default LoginScreen;
