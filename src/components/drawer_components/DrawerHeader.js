//TODO once backend is finished actually support usernames and proper onboarding
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { avatarSizes, defaultContainer } from "../../styles/styles"
import UserAvatar from "../UserAvatar"


const DrawerHeader = () =>{
    <View style={styles.headerContainer}>
        <UserAvatar size={avatarSizes.s}/>
        <Text variant="labelLarge">Jeremy Kwong</Text>
    </View>
}

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: "row",
        alignItems:"space-between",
        backgroundColor: "blue",
        ...defaultContainer
    }
})

export default DrawerHeader;