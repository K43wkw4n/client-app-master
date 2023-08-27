import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { OrderEmpty } from "./OrderEnpty";
import moment from "moment";
import { useStore } from "../../../store-plus/store-plus";
import { observer } from "mobx-react-lite";
import { useAppSelector } from "../../../store/store";
import { useStripe } from "@stripe/stripe-react-native";
import { initializeStripe } from "../../../checkout/screens/StripeModule";
import OptionReview from "../../../features/review/screens/Option.Review";

const TabOrderScreen = ({ order, title, navigation }: any) => {
  const { token } = useAppSelector((item) => item.account);
  const { confirmStatusOrder, updatePayment } = useStore().userOrderStore;
  const [options, setOptions] = useState(false);

  const publishableKey =
    "pk_test_51NUld0KSrvVHttpn8vApNURuK9gzvXJ2V3zzZdscLNKZ1gaOGfsaFq1EumFVmtajr9izwmnLUJYXTWG3Zsli4HnI00BC4mhQ2d";

  useEffect(() => {
    // Initialize Stripe when the component mounts
    initializeStripe(publishableKey);
  }, []);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleConfirmPayment = async ({ orderId, clientSecret }: any) => {
    try {
      const { paymentOption } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Admin",
        defaultBillingDetails: {
          name: token?.userDto.userName,
        },
      });

      const { error } = await presentPaymentSheet();

      console.log("error : ", error);
      console.log("paymentOption : ", paymentOption);

      if (error) {
        console.error("Payment confirmation failed:", error.message);
        // Handle the payment error here
      } else {
        // Payment is successful, update the order status as "success"
        console.log("Payment successful. Payment Method ID:", paymentOption);
        updatePayment(orderId);
        navigation.navigate("myOrder");
      }
    } catch (e: any) {
      console.error("Payment confirmation failed:", e.message);
      // Handle the payment error here
    }
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderWidth: 0.7,
          marginBottom: -1,
          marginTop: -1,
        }}
      >
        <View>
          {order?.length === 0 ? (
            <>
              <OrderEmpty />
            </>
          ) : (
            <>
              {order?.map((item: any) => {
                const statusLength = item?.orderItem.filter(
                  (t: any) => t?.statusReview === 1
                );
                const orderItemLength = item?.orderItem?.length;

                return (
                  <>
                    <View
                      key={item?.orderId} // Make sure to add a unique key for each item in the list
                      style={{
                        padding: 20,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        borderBottomWidth: 0.7,
                      }}
                    >
                      <Text>{item?.address?.user?.userName}</Text>
                      {/* <Image
                           style={{ width: 200, height: 350 }}
                           source={{
                             uri: BaseUrl + "/orderImage/" + item.paymentImage,
                           }}
                         />  */}
                      <Text>{item?.totalPrice}</Text>
                      <Text>{moment(item?.orderDate).format("DD/MM/YY")}</Text>
                      <Text>
                        {item?.orderStatus === 0 &&
                        item?.paymentImage !== "unpaid" ? (
                          "Pending"
                        ) : item?.orderStatus === 2 ? (
                          "Canceled"
                        ) : statusLength.length === orderItemLength ? (
                          "Completed"
                        ) : (
                          <>
                            <TouchableOpacity
                              style={{
                                backgroundColor: "#000",
                                padding: 5,
                                borderRadius: 6,
                                alignItems: "center",
                              }}
                              onPress={() => {
                                title === "ToShip"
                                  ? confirmStatusOrder(item?.id)
                                  : item?.paymentImage === "unpaid"
                                  ? handleConfirmPayment({
                                      orderId: item.id,
                                      clientSecret: item.clientSecret,
                                    })
                                  : item?.orderStatus === 1 &&
                                    item?.statusConfirm === 1 &&
                                    setOptions(true);
                              }}
                            >
                              <Text
                                style={{
                                  color: "#fff",
                                  fontWeight: "bold",
                                  fontSize: 15,
                                }}
                              >
                                {title === "ToShip"
                                  ? "Confirm"
                                  : item?.paymentImage === "unpaid"
                                  ? "Pay Now"
                                  : item?.orderStatus === 1 &&
                                    item?.statusConfirm === 1 &&
                                    "Review"}
                              </Text>
                            </TouchableOpacity>
                            {options && (
                              <OptionReview
                                data={item.orderItem}
                                setOptions={setOptions}
                              />
                            )}
                          </>
                        )}
                      </Text>
                    </View>
                  </>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default observer(TabOrderScreen);

// import { View, Text, ScrollView, TouchableOpacity } from "react-native";
// import React, { useState } from "react";
// import { OrderEmpty } from "./OrderEnpty";
// import moment from "moment";

// export const Pending = ({ order }: any) => {
//   const [count, setCount] = useState(0);

//   console.log("Count: ", count);

//   return (
//     <>
//       <ScrollView
//         style={{
//           flex: 1,
//           backgroundColor: "#fff",
//           borderWidth: 0.7,
//           marginBottom: -1,
//           marginTop: -1,
//         }}
//       >
//         <View>
//           {order.length === 0 ? (
//             <>
//               <OrderEmpty />
//             </>
//           ) : (
//             <>
//               {order.map((item: any) => {
//                 if (item.orderStatus !== 0) {
//                   setCount(count + 1);
//                 }

//                 return (
//                   <>
//                     {item.orderStatus === 0 && (
//                       <View
//                         style={{
//                           padding: 20,
//                           flexDirection: "row",
//                           justifyContent: "space-around",
//                           borderBottomWidth: 0.7,
//                         }}
//                       >
//                         <Text>{item.address.user.userName}</Text>
//                         {/* <Image
//                  style={{ width: 200, height: 350 }}
//                  source={{
//                  uri: BaseUrl + "/orderImage/" + item.paymentImage,
//                  }}
//                  />  */}
//                         <Text>{item.totalPrice}</Text>
//                         <Text>{moment(item.orderDate).format("DD/MM/YY")}</Text>
//                         <Text>
//                           {item.orderStatus === 0 ? "pending" : "ไปแก้โค้ด"}
//                         </Text>
//                       </View>
//                     )}
//                   </>
//                 );
//               })}
//             </>
//           )}
//         </View>
//       </ScrollView>
//     </>
//   );
// };
