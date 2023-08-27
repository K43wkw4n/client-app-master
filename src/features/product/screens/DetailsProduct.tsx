import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  ToastAndroid,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../../../screens/Loading";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { AntDesign } from "@expo/vector-icons";
import agent from "../../../store/context/api/agent";
import { getShopCartAsync } from "../../../store/context/shopCartSlice";
import { BaseUrl } from "../../../Base";
import { setAccount } from "../../../store/context/accountSlice";
import {
  Card,
  Text as TextPaper,
  Button as ButtonPaper,
  TouchableRipple,
} from "react-native-paper";
import { useStore } from "../../../store-plus/store-plus";
import { observer } from "mobx-react-lite";
import { width } from "../../../features/feature";

const showToastBasket = () => {
  ToastAndroid.showWithGravity(
    "your basket is excessed!",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};

const showToastAddSucess = () => {
  ToastAndroid.showWithGravity(
    "you add to your basket successfully!",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};

const DetailsProduct = ({ route, navigation }: any) => {
  const { products } = useAppSelector((state) => state.product);
  const { token } = useAppSelector((state) => state.account);
  const { Reviews, createConnection } = useStore().reviewStore;
  const [load, setLoad] = useState(true);
  const { item }: any = route.params;

  const numberMore: number = Reviews.length;

  const [showImage, setShowImage]: any = useState();
  const [border, setBorder] = useState(0);
  const [showMoreReview, setShowMoreReview] = useState(
    numberMore === 0 ? 0 : 2
  );

  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);

  const getShopCart = () => {
    dispatch(getShopCartAsync({ userId: token.userDto.userId })).catch(
      (error) => {
        console.log("Login error:", error);
      }
    );
  };

  useEffect(() => {
    createConnection(item?.id);
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setShowMoreReview(numberMore === 0 ? 0 : 2);
  }, [numberMore]);

  //console.log("data", item);

  const addToCart = async () => {
    if (!!token) {
      Alert.alert("Add to Cart", "Are you sure add to cart", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () =>
            // const find = shopCart?.items.find((x) => x.productId === item?.id);
            // if (find !== undefined) {
            //if (quantity + find.quantity < find.quantity) {
            [
              await agent.ShopCart.addToCart({
                userId: token.userDto.userId,
                productId: item?.id,
                quantity: quantity,
              }),
              showToastAddSucess(),
              // } else {
              //   showToastBasket();
              // }
              // } else {
              //   await agent.ShopCart.addToCart({
              //     userName: token.userDto.userName,
              //     productId: item?.id,
              //     quantity: quantity,
              //   });
              //   showToastAddSucess();
              // }
              //console.log("find", find);
              getShopCart(),
            ],
        },
      ]);
    } else {
      Alert.alert("Please Login", "Please Login or Register", [
        {
          text: "Ok",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Go", onPress: () => dispatch(setAccount(true)) },
      ]);
    }
  };

  // console.log("numberMore", numberMore);
  console.log("Reviews", Reviews.length);
  // console.log("showMoreReview", showMoreReview);

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: "#fff", flex: 1, paddingBottom: 80 }}
      >
        <ScrollView style={{ backgroundColor: "#fff" }}>
          <TouchableOpacity
            style={{
              position: "absolute",
              zIndex: 1,
              marginTop: 4,
            }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign
              style={{
                padding: 20,
              }}
              name="back"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <View>
            <Image
              style={{
                height: 350,
                width: width,
                borderBottomRightRadius: 40,
                borderBottomLeftRadius: 40,
              }}
              source={
                showImage
                  ? {
                      uri: BaseUrl + "/productImages/" + showImage,
                    }
                  : {
                      uri: BaseUrl + "/productImage/" + item?.image,
                    }
              }
            />
          </View>
          <ScrollView
            horizontal
            style={{
              paddingHorizontal: 11,
              marginTop: 20,
            }}
          >
            <TouchableRipple
              style={{
                borderWidth: 2,
                borderColor: border === 0 ? "red" : "white",
                marginRight: 20,
                borderRadius: 12,
                height: 104,
                width: 104,
              }}
              onPress={() => [setShowImage(undefined), setBorder(0)]}
            >
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 10,
                }}
                source={{
                  uri: BaseUrl + "/productImage/" + item.image,
                }}
              />
            </TouchableRipple>
            {item?.productImages?.map((item: any, i: any) => (
              <TouchableRipple
                style={{
                  borderWidth: 2,
                  borderColor: border === i + 1 ? "red" : "white",
                  marginRight: 20,
                  borderRadius: 12,
                  height: 104,
                  width: 104,
                }}
                key={item?.id}
                onPress={() => [setShowImage(item?.image), setBorder(i + 1)]}
              >
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 10,
                  }}
                  source={{
                    uri: BaseUrl + "/productImages/" + item.image,
                  }}
                />
              </TouchableRipple>
            ))}
          </ScrollView>
          <View style={{ marginHorizontal: 20 }}>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {item.name.length > 50
                  ? item.name.substring(0, 50) + " ..."
                  : item.name}
              </Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>{item?.description}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 20 }}>
                {"฿" + item?.price.toLocaleString()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 20,
                borderBottomWidth: 0.5,
                paddingBottom: 8,
              }}
            >
              <Text style={{ fontSize: 18 }}>
                Quantity{"              "}
                {item?.quantity}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginHorizontal: 20, bottom: 5 }}
                  onPress={() => {
                    quantity > 1 && setQuantity(quantity - 1);
                  }}
                >
                  <AntDesign name="minuscircleo" size={40} color="black" />
                </TouchableOpacity>
                <View>
                  <Text style={{ fontSize: 18 }}>{quantity}</Text>
                </View>
                <TouchableOpacity
                  style={{ marginHorizontal: 20, bottom: 5 }}
                  onPress={() => {
                    quantity < item?.quantity && setQuantity(quantity + 1);
                  }}
                >
                  <AntDesign name="pluscircleo" size={40} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Size : {item?.size} US</Text>
            </View>
          </View>

          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}>Reviews</Text>
            {Reviews.map((reviews: any, i: any) => (
              <>
                {i + 1 <= showMoreReview && (
                  <>
                    <Card
                      style={{ marginVertical: 10, backgroundColor: "#fff" }}
                    >
                      <Card.Title
                        title={reviews?.user.userName}
                        subtitle={[1, 2, 3, 4, 5].map((x) => (
                          <AntDesign
                            name={x <= reviews?.rate ? "star" : "staro"}
                            size={20}
                            color="black"
                          />
                        ))}
                      />
                      <Card.Content>
                        <TextPaper variant="bodyMedium">
                          {reviews?.description}
                        </TextPaper>
                        <TextPaper variant="bodyMedium">
                          {new Date(reviews.createDate).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </TextPaper>
                        <View
                          style={{
                            marginTop: 20,
                          }}
                        >
                          {reviews?.reviewImages.map((review: any) => (
                            <Card.Cover
                              style={{
                                height: 80,
                                width: 80,
                              }}
                              source={{
                                uri: BaseUrl + "/reviewImages/" + review?.image,
                              }}
                            />
                          ))}
                        </View>
                      </Card.Content>
                    </Card>
                  </>
                )}
              </>
              // <View>
              //   <Text style={{ fontSize: 16 }}>{review.description}</Text>
              //   <Text>
              //     {new Date(review.createDate).toLocaleString("en-US", {
              //       year: "numeric",
              //       month: "2-digit",
              //       day: "2-digit",
              //       hour: "2-digit",
              //       minute: "2-digit",
              //     })}
              //   </Text>
              // </View>
            ))}
            {showMoreReview !== Reviews.length && Reviews.length >= 2 && (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  // onPress={() => setShowMoreReview(Reviews.length)}
                  onPress={() => navigation.navigate("AllReview", Reviews)}
                >
                  <Text style={{ marginRight: 10 }}>More</Text>
                  <AntDesign name="rightcircleo" size={26} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <ScrollView
            horizontal={true}
            style={{ marginLeft: 10, marginTop: 10 }}
          >
            <>
              {products?.map((products) => (
                <>
                  {products?.id != item.id && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.push("DetailsProduct", {
                          item: products,
                        })
                      }
                      style={{ marginVertical: 10, marginHorizontal: 5 }}
                    >
                      <Image
                        style={{
                          height: 100,
                          width: 100,
                          borderRadius: 20,
                        }}
                        source={{
                          uri: BaseUrl + "/productImage/" + products?.image,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </>
              ))}
            </>
          </ScrollView>
        </ScrollView>
        <TouchableOpacity
          onPress={() => addToCart()}
          style={{
            marginHorizontal: 20,
            backgroundColor: "#000",
            borderRadius: 30,
            alignItems: "center",
            position: "absolute",
            bottom: 20,
            right: 0,
            left: 0,
          }}
        >
          <Text style={{ padding: 10, color: "#fff" }}>Add To Cart</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {load && <Loading />}
    </>
  );
};

export default observer(DetailsProduct);
