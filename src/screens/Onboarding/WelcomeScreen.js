import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { defaultContainer, defaultSection, spacing } from "../../styles/styles";

export default function WelcomeScreen({ navigation }) {
  const theme = useTheme();
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.quarterCircle,
          { backgroundColor: theme.colors.secondaryContainer },
        ]}
      />
      <View style={styles.upperSection}>
        <Text style={styles.titleStyle} variant="displaySmall">
          Roomie
        </Text>
        <View style={[styles.buttonsContainer, styles.marginVerticalM]}>
          <Button
            style={styles.buttonStyle}
            mode="contained"
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            Login
          </Button>
          <Button
            style={styles.buttonStyle}
            mode="contained"
            onPress={() => {
              navigation.navigate("SignUpScreen");
            }}
          >
            Sign up
          </Button>
        </View>
      </View>
      <View style={styles.lowerSection} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...defaultContainer,
  },
  buttonsContainer: {
    flexDirection: "row",

  },
  upperSection: {
    flex: 2,
    ...defaultSection,
  },
  lowerSection: {
    flex: 1,
    ...defaultSection,
  },
  titleStyle:{
    marginVertical: spacing.m,
  },
  buttonStyle: {
    marginHorizontal: spacing.s,
  },
  quarterCircle: {
    position: "absolute",
    width: 270,
    height: 270,
    borderTopLeftRadius: 640 / 2,
    bottom: 0,
    right: 0,
  },
});
