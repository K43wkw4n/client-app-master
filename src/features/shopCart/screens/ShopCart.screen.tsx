import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { CardShopCart } from "../components/CardShopCart";
import { getCurrentUser } from "../../../store/context/accountSlice";
import { GoToLogin } from "../../account/screens/GoToLogin";
import { width } from "../../feature";
import Lottie from "lottie-react-native";

export const ShopCartScreen = ({ navigation }: any) => {
  const { shopCart }: any = useAppSelector((state) => state.shopCart);
  const { token }: any = useAppSelector((state) => state.account);

  // console.log("shopCart : ", shopCart);

  const dispatch = useAppDispatch();

  // if (token) {
  //   useEffect(() => {
  //     dispatch(getCurrentUser(token.userDto.userName));
  //   }, [shopCart,token]);
  // }

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      {!!token ? (
        <>
          <View style={{ marginHorizontal: 20 }}>
            <View
              style={{
                alignItems: "center",
                marginVertical: 20,
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: "Comfortaa_500Medium",
                  fontSize: 25,
                  marginBottom: 10,
                }}
              >
                Shop Cart
              </Text>
            </View>
            <View>
              <ScrollView>
                {shopCart && shopCart.items && shopCart.items.length > 0 ? (
                  <>
                    {shopCart?.items.map((item: any) => (
                      <>
                        <CardShopCart item={item} navigation={navigation} />
                      </>
                    ))}
                  </>
                ) : (
                  // <Image
                  //   style={{ width: 350, height: 400 }}
                  //   source={{
                  //     uri: "https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png",
                  //   }}
                  // />
                  <View style={styles.lottie}>
                    <Lottie
                      source={require("../../../../assets/images/imagetest.json")}
                      autoPlay
                      loop
                    />
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
          <>
            {shopCart && shopCart.items && shopCart.items.length > 0 && (
              <>
                <View
                  style={{
                    position: "absolute",
                    bottom: 15,
                    left: 15,
                    right: 15,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      padding: 20,
                      backgroundColor: "#000",
                      borderRadius: 15,
                      alignItems: "center",
                    }}
                    onPress={() =>
                      navigation.navigate("CreateOrder", { shopCart })
                    }
                  >
                    <Text style={{ color: "#fff" }}>Buy</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        </>
      ) : (
        <>
          <GoToLogin name={"Unable to view basket"} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
});
