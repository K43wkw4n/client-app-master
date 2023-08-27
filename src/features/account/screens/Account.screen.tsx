import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { AlreadyLogin, setAccount } from "../../../store/context/accountSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../components/Button";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AccountScreen = () => {
  const dispatch = useAppDispatch();

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("@Token");
  //     const token = jsonValue != null && JSON.parse(jsonValue);

  //     // const response = await agent.Account.checkToken(token);
  //     // console.log("Token validation response:", response);
  //     dispatch(AlreadyLogin(token));

  //     // Handle the response as needed
  //   } catch (error) {
  //     console.log("Error reading value :", error);
  //     // Handle the error case
  //   }
  // };

  // const fetchAllItems = async () => {
  //   try {
  //     const keys = await AsyncStorage.getAllKeys();
  //     const items = await AsyncStorage.multiGet(keys);

  //     //console.log("👍", items);
  //   } catch (error) {
  //     console.log(error, "problemo");
  //   }
  // };

  // useEffect(() => {
  //   fetchAllItems();
  //   getData();
  // }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* <TouchableOpacity onPress={() => dispatch(setAccount(false))}>
          <AntDesign
            style={{ padding: 20 }}
            name="back"
            size={24}
            color="black"
          />
        </TouchableOpacity> */}
        <View>
          <Image
            style={{
              height: 395,
              width: "100%",
              marginTop: 50,
            }}
            source={{
              uri: "https://www.1999.co.jp/itbig33/10335301.jpg",
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#E5E5E5",
            //flex: 0.3,
            //maxHeight: 255,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Comfortaa_500Medium",
                fontSize: 25,
              }}
            >
              Login or Register
            </Text>
          </View>
          <View style={{ marginBottom: -10 }}>
            <TouchableOpacity onPress={() => dispatch(setAccount(false))}>
              <Text style={{ textDecorationLine: "underline" }}>
                with out login
              </Text>
            </TouchableOpacity>
          </View>
          <Button screenName="Login" />
          <Button screenName="Register" />
        </View>
      </SafeAreaView>
    </>
  );
};
