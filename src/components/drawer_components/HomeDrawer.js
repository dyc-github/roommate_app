import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as React from "react";
import { View } from "react-native";
import { Drawer, Text } from "react-native-paper";
import DrawerHeader from "./DrawerHeader";

const HomeDrawer = () => {
  const [active, setActive] = React.useState("");

  return (
    <DrawerHeader/>
    // <DrawerContentScrollView>
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>Drawer content</Text>
    //   </View>
    //   <DrawerHeader/>
    //   <View style={{backgroundColor:"red", flex:1}}/>
    //   <Text>hello</Text>
    //   <Drawer.Section title="Some title">
    //     <Drawer.Item
    //       label="First Item"
    //       active={active === "first"}
    //       onPress={() => setActive("first")}
    //     />
    //     <Drawer.Item
    //       label="Second Item"
    //       active={active === "second"}
    //       onPress={() => setActive("second")}
    //     />
    //   </Drawer.Section>
    // </DrawerContentScrollView>
  );
};

export default HomeDrawer;
