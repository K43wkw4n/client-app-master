import { View, ScrollView, StyleSheet, Alert } from "react-native";
import React from "react";
import { Button, Card, Text as TextPaper } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { BaseUrl } from "../../../Base";
import Lottie from "lottie-react-native";
import { width } from "../../../features/feature";
import { observer } from "mobx-react-lite";
import { useAppSelector } from "../../../store/store";
import agent from "../../../store/context/api/agent";
import { useStore } from "../../../store-plus/store-plus";

const TabReviewScreen = ({ Reviews, title, navigation }: any) => {
  const { getMyReviews } = useStore().reviewStore;
  const { token } = useAppSelector((state) => state.account);

  const deleteReview = (reviewId: any) => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () =>
          agent.Reviews.deleteReview(reviewId).then(() => {
            getMyReviews(token?.userDto.userId);
          }),
      },
    ]);
  };

  return (
    <ScrollView>
      <View>
        {Reviews.length === 0 ? (
          <>
            <View style={styles.lottie}>
              <Lottie
                source={require("../../../../assets/images/starlottie.json")}
                autoPlay
                loop
              />
            </View>
          </>
        ) : (
          <>
            {Reviews?.map((reviews: any, i: any) => (
              <>
                <Card style={{ marginVertical: 5, backgroundColor: "#fff" }}>
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
                      {new Date(reviews.createDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
                  {title === "MyReviews" && (
                    <Card.Actions>
                      <Button
                        onPress={() =>
                          navigation.navigate("UpdateReviewScreen", {
                            review: reviews,
                          })
                        }
                        textColor="black"
                        rippleColor="black"
                      >
                        Edit
                      </Button>
                      <Button
                        onPress={() => deleteReview(reviews?.id)}
                        buttonColor="black"
                        rippleColor="white"
                      >
                        Delete
                      </Button>
                    </Card.Actions>
                  )}
                </Card>
              </>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default observer(TabReviewScreen);

const styles = StyleSheet.create({
  lottie: {
    width: width,
    height: width,
  },
});
