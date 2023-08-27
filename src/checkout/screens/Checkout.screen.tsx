import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StripeElementType } from "@stripe/stripe-js";
import { width } from "../../features/feature";
import { useAppSelector } from "../../store/store";
import { initializeStripe } from "./StripeModule";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../../store-plus/store-plus";

export const Checkout = ({ data }: any) => {
  const navigation = useNavigation();
  const { token } = useAppSelector((state) => state.account);
  const { updatePayment } = useStore().userOrderStore;

  console.log("data : ", data);

  const publishableKey =
    "pk_test_51NUld0KSrvVHttpn8vApNURuK9gzvXJ2V3zzZdscLNKZ1gaOGfsaFq1EumFVmtajr9izwmnLUJYXTWG3Zsli4HnI00BC4mhQ2d";

  useEffect(() => {
    // Initialize Stripe when the component mounts
    initializeStripe(publishableKey);
  }, []);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleConfirmPayment = async () => {
    try {
      // const { paymentMethodId }: any = await confirmPayment(data, {
      //   paymentMethodType: "Card",
      //   paymentMethodData: {
      //     billingDetails: {
      //       name: token?.userDto.userName,
      //     },
      //   },
      // });

      const { paymentOption } = await initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Admin",
        defaultBillingDetails: {
          name: token?.userDto.userName,
        },
      });

      const { error } = await presentPaymentSheet();

      if (error) {
        console.error("Payment confirmation failed:", error.message);
        navigation.navigate("ShopCart" as never);
        // Handle the payment error here
      } else {
        // Payment is successful, update the order status as "success"
        console.log("Payment successful. Payment Method ID:", paymentOption);
        // Implement your code to update the order status as "success" here
        navigation.navigate("ShopCart" as never);
        updatePayment(data.orderId);
      }
    } catch (e: any) {
      console.error("Payment confirmation failed:", e.message);
      // Handle the payment error here
    }
  };

  // console.log("data : ", data);

  return (
    <>
      {/* <SafeAreaView style={{ backgroundColor: "#000", flex: 1 }}> */}
      {/* <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={onCardInputChange}
          onFocus={(focusedField) => {
            console.log("focusField", focusedField);
          }}
        /> */}
      {/* <CardField
        onCardChange={onCardInputChange}
          postalCodeEnabled={false}
          style={{
            height: 50,
            width: "100%",
          }}
        /> */}
      <Modal animationType="fade" transparent={true}>
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            opacity: 0.5,
            flex: 1,
            bottom: -20,
          }}
        ></TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            borderTopEndRadius: 25,
            borderTopStartRadius: 25,
            paddingVertical: 10,
            backgroundColor: "#fff",
          }}
        >
          {/* <CardField
            style={styles.cardFiled}
            onCardChange={(e) => console.log("e :", e)}
          /> */}
          {/* <CardForm style={styles.cardForm} /> */}
          <TouchableOpacity
            style={{
              backgroundColor: "#999",
              width: width - 25,
              padding: 10,
              borderRadius: 6,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("ShopCart" as never)}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Pay later
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              width: width - 25,
              padding: 20,
              borderRadius: 6,
              alignItems: "center",
              marginVertical: 10,
            }}
            onPress={handleConfirmPayment}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Pay now
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* <Modal animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              flex: 0.5,
              backgroundColor: "#000",
            }}
          ></View>
          <View
            style={{
              alignItems: "center",
              flex: 0.5,
              borderTopEndRadius: 25,
              borderTopStartRadius: 25,
              top: -40,
              paddingTop: 10,
              backgroundColor: "#fff",
            }}
          >
            <CardField style={styles.cardFiled} />
            <CardForm style={styles.cardForm} />
            <Button title="Pay now" onPress={handlePayment} />
          </View>
        </View>
      </Modal> */}
      {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  cardFiled: {
    height: 35,
    width: "90%",
    marginBottom: 30,
  },
  cardForm: {
    height: 170,
    width: "90%",
  },
});
