import { View, StyleSheet } from "react-native";
import React from "react";
import Lottie from "lottie-react-native";
import { width } from "../../feature";

export const OrderEmpty = () => {
  return (
    <>
      <View style={styles.lottie}>
        <Lottie
          source={require("../../../../assets/images/orderLottie.json")}
          autoPlay
          loop
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: width,
    height: width,
  },
});
