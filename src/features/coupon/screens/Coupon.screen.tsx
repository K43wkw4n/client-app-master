import { View, Text } from "react-native";
import React from "react";
import moment from "moment";

export const CouponScreen = ({ item }: any) => {
  return (
    <>
      <View
        style={{
          borderStyle: "dotted",
          borderEndWidth: 1,
          paddingVertical: 30,
          paddingHorizontal: 30,
          borderColor: "#fff",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 25 }}>{item.disCount}%</Text>
        <Text style={{ color: "#fff" }}>Off</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          paddingHorizontal: 50,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>{item.name}</Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: 7,
        }}
      >
        <Text style={{ color: "#fff" }}>
          Exp - {moment(item.expire).format("DD/MM/YYYY")}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 50,
          position: "absolute",
          justifyContent: "center",
          top: 37,
          right: -20,
        }}
      ></View>
    </>
  );
};
