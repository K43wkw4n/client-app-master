import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React from "react";
import { BaseUrl } from "../../../Base";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";

const OptionReview = ({ data, setOptions }: any) => {
  const navigation: any = useNavigation();

  return (
    <Modal animationType="slide">
      <TouchableOpacity
        onPress={() => setOptions(false)}
        style={{
          backgroundColor: "#000",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
          }}
        >
          back
        </Text>
      </TouchableOpacity>
      <View>
        {data.map((item: any) => (
          <>
            {item.statusReview === 0 && (
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  borderBottomWidth: 0.5,
                }}
                onPress={() => [
                  navigation.navigate("ReviewScreen", {
                    product: item.product,
                    orderItemId: item.id,
                  }),
                  setOptions(false),
                ]}
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
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Text>
                        {item.product.name.length > 50
                          ? item.product.name.substring(0, 50) + "..."
                          : item.product.name}
                      </Text>
                      <Text>
                        {item.product.description.length > 50
                          ? item.product.description.substring(0, 50) + "..."
                          : item.product.description}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>{"฿" + item.product.price.toLocaleString()}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </>
        ))}
      </View>
    </Modal>
  );
};

export default observer(OptionReview);
