import React from "react";

import auth from "../../firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import UserContext from "../../context/user-context";
import LoginSignUpBaseScreen from "./LoginSignUpBaseScreen";

const SignUpScreen = ({ navigation }) => {
  const setUser = React.useContext(UserContext).setUser;

  const signUp = (email, password, setErrorMessage) => {
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
        navigation.pop();
        setErrorMessage(error.code);
      });
  };

  return <LoginSignUpBaseScreen text="Sign up" registerFunction={signUp} />;
};

export default SignUpScreen;
