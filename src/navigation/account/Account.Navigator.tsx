import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Loginscreen } from "../../features/account/screens/Login.screen";
import { RegisterScreen } from "../../features/account/screens/Register.screen";
import { AccountScreen } from "../../features/account/screens/Account.screen";
import { HomeScreen } from "../../features/home/screens/Home.screen";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainAccount" component={AccountScreen} />
      <Stack.Screen name="Login" component={Loginscreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* <Stack.Screen
        name="Profile"
        component={Profile}
        initialParams={{ userId: user.id }}
      />
      <Stack.Screen name="Feed" component={Feed} /> */}
    </Stack.Navigator>
  );
};
