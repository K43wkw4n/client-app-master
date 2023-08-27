import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../store/store";
import { setAccount } from "../../../store/context/accountSlice";

const width = Dimensions.get("window").width;

export const GoToLogin = ({ name }: any) => {
  
  const dispatch = useAppDispatch();

  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 20 }}>{name}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            width: width - 25,
            padding: 20,
            borderRadius: 6,
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={() => dispatch(setAccount(true))}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Login or Register
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
