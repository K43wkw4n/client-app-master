import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeNavigator } from "./home/Home.Navigator";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { ShopCartNavigator } from "./shopCart/ShopCart.Navigator";
import { useAppSelector } from "../store/store";
import { SettingNaviagtor } from "./setting/Setting.Naviagtor";
import { MaterialIcons } from "@expo/vector-icons";
import { Checkout } from "../checkout/screens/Checkout.screen";
import { useStore } from "../store-plus/store-plus";
import { observer } from "mobx-react-lite";
// import { CheckoutScreen } from "../checkout/screens/Checkout.screen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { shopCart }: any = useAppSelector((state) => state.shopCart);
  const { token } = useAppSelector((state) => state.account);
 
  const { badgeOrder, createConnection, badgeCancel } =
    useStore().userOrderStore;

  const [test, setTest] = useState(false);

  setTimeout(() => {
    setTest(true);
  }, 500);

  useEffect(() => {
    if (!!token) {
      createConnection(token?.userDto.userId);
    }
  }, [test === false]);

  // const dispatch = useAppDispatch();

  // const getShopCart = () => {
  //   dispatch(getShopCartAsync({ userName: token.userDto.userName })).catch(
  //     (error) => {
  //       console.log("Login error:", error);
  //     }
  //   );
  // };

  // useEffect(() => {
  //   getShopCart();
  // }, []);

  // useEffect(() => {
  //   Badge + 1;
  // }, [shopCart?.items.length]);

  // const badge = shopCart?.items.length > 0 ? Badge : undefined;

  // console.log("asd",shopCart?.items.length)

  useEffect(() => {}, [shopCart, token]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          return <AntDesign name={iconName as any} size={24} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarActiveBackgroundColor: "black",
        tabBarInactiveBackgroundColor: "white",
        // tabBarStyle: { display: "none" },
        //tabBarStyle: route.name === "DetailsProduct" && { display: "none" },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: (e) => (
            <AntDesign name="home" size={24} color={e.color} />
          ),
          tabBarShowLabel: false,
        }}
        component={HomeNavigator}
      />
      {/* <Tab.Screen name="Checkout" component={CheckoutScreen} /> */}
      <Tab.Screen
        name="shopCart"
        options={{
          tabBarIcon: (e) => (
            <Feather name="shopping-cart" size={24} color={e.color} />
          ),
          tabBarShowLabel: false,
          tabBarBadge:
            shopCart && shopCart.items && shopCart.items.length !== 0
              ? shopCart.items.length
              : undefined,
        }}
        component={ShopCartNavigator}
      />
      {/* <Tab.Screen
        name="IGoof"
        options={{
          tabBarIcon: (e) => (
            <MaterialIcons name="payment" size={24} color={e.color} />
          ),
          tabBarShowLabel: false,
        }}
        component={Checkout}
      /> */}
      <Tab.Screen
        name="settings"
        options={{
          tabBarIcon: (e) => (
            <Ionicons name="settings-outline" size={24} color={e.color} />
          ),
          tabBarShowLabel: false,
          tabBarBadge: token
            ? badgeOrder || badgeCancel
              ? ""
              : undefined
            : undefined,
        }}
        component={SettingNaviagtor}
      />
    </Tab.Navigator>
  );
};

export default observer(AppNavigator);
