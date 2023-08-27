import { View, Text, Modal, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import agent from "../../store/context/api/agent";
import { useAppSelector } from "../../store/store";

export const OptionModal = ({ item, setoption, order }: any) => {
  const { token } = useAppSelector((state) => state.account);
  const navigation: any = useNavigation();

  const setDefault = async () => {
    await agent.Account.setDefaultAddress({
      userId: token.userDto.userId,
      addressId: item.id,
    });

    setoption(false);
  };

  const remove = async () => {
    Alert.alert("are you sure", "are you sure, remove Item?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => [
          await agent.Account.deleteAddress(item.id),
          setoption(false),
        ],
      },
    ]);
  };

  return (
    <Modal animationType="fade" transparent={true}>
      <TouchableOpacity
        style={{
          backgroundColor: "#000",
          opacity: 0.5,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => setoption(false)}
      ></TouchableOpacity>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          flexDirection: "row",
          position: "absolute",
          alignItems: "center",
          top: "45%",
          left: "20%",
        }}
      >
        <TouchableOpacity
          style={{ paddingHorizontal: 20, padding: 50 }}
          onPress={() =>
            navigation.navigate("editAddress", { item, setoption })
          }
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingHorizontal: 20, padding: 50 }}
          onPress={() => [setDefault(), order && navigation.goBack()]}
        >
          <Text>Default</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            padding: 50,
            backgroundColor: "red",
            borderTopEndRadius: 20,
            borderBottomEndRadius: 20,
          }}
          onPress={() => remove()}
        >
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
