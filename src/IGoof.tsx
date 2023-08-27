// import { View, Text, Button, Alert } from "react-native";
// import React, { useEffect, useState } from "react";
// import { CardField, useStripe } from "@stripe/stripe-react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export const IGoof = () => {
//   const { confirmPayment }: any = useStripe();
//   const [key, setKey] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:3000/create-payment-intent", {
//       method: "POST",
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         // console.log("intent", res);
//         Alert.alert(res);
//         const intent = res as { clientSecert: string };
//         Alert.alert(intent.clientSecert);
//         setKey(intent.clientSecert);
//       });
//   }, []);

//   const handlePayment = () => {
//     const { error }: any = confirmPayment(key, {
//       type: "Card",
//       billingDetails: {
//         email: "sanung2002@gmail.com",
//       },
//     });

//     if (error) {
//       Alert.alert("Error", error.message);
//     } else {
//       Alert.alert("Payment successfull!");
//     }
//   };

//   return (
//     <>
//       <SafeAreaView>
//         <CardField
//           postalCodeEnabled={false}
//           style={{
//             height: 50,
//             width: "100%",
//           }}
//         />
//         <Button title="Pay now" onPress={handlePayment} />
//       </SafeAreaView>
//     </>
//   );
// };
