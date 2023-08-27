import { View, Text, Modal, TouchableOpacity, Alert } from "react-native";
import React from "react"; 

export const OptionCheckout = ({
  setOptions,
  setTransferPayment,
  setCreditCard,
}: any) => {
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
        onPress={() => setOptions(false)}
      ></TouchableOpacity>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          position: "absolute",
          alignItems: "center",
          top: "35%",
          left: "30%",
        }}
      >
        <TouchableOpacity
          style={{ paddingHorizontal: 20, padding: 50, borderBottomWidth: 0.7 }}
          onPress={() => [
            setTransferPayment(true),
            setOptions(false),
            setCreditCard(false),
          ]}
        >
          <Text>TransferPayment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingHorizontal: 20, padding: 50 }}
          onPress={() => [
            setCreditCard(true),
            setOptions(false),
            setTransferPayment(false),
          ]}
        >
          <Text>CreditCard</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
