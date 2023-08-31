import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  MaterialCommunityIcons,
  Foundation,
} from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { CardAddressComponent } from "../../address/components/CardAddress.component";
import agent from "../../../store/context/api/agent";
import {
  getCurrentUser,
  setAddress,
} from "../../../store/context/accountSlice";
import { BaseUrl, config } from "../../../Base";
import { Coupon } from "./../../../models/Coupon";
import { OptionCoupon } from "../OptionCoupon";
import { Switch } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { createOrder } from "../../../store/context/shopCartSlice";
import { OptionCheckout } from "../../../checkout/screens/Option.Checkout.Modal";
import { MaterialIcons } from "@expo/vector-icons";
import { Checkout } from "./../../../checkout/screens/Checkout.screen";
import { observer } from "mobx-react-lite";

var width = Dimensions.get("window").width;

const CreateOrderScreen = ({ route, navigation }: any) => {
  const { shopCart } = route.params;
  const { token, address, user }: any = useAppSelector(
    (state) => state.account
  );
  const [image, setImage]: any = useState(null);
  const [isSwitchOn, setIsSwitchOn]: any = React.useState(false);

  const [options, setOptions] = useState(false);
  const [transferPayment, setTransferPayment] = useState(false);
  const [creditCard, setCreditCard] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [data, setData] = useState(null);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const [optionCoupon, setOptionCoupon] = useState(false);
  const [Coupon, setCoupon]: any = useState<Coupon[]>([]);

  const dispatch = useAppDispatch();

  const GetAddress = async () => {
    const Address = await agent.Account.GetAddress({
      userId: token.userDto.userId,
    });
    dispatch(setAddress(Address));
  };

  useEffect(() => {
    GetAddress();
  }, [isSwitchOn]);

  //console.log("Create", shopCart.items[0]);

  // console.log("shopCart", shopCart);

  let totalPrice = shopCart.items.reduce((total: number, item: any) => {
    return total + item.product.price * item.quantity;
  }, 0);

  if (isSwitchOn) {
    totalPrice - user?.coin.toFixed();
  }

  //console.log("user", user);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
      let fileUri = fileInfo.uri;
      let fileName = fileUri.split("/").pop();
      let fileType = "image/jpeg"; // ปรับปรุงประเภทไฟล์ตามความต้องการ

      setImage({
        uri: fileUri,
        name: fileName,
        type: fileType,
      });
    }
  };

  console.log("transferPayment : ", transferPayment);

  const conFirmOrder = () => {
    // if (image !== null) {
    if (address.length === 0) {
      Alert.alert("Address is null", "You should create an address first.", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
        {
          text: "Go",
          onPress: () => navigation.navigate("myAddress", { order: true }),
        },
      ]);
    } else {
      // if (transferPayment) {
      dispatch(
        createOrder({
          id: 0,
          paymentMethod: transferPayment ? 0 : creditCard ? 1 : "",
          paymentImage: image,
          couponId: Coupon?.length === 0 ? null : Coupon.id,
          addressId: address[0].id,
          coin: isSwitchOn ? user?.coin.toFixed() : null,
        })
      ).then((e: any) => {
        // alert("KARM TEST LOG: " + JSON.stringify(e, null, 2));
        if (transferPayment) {
          navigation.navigate("ShopCart");
        }
        if (creditCard) {
          setCheckout(true);
          setData(e.payload);
        }
      });
      // }
    }
    // navigation.navigate("Checkout", data);
    // } else {
    //   Alert.alert("error slip", "enter your slip", [
    //     // {
    //     //   text: "Cancel",
    //     //   onPress: () => console.log("Cancel Pressed"),
    //     //   style: "cancel",
    //     // },
    //     { text: "OK", onPress: () => console.log("OK Pressed") },
    //   ]);
    // }
  };

  useEffect(() => {
    dispatch(getCurrentUser(token.userDto.userId));
  }, []);

  // console.log("user?.coin", user?.coin.toFixed());

  const AlertSelectPayments = () => {
    Alert.alert("please select your payments", "please select your payments", [
      // {
      //   text: "Cancel",
      //   onPress: () => console.log("Cancel Pressed"),
      //   style: "cancel",
      // },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  // console.log("transferPayment", transferPayment);
  // console.log("creditCard", creditCard);
  // console.log("if", transferPayment ? 0 : creditCard ? 1 : "goof");

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <ScrollView style={{ marginBottom: 58 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              style={{ paddingTop: 20, paddingLeft: 20 }}
              name="back"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, paddingBottom: 10 }}>
              Make an order
            </Text>
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="map-marker-radius-outline"
                size={24}
                color="black"
                style={{ bottom: 5 }}
              />
              <Text style={{ marginLeft: 5 }}>delivery address</Text>
            </View>
            <View>
              {address.map((item: any) => (
                <>
                  {item.statusUse === 1 && (
                    <TouchableOpacity
                      style={{
                        borderBottomWidth: 0.7,
                        paddingVertical: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      onPress={() =>
                        navigation.navigate("myAddress", { order: true })
                      }
                    >
                      <CardAddressComponent item={item} />
                    </TouchableOpacity>
                  )}
                </>
              ))}
            </View>
            <View>
              {shopCart.items.map((item: any) => (
                <>
                  <View
                    style={{
                      paddingVertical: 10,
                      borderBottomWidth: 0.5,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                          marginRight: 10,
                        }}
                        source={{
                          uri: BaseUrl + "/productImage/" + item.product.image,
                        }}
                      />
                      <View
                        style={{
                          justifyContent: "space-between",
                          flex: 1,
                        }}
                      >
                        <Text>
                          {item.product.name.length > 50
                            ? item.product.name.substring(0, 50) + "..."
                            : item.product.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text>
                            {"฿" + item.product.price.toLocaleString()}
                          </Text>
                          <Text>x{item.quantity}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              ))}
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                paddingVertical: 5,
                justifyContent: "space-between",
                borderBottomWidth: 0.5,
              }}
              onPress={() => setOptionCoupon(true)}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  source={require("../imageNicon/promo-code.png")}
                />
                <Text style={{ marginLeft: 5 }}>discount code</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                {Coupon?.name ? (
                  <Text>{Coupon?.name}</Text>
                ) : (
                  <>
                    <Text style={{ marginLeft: 5 }}>Select discount</Text>
                    <AntDesign
                      name="right"
                      size={15}
                      color="black"
                      style={{ top: 3, left: 3 }}
                    />
                  </>
                )}
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 5,
                justifyContent: "space-between",
                borderBottomWidth: 0.5,
                marginTop: 4,
                height: 40,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="hand-coin-outline"
                  size={24}
                  color="black"
                  style={{ bottom: 4 }}
                />
                <Text style={{ marginLeft: 5 }}>
                  Coins{" "}
                  {user?.coin > 0
                    ? user?.coin.toFixed()
                    : "Coins cannot be used in this order."}
                </Text>
              </View>
              {user?.coin > 0 && (
                <View style={{ top: -10 }}>
                  <Switch
                    color="black"
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                    disabled={user?.coin <= 0 ? true : false}
                  />
                </View>
              )}
            </View>

            <View>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <Foundation name="clipboard-notes" size={24} color="black" />
                <Text style={{ marginLeft: 5 }}>payment information</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  justifyContent: "space-between",
                  borderBottomWidth: 0.5,
                  marginTop: 4,
                }}
              >
                <View>
                  <Text>combine order</Text>
                </View>
                <View>
                  <Text>x{shopCart.items.length}</Text>
                </View>
              </View>
            </View>

            {isSwitchOn && (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 5,
                    justifyContent: "space-between",
                    borderBottomWidth: 0.5,
                    marginTop: 4,
                  }}
                >
                  <View>
                    <Text>Coin</Text>
                  </View>
                  <View>
                    <Text>{user?.coin.toFixed()}</Text>
                  </View>
                </View>
              </View>
            )}
            {Coupon?.id !== undefined && (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 5,
                    justifyContent: "space-between",
                    borderBottomWidth: 0.5,
                    marginTop: 4,
                  }}
                >
                  <View>
                    <Text>Discount</Text>
                  </View>
                  <View>
                    <Text>{Coupon?.name}</Text>
                  </View>
                </View>
              </View>
            )}
            {/* <TouchableOpacity onPress={() => pickImage()}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: width - 10, height: 300 }}
                />
              ) : (
                <Image
                  style={{
                    height: 220,
                    width: width / 2 - 10,
                  }}
                  source={{
                    uri: "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
                  }}
                />
              )}
            </TouchableOpacity> */}

            <TouchableOpacity
              style={{
                flexDirection: "row",
                paddingVertical: 5,
                justifyContent: "space-between",
                borderBottomWidth: 0.5,
              }}
              onPress={() => setOptions(true)}
            >
              <View style={{ flexDirection: "row" }}>
                {transferPayment ? (
                  <MaterialCommunityIcons
                    name="bank-transfer-out"
                    size={24}
                    color="black"
                  />
                ) : creditCard ? (
                  <MaterialIcons name="payment" size={24} color="black" />
                ) : (
                  <></>
                )}
                <Text style={{ marginLeft: 5 }}>MethodPayments</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                {transferPayment ? (
                  <Text>transferPayment</Text>
                ) : creditCard ? (
                  <Text>creditCard</Text>
                ) : (
                  <>
                    <Text style={{ marginLeft: 5 }}>Select Payments</Text>
                    <AntDesign
                      name="right"
                      size={15}
                      color="black"
                      style={{ top: 3, left: 3 }}
                    />
                  </>
                )}
              </View>
            </TouchableOpacity>
            {transferPayment && (
              <View style={{ alignItems: "center", marginVertical: 10 }}>
                {image ? (
                  <TouchableOpacity onPress={() => pickImage()}>
                    <Image
                      source={{ uri: image.uri }}
                      style={{ width: width, height: 300 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => pickImage()}
                    style={[styles.dropzone]}
                  >
                    <Text style={styles.text}>Press to make your slip.</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            backgroundColor: "#fff",
          }}
        >
          <View style={{ flex: 0.8, alignItems: "flex-end", right: 10 }}>
            <Text>Total Price</Text>
            <Text>
              {/* {Coupon?.id !== undefined
                ? totalPrice - (totalPrice * Coupon.disCount) / 100
                : totalPrice} */}
              {Coupon?.id && isSwitchOn
                ? totalPrice -
                  (totalPrice * Coupon.disCount) / 100 -
                  user?.coin.toFixed()
                : Coupon?.id !== undefined
                ? totalPrice - (totalPrice * Coupon.disCount) / 100
                : isSwitchOn
                ? totalPrice - user?.coin.toFixed()
                : totalPrice}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor: "#000",
              alignItems: "center",
              flex: 0.2,
            }}
            onPress={() =>
              transferPayment
                ? conFirmOrder()
                : creditCard
                ? conFirmOrder()
                : // navigation.navigate("Checkout", data)
                  // setCheckout(true)
                  AlertSelectPayments()
            }
          >
            <Text style={{ color: "#fff" }}>Pay</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {optionCoupon && (
        <OptionCoupon optionCoupon={setOptionCoupon} setCoupon={setCoupon} />
      )}
      {options && (
        <OptionCheckout
          setOptions={setOptions}
          setTransferPayment={setTransferPayment}
          setCreditCard={setCreditCard}
        />
      )}
      {checkout && <Checkout data={data} />}
    </>
  );
};

export default observer(CreateOrderScreen);

const styles = StyleSheet.create({
  dropzone: {
    width: 300,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  dropzoneActive: {
    borderColor: "blue",
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    marginTop: 10,
    backgroundColor: "blue",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
});
