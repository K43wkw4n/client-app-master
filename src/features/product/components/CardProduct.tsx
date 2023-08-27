import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../../Base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { AntDesign } from "@expo/vector-icons";
import {
  addFavourite,
  removeFavourite,
  setAccount,
} from "../../../store/context/accountSlice";

var width = Dimensions.get("window").width;

export const CardProduct = ({ data, navigation }: any) => {
  const { item } = data;

  const { token, favourites }: any = useAppSelector((state) => state.account);

  const dispatch = useAppDispatch();

  const isFavourite = favourites.find((x: any) => x.id === item.id);

  // console.log("token", token.userDto.userId);
  // console.log("item", item);

  useEffect(() => {}, [favourites]);

  return (
    <>
      <View
        style={{
          margin: 5,
          marginTop: 10,
        }}
      >
        <View
          style={{
            width: width - 10,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.push("DetailsProduct", { item })}
          >
            <Image
              style={{
                height: 220,
                width: width / 2,
                borderRadius: 20,
              }}
              source={{
                uri: BaseUrl + "/productImage/" + item.image,
              }}
            />
          </TouchableOpacity>
          <View style={{ margin: 10 }}>
            <Text style={{ marginVertical: 10 }}>{item.name}</Text>
            <Text style={{ marginVertical: 10 }}>
              quantity : {item.quantity}
            </Text>
            <Text style={{ marginVertical: 10 }}>made in : {item.source}</Text>
            <Text style={{ marginVertical: 10 }}>brand : {item.brand}</Text>
            <Text style={{ marginVertical: 10 }}>price : {item.price}</Text>
          </View>
          <TouchableOpacity
            style={{ position: "absolute", right: 0, margin: 5 }}
            onPress={() =>
              !!token
                ? !isFavourite
                  ? dispatch(addFavourite(item))
                  : dispatch(removeFavourite(item))
                : Alert.alert("Please Login", "Please Login or Register", [
                    {
                      text: "Ok",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "Go", onPress: () => dispatch(setAccount(true)) },
                  ])
            }
          >
            <AntDesign
              name={isFavourite ? "heart" : "hearto"}
              size={24}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
