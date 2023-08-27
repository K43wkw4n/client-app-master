import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useAppSelector } from "../store/store";
import AppNavigator from "./Navigator";
import { AccountNavigator } from "./account/Account.Navigator";
import { NavigationContainer } from "@react-navigation/native";
import { useStore } from "../store-plus/store-plus";
import { observer } from "mobx-react-lite";

const IndexNavigator = () => {
  const { token, accountScreen } = useAppSelector((state) => state.account);
 
  return (
    <>
      <NavigationContainer>
        {!!token ? (
          <AppNavigator />
        ) : accountScreen ? (
          <AccountNavigator />
        ) : (
          <AppNavigator />
        )}
        {/* {!!token ? (
          <AccountNavigator />
        ) : (
          <>{accountScreen ? <AccountNavigator /> : <AppNavigator />}</>
        )} */}
      </NavigationContainer>
    </>
  );
};

export default observer(IndexNavigator);
