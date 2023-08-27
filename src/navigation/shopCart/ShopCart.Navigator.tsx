import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ShopCartScreen } from "../../features/shopCart/screens/ShopCart.screen";
import   DetailsProduct   from "../../features/product/screens/DetailsProduct";
import { CreateOrderScreen } from "../../features/order/screens/CreateOrder.screen";
import { AddressScreen } from "../../features/address/screens/Address.screen";
import { Checkout } from "../../checkout/screens/Checkout.screen";
import { Elements } from "@stripe/react-stripe-js"; 
import { EditAddressScreen } from "../../features/address/screens/EditAddress.screen";

const Stack = createStackNavigator();

export const ShopCartNavigator = () => {
  return (
    // <Elements stripe={stripePromise}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShopCart" component={ShopCartScreen} />
      <Stack.Screen name="DetailsProduct" component={DetailsProduct} />
      <Stack.Screen name="editAddress" component={EditAddressScreen} />
      <Stack.Screen name="CreateOrder" component={CreateOrderScreen} />
      <Stack.Screen name="myAddress" component={AddressScreen} />
      <Stack.Screen name="Checkout" component={Checkout} />
      {/* <Stack.Screen
        name="Profile"
        component={Profile}
        initialParams={{ userId: user.id }}
      />
      <Stack.Screen name="Feed" component={Feed} /> */}
    </Stack.Navigator>
    // </Elements>
  );
};
