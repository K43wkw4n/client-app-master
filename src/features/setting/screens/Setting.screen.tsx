import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Logout, setAccount } from "../../../store/context/accountSlice";
import { ChangePasswd } from "../components/ChangePasswd";
import * as ImagePicker from "expo-image-picker";
import agent from "../../../store/context/api/agent";
import { setShopCart } from "../../../store/context/shopCartSlice";
import { Order } from "../../../models/Order";
import { MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import { useStore } from "../../../store-plus/store-plus";
import { observer } from "mobx-react-lite";
import { Badge } from "react-native-paper";

var width = Dimensions.get("window").width;

const SettingScreen = ({ navigation }: any) => {
  const { token, favourites } = useAppSelector((state) => state.account);
  const { shopCart } = useAppSelector((state) => state.shopCart);
  const [image, setImage]: any = useState(null);
  const dispatch = useAppDispatch();

  const { badgeOrder, badgeCancel, orders } = useStore().userOrderStore;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // const GetOrder = async () => {
  //   const order = await agent.Orders.getOrderList({
  //     userId: token?.userDto.userId,
  //   });
  //   setOrder(order);
  // };

  useEffect(() => {
    // GetOrder();
  }, [shopCart]);

  // console.log("token", token.userDto.userId);
  // console.log("token", token);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <TouchableOpacity
        onPress={() => pickImage()}
        style={{ alignItems: "center" }}
      >
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
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
        }}
      >
        {!!token ? (
          <>
            <Text style={{ fontSize: 20 }}>{token?.userDto.userName}</Text>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 20 }}>Anonymous</Text>
          </>
        )}
      </View>
      {!!token ? (
        <>
          <ChangePasswd />
          <TouchableOpacity
            onPress={() => navigation.navigate("myAddress", { order: false })}
            style={{
              padding: 20,
              flexDirection: "row",
            }}
          >
            <View style={{ marginTop: 3, marginRight: 10 }}>
              <Entypo name="address" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 20,
              }}
            >
              My Address
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("myOrder")}
            style={{
              padding: 20,
              flexDirection: "row",
            }}
          >
            <View style={{ marginTop: 3, marginRight: 10 }}>
              <Entypo name="news" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 20,
              }}
            >
              My Order
            </Text>
            {badgeOrder && badgeCancel ? (
              <Badge
                style={{
                  position: "relative",
                  fontSize: 20,
                  top: -10,
                  backgroundColor: "red",
                  padding: 2,
                }}
              ></Badge>
            ) : badgeOrder ? (
              <Badge
                style={{
                  position: "relative",
                  fontSize: 20,
                  top: -10,
                  backgroundColor: "red",
                  padding: 2,
                }}
              ></Badge>
            ) : badgeCancel ? (
              <Badge
                style={{
                  position: "relative",
                  fontSize: 20,
                  top: -10,
                  backgroundColor: "red",
                  padding: 2,
                }}
              ></Badge>
            ) : orders?.filter(
                (x) => x.orderStatus === 0 && x.paymentImage === "unpaid"
              ).length === 1 ? (
              <Badge
                style={{
                  position: "relative",
                  fontSize: 20,
                  top: -10,
                  backgroundColor: "red",
                  padding: 2,
                }}
              ></Badge>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("myFavourites")}
            style={{
              padding: 20,
              flexDirection: "row",
            }}
          >
            <View style={{ marginTop: 3, marginRight: 10 }}>
              <AntDesign
                name={favourites.length === 0 ? "hearto" : "heart"}
                size={24}
                color="red"
              />
            </View>
            <Text
              style={{
                fontSize: 20,
              }}
            >
              My Favourites
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => [dispatch(Logout()), dispatch(setShopCart())]}
            style={{
              padding: 20,
              flexDirection: "row",
            }}
          >
            <View style={{ marginTop: 3, marginRight: 10 }}>
              <AntDesign name="logout" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Log out
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 1,
              bottom: 15,
            }}
          >
            {/* <Text style={{ fontSize: 12 }}>Please Login</Text> */}
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                width: width - 25,
                padding: 20,
                borderRadius: 6,
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => dispatch(setAccount(true))}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Login or Register
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default observer(SettingScreen);
