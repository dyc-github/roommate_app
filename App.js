import "react-native-gesture-handler";
import React from "react";

import {
  Provider as PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
  IconButton,
} from "react-native-paper";

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import merge from "deepmerge";

import WelcomeScreen from "./src/screens/Onboarding/WelcomeScreen";
import SignUpScreen from "./src/screens/Onboarding/SignUpScreen";
import LoginScreen from "./src/screens/Onboarding/LoginScreen";

import HomeScreen from "./src/screens/HomeScreen";
import TodoScreen from "./src/screens/Todo/TodoScreen";
import CalendarScreen from "./src/screens/Calendar/CalendarScreen";

import ChatRoomListScreen from "./src/screens/Chat/ChatRoomListScreen";

import LoadingScreen from "./src/screens/LoadingScreen";

import UserContext from "./src/context/user-context";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export const PreferencesContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});

/*
StackNavigator
  Group
    ChatRoomList
    ChatRoom
  Group
    NewTask
    NewEvent
  Group
    DetailedTask
    DetailedEvent
  Group
    SettingsHouse
    SettingsAccount
  DrawerNavigator
    TabNavigator
      Home
      Todo
      Calendar
      Transaction (optional)
*/

//navigators
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DrawerContainer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Root" component={TabContainer} />
    </Drawer.Navigator>
  );
}

function TabContainer({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <IconButton
              icon="account-circle-outline"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="message-outline"
              onPress={() => {
                navigation.navigate("ChatRoomList");
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          headerLeft: () => (
            <IconButton
              icon="account-circle-outline"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="plus"
              onPress={() => {
                navigation.navigate("ChatRoomList");
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerLeft: () => (
            <IconButton
              icon="calendar-blank-multiple"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="plus"
              onPress={() => {
                navigation.navigate("ChatRoomList");
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const userState = {
    user: null,
    setUser: (user) => {
      this.user = user;
    },
  };

  return (
    <UserContext.Provider value={userState}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{
              animation: "slide_from_right",
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={{
                headerShown: false,
                presentation: "transparentModal",
                animation: "fade",
              }}
            />
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            </Stack.Group>
            <Drawer.Screen
              name="ChatRoomList"
              component={ChatRoomListScreen}
              options={{ title: "Messages" }}
            />
            <Stack.Screen
              name="PrimaryScreen"
              component={DrawerContainer}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UserContext.Provider>
  );
}
