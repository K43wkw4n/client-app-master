import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  Alert,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import agent from "../../../store/context/api/agent";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getShopCartAsync } from "../../../store/context/shopCartSlice";
import { BaseUrl } from "../../../Base";

export const CardShopCart = ({ item, navigation }: any) => {
  const { token }: any = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const getShopCart = () => {
    dispatch(getShopCartAsync({ userId: token.userDto.userId })).catch(
      (error) => {
        console.log("Login error:", error);
      }
    );
  };

  const increment = async (quantity: any, quantityProduct: any) => {
    if (quantity < quantityProduct) {
      await agent.ShopCart.addToCart({
        userId: token.userDto.userId,
        productId: item.product.id,
        quantity: 1,
      });
      getShopCart();
    }
  };

  const decrement = async () => {
    await agent.ShopCart.removeFromCart({
      userId: token.userDto.userId,
      productId: item.product.id,
      quantity: 1,
    });
    getShopCart();
  };

  const removeInCart = async (quantity: any) => {
    Alert.alert("are you sure", "are you sure, remove Item?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => [
          await agent.ShopCart.removeFromCart({
            userId: token.userDto.userId,
            productId: item.product.id,
            quantity: quantity,
          }),
          getShopCart(),
        ],
      },
    ]);
  };

  return (
    <View
      key={item?.product.id}
      style={{
        flexDirection: "row",
        marginVertical: 20,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DetailsProduct", {
            item: item.product,
          })
        }
      >
        <Image
          style={{
            height: 100,
            width: 150,
            borderRadius: 20,
          }}
          source={{
            uri: BaseUrl + "/productImage/" + item.product.image,
          }}
        />
        <View style={{ position: "absolute", marginLeft: 7, top: -20 }}>
          <Text>{item.product.brand}</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingVertical: 5,
          marginLeft: 10,
        }}
      >
        <View>
          <Text>
            {item.product.name.length > 50
              ? item.product.name.substring(0, 50) + " ..."
              : item.product.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>{item.product.price.toLocaleString()}</Text>
          <View
            style={{
              flexDirection: "row",
              borderWidth: 0.7,
              paddingHorizontal: 5,
            }}
          >
            <TouchableOpacity
              style={{
                borderRightWidth: 0.7,
                paddingRight: 7,
                paddingTop: 3,
              }}
              onPress={() => decrement()}
            >
              <AntDesign name="minus" size={20} color="black" />
            </TouchableOpacity>
            <View style={{ marginHorizontal: 7 }}>
              <TextInput
                style={{ width: 20, textAlign: "center" }}
                value={item.quantity.toString()}
                placeholder="UserName"
              />
            </View>
            <TouchableOpacity
              style={{
                borderLeftWidth: 0.7,
                paddingLeft: 7,
                paddingTop: 3,
              }}
              onPress={() => increment(item?.quantity, item?.product.quantity)}
            >
              <AntDesign name="plus" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ position: "absolute", top: -10, right: 0 }}>
          <TouchableOpacity
            style={{}}
            onPress={() => removeInCart(item?.quantity)}
          >
            <FontAwesome name="remove" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
