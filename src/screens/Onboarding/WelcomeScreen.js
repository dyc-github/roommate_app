import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function WelcomeScreen({navigation}){
    const theme = useTheme();
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <View style = {[styles.quarterCircle,{backgroundColor: theme.colors.secondaryContainer}]}/>
        <Button mode="contained" onPress={()=>{
            navigation.navigate("LoginScreen");
        }}>Login</Button>
        <Button mode="contained" onPress={()=>{
            navigation.navigate("SignUpScreen");
        }}>Sign up</Button>
    </View>)
}
const styles = StyleSheet.create({
    quarterCircle: {
        position: "absolute",
        width: 270,
        height: 270,
        borderTopLeftRadius: 640 / 2,
        bottom: 0,
        right: 0,
      },
})