import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { BaseUrl } from "../../../Base";
import { AntDesign } from "@expo/vector-icons";
import { width } from "../../../features/feature";
import agent from "../../../store/context/api/agent";
import { useAppSelector } from "../../../store/store";
import { useStore } from "../../../store-plus/store-plus";
import { observer } from "mobx-react-lite";

const ReviewScreen = ({ route, navigation }: any) => {
  const { product, orderItemId, orderId } = route.params;
  const { token } = useAppSelector((state) => state.account);
  const { createReview, createConnection } = useStore().reviewStore;

  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");
  const [imageReviews, setImageReviews]: any[] = useState([]);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleReviewText = (text: string) => {
    setReviewText(text);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      let fileUri = fileInfo.uri;
      let fileName = fileUri.split("/").pop();
      let fileType = "image/jpeg";

      const newImageReview = {
        uri: fileUri,
        name: fileName,
        type: fileType,
      };

      setImageReviews((prevImageReviews: any) => [
        ...prevImageReviews,
        newImageReview,
      ]);
    }

    console.log("result", result);
  };

  const CreateReview = async () => {
    try {
      if (reviewText === "" || rating === 0) {
        Alert.alert(
          "something went wrong.",
          "Some information is not filled in.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
      } else {
        await agent.Reviews.createReview(
          {
            description: reviewText,
            rate: rating,
            productId: product.id,
            userId: token?.userDto.userId,
            orderItemId: orderItemId,
          },
          imageReviews
        )
          .then((res: any) => {
            console.log("testres :", res);
            createReview(res?.id);
          })
          .then(() => navigation.goBack());
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    createConnection(product?.id);
  }, []);

  // console.log("orderItemId : ", orderItemId);

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#fff",
          marginTop: 20,
        }}
      >
        <AntDesign
          style={{ paddingTop: 20, paddingLeft: 20 }}
          name="back"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <View
          style={{
            paddingVertical: 20,
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
                uri: BaseUrl + "/productImage/" + product.image,
              }}
            />
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>
                  {product.name.length > 50
                    ? product.name.substring(0, 50) + "..."
                    : product.name}
                </Text>
                <Text>
                  {product.description.length > 50
                    ? product.description.substring(0, 50) + "..."
                    : product.description}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{"฿" + product.price.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        </View>

        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Share more thoughts on the product to help other buyers."
          style={{
            borderWidth: 1,
            borderColor: "#e0e0e0",
            borderRadius: 10,
            padding: 10,
            textAlignVertical: "top",
            height: 150,
            marginTop: 20,
          }}
          value={reviewText}
          onChangeText={handleReviewText}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {[1, 2, 3, 4, 5].map((value) => (
              <TouchableOpacity key={value} onPress={() => handleRating(value)}>
                {/* Icon ที่ต้องใช้ ! หลัง rating เพราะจะขึ้น Error rating' is possibly 'null' มันแจ้งว่า... */}
                {/* rating อาจจะเป็น null ถ้าเราคิดว่า rating มีค่า และ ไม่เป็น null ให้ใช้ ! เพื่อบอกมันว่าจะไม่เป็น null แน่นอน*/}
                <AntDesign
                  name={rating! >= value ? "star" : "staro"}
                  size={40}
                  color={rating! >= value ? "#000" : "#000"}
                  style={{ marginRight: 35 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {imageReviews.map((image: any, index: any) => (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={{
                width: 107,
                height: 100,
                borderRadius: 10,
                marginHorizontal: 5,
                marginBottom: 10,
              }}
            />
          ))}
          <TouchableOpacity onPress={pickImage}>
            <View
              style={{
                width: 90,
                height: 100,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "gray",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                borderStyle: "dashed",
              }}
            >
              <Text>Upload</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 25,
              backgroundColor: "#000",
              width: width - 25,
              padding: 20,
              borderRadius: 6,
              alignItems: "center",
            }}
            onPress={CreateReview}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default observer(ReviewScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
});
