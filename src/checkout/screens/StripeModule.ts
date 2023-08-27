// StripeWrapper.ts

import { initStripe } from "@stripe/stripe-react-native";
import { NativeModules } from "react-native";

const { StripeModule } = NativeModules;

export const initializeStripe = async (publishableKey: any) => { 
  await initStripe({
    publishableKey,
  });
};

export const confirmPayment = async (paymentIntentClientSecret: string) => {
  try {
    const result = await StripeModule.confirmPayment(paymentIntentClientSecret);
    return result;
  } catch (error) {
    throw new Error("Payment confirmation failed.");
  }
};
