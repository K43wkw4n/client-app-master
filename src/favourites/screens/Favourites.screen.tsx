import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useAppSelector } from "../../store/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardProduct } from "../../features/product/components/CardProduct";
import { AntDesign } from "@expo/vector-icons";
import { width } from "../../features/feature";
import Lottie from "lottie-react-native";

export const FavouritesScreen = ({ navigation }: any) => {
  const { favourites } = useAppSelector((state) => state.account);

  console.log("favourites", favourites);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView>
          <View>
            <View style={{ marginBottom: 30 }}>
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
                  My Favourites
                </Text>
              </View>
            </View>
            {!!favourites.length ? (
              <View>
                <FlatList
                  data={favourites}
                  renderItem={(item) => (
                    <CardProduct data={item} navigation={navigation} />
                  )}
                  keyExtractor={(_, i): any => i}
                />
              </View>
            ) : (
              // <View
              //   style={{
              //     alignItems: "center",
              //   }}
              // >
              //   <Image
              //     style={{ width: width, height: 400 }}
              //     source={{
              //       uri: "https://static.thenounproject.com/png/3900390-200.png",
              //     }}
              //   />
              // </View>
              <View style={styles.lottie}>
                <Lottie
                  source={require("../../../assets/images/favourite.json")}
                  autoPlay
                  loop
                />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: width,
    height: width,
  },
});
