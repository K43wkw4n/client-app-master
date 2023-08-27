import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export const CardAddressComponent = ({ item }: any) => {
  return (
    <>
      <View>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={{ fontSize: 15 }}>
            {item.fullName.substring(0, 10) + "..."}
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginLeft: 10,
              borderLeftWidth: 0.5,
              paddingLeft: 10,
            }}
          >
            {item.phoneNumber}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
          }}
        >
          <Text style={{ fontSize: 15 }}>{item.houseNumber}</Text>
          <Text style={{ fontSize: 15, marginLeft: 10 }}>{item.postCode}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
          }}
        >
          <Text style={{ fontSize: 15 }}>{item.subDistrict}</Text>
          <Text style={{ fontSize: 15, marginLeft: 10 }}>{item.province}</Text>
        </View>
      </View>
      <View>
        <Text>{item.statusUse === 1 && "default"}</Text>
      </View>
    </>
  );
};
