import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

var width = Dimensions.get("window").width;

interface ButtonProps {
  screenName: string;
}

export const Button = ({ screenName }: ButtonProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#000",
        width: width - 25,
        padding: 20,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 20,
      }}
      onPress={() => navigation.navigate(screenName as never)}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {screenName}
      </Text>
    </TouchableOpacity>
  );
};
