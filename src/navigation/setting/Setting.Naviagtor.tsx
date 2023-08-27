import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingScreen from "../../features/setting/screens/Setting.screen";
import { AddressScreen } from "../../features/address/screens/Address.screen";
import { EditAddressScreen } from "../../features/address/screens/EditAddress.screen";
import OrderScreen from "../../features/order/screens/Order.screen";
import { FavouritesScreen } from "../../favourites/screens/Favourites.screen";
import   DetailsProduct   from "../../features/product/screens/DetailsProduct";
import OptionReview from "../../features/review/screens/Option.Review";
import ReviewScreen from "../../features/review/screens/Review.screen";
import UpdateReview from "../../features/review/screens/UpdateReview";

const Stack = createStackNavigator();

export const SettingNaviagtor = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="setting" component={SettingScreen} />
      <Stack.Screen name="myAddress" component={AddressScreen} />
      <Stack.Screen name="editAddress" component={EditAddressScreen} />
      <Stack.Screen name="myOrder" component={OrderScreen} />
      <Stack.Screen name="myFavourites" component={FavouritesScreen} />
      <Stack.Screen name="DetailsProduct" component={DetailsProduct} />
      <Stack.Screen name="OptionReview" component={OptionReview} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="UpdateReviewScreen" component={UpdateReview} />
      {/* <Stack.Screen
        name="Profile"
        component={Profile}
        initialParams={{ userId: user.id }}
      />
      <Stack.Screen name="Feed" component={Feed} /> */}
    </Stack.Navigator>
  );
};
