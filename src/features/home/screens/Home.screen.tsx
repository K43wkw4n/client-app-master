import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardProduct } from "../../product/components/CardProduct";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchProductsAsync,
  setProduct,
} from "../../../store/context/productSlice";
import agent from "../../../store/context/api/agent";
import moment from "moment";
import { setCoupon } from "../../../store/context/couponSlice";
import {
  AlreadyLogin,
  getCurrentUser,
  setFavourites,
} from "../../../store/context/accountSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getShopCartAsync } from "../../../store/context/shopCartSlice";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import { useStore } from "../../../store-plus/store-plus";
import { CouponScreen } from "../../coupon/screens/Coupon.screen";
import Lottie from "lottie-react-native";

const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

var width = Dimensions.get("window").width;

export const HomeScreen = ({ navigation }: any) => {
  const { products } = useAppSelector((state) => state.product);
  const { coupon }: any = useAppSelector((state) => state.coupon);
  const { token, accountScreen, favourites }: any = useAppSelector(
    (state) => state.account
  );

  const currentDate = new Date();

  const { loadNotifications } = useStore().userOrderStore;

  const [search, setSearch]: any = useState("");
  const [sort, setSort] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useAppDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getCoupons = async () => {
    const coupons = await agent.Coupons.couponList();
    dispatch(setCoupon(coupons));
    //console.log("coupons", coupons);
  };

  //console.log("loading : ", loading, "\nproducts", products);

  const loadFavourites = async (uid: any) => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${uid}`);
      if (value !== null) {
        dispatch(setFavourites(JSON.parse(value)));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  const LoadNotifications = async (uid: any) => {
    try {
      const value = await AsyncStorage.getItem(`@Notifications-${uid}`);
      if (value !== null) {
        loadNotifications(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@Token");
      const token = jsonValue != null && JSON.parse(jsonValue);

      // const response = await agent.Account.checkToken(token);
      // console.log("Token validation response:", response);
      dispatch(AlreadyLogin(token));
      dispatch(getShopCartAsync({ userId: token.userDto.userId })).catch(
        (error) => {
          console.log("Login error:", error);
        }
      );
      // Handle the response as needed
    } catch (error) {
      console.log("Error reading value :", error);
      // Handle the error case
    }
  };

  const fetchAllItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);

      console.log("👍", items);
    } catch (error) {
      console.log(error, "problemo");
    }
  };

  useEffect(() => {
    getData();
    getCoupons();
    // fetchAllItems();
    // loadFavourites(!!token ? token.userDto.userId : null);
  }, []);

  useEffect(() => {
    loadFavourites(!!token ? token.userDto.userId : null);
    LoadNotifications(!!token ? token.userDto.userId : null);
  }, [!!token]);

  // console.log("token", token.userDto.userId);
  // console.log("account", accountScreen);
  // console.log("fave", favourites);

  const fillters = async (search: any) => {
    const product = await agent.Products.fillterProductList(search);
    dispatch(setProduct(product));
  };

  useEffect(() => {
    // dispatch(fetchProductsAsync());
    fillters(search);
  }, [search]);

  const sortedProducts = sort
    ? [...products].sort((a, b) => a.price - b.price)
    : products;

  // console.log("product", sortedProducts);

  // console.log(".env : ", process.env.EXPO_PUBLIC_REACT_APP_API_URL);

  // console.log("sortedProducts : ", sortedProducts);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={styles.width}>
          <TextInput
            style={[styles.input]}
            onChangeText={(e) => setSearch(e)}
            value={search}
            placeholder="search"
          />
          {!!search && (
            <TouchableOpacity
              onPress={() => setSearch("")}
              style={{ position: "absolute", right: 35, top: 40 }}
            >
              <FontAwesome name="remove" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
        {sortedProducts.length === 0 ? (
          <>
            <View style={styles.lottie}>
              <Lottie
                source={require("../../../../assets/images/productEmpty.json")}
                autoPlay
                loop
              />
            </View>
          </>
        ) : (
          <>
            <FlatList
              ListHeaderComponent={() => (
                <>
                  <View>
                    <Text
                      style={{
                        fontFamily: "Comfortaa_500Medium",
                        fontSize: 40,
                        marginLeft: 10,
                      }}
                    >
                      HachiShop
                    </Text>
                  </View>
                  <View style={{ position: "absolute", right: 0, top: 17 }}>
                    <TouchableOpacity
                      onPress={() => setSort(!sort)}
                      style={{ alignItems: "flex-end", marginEnd: 10 }}
                    >
                      {sort ? (
                        <Entypo name="list" size={37} color="black" />
                      ) : (
                        <Ionicons name="list" size={35} color="black" />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View>
                    <ScrollView horizontal={true}>
                      {coupon?.map((item: any) => {
                        const date = item.expire;
                        const Expire = new Date(date);

                        return (
                          currentDate < Expire && (
                            <>
                              {item.quantity > 0 && (
                                <>
                                  <View
                                    style={{
                                      backgroundColor: "#000",
                                      margin: 10,
                                      borderRadius: 10,
                                      flexDirection: "row",
                                      position: "relative",
                                    }}
                                  >
                                    <CouponScreen item={item} />
                                  </View>
                                </>
                                // <View
                                //   style={{
                                //     margin: 10,
                                //     padding: 20,
                                //     borderWidth: 0.7,
                                //   }}
                                // >
                                //   <Text style={{ fontSize: 15 }}>{item.name}</Text>
                                //   <Text style={{ fontSize: 15 }}>
                                //     หมดอายุ :{" "}
                                //     {moment(item.expire).format("DD/MM/YY")}
                                //   </Text>
                                //   <Text style={{ fontSize: 15 }}>
                                //     จำนวน : {item.quantity}
                                //   </Text>
                                // </View>
                              )}
                            </>
                          )
                        );
                      })}
                    </ScrollView>
                  </View>
                  {/* <Text
                style={{
                  fontFamily: "Comfortaa_500Medium",
                  fontWeight: "bold",
                  marginLeft: 10,
                  marginBottom: 20,
                }}
              >
                CONVERSE
              </Text> */}
                </>
              )}
              data={sortedProducts}
              renderItem={(item: any) => (
                <CardProduct data={item} navigation={navigation} />
              )}
              keyExtractor={(_, i): any => i}
              // numColumns={2}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 0.7,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 100 / 2,
  },
  width: {
    width: width,
    paddingVertical: 10,
  },
  lottie: {
    width: width,
    height: width,
  },
});
