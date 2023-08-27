import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import agent from "../../../store/context/api/agent";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Address } from "../../../models/Address";
import { OptionModal } from "../Option.Modal";
import { setAddress } from "../../../store/context/accountSlice";
import { AntDesign } from "@expo/vector-icons";
import { CardAddressComponent } from "../components/CardAddress.component";
import { width } from "../../feature";
import Lottie from "lottie-react-native";

export const AddressScreen = ({ route, navigation }: any) => {
  const { order } = route.params;
  const { token, address }: any = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const [option, setoption] = useState(false);

  const [itemAddress, setItemAddress] = useState([]);
  const optionAddress = (item: any) => {
    setoption(true);
    setItemAddress(item);
  };

  const GetAddress = async () => {
    const Address = await agent.Account.GetAddress({
      userId: token.userDto.userId,
    });
    dispatch(setAddress(Address));
  };

  useEffect(() => {
    GetAddress();
  }, [option]);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            style={{ paddingTop: 20, paddingLeft: 20 }}
            name="back"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20, paddingBottom: 10 }}>Your Address</Text>
        </View>
        <ScrollView>
          {address.length === 0 ? (
            <>
              <View style={styles.lottie}>
                <Lottie
                  source={require("../../../../assets/images/address.json")}
                  autoPlay
                  loop
                />
              </View>
            </>
          ) : (
            <>
              {address?.map((item: any) => (
                <TouchableOpacity
                  style={{
                    borderBottomWidth: 0.7,
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  onPress={() => optionAddress(item)}
                >
                  <CardAddressComponent item={item} />
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: "#999",
            padding: 10,
            margin: 20,
            position: "absolute",
            bottom: 0,
            right: 0,
            borderRadius: 50,
          }}
          onPress={() =>
            navigation.navigate("editAddress", {
              item: [],
              setoption: setoption,
            })
          }
        >
          <AntDesign name="plus" size={50} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
      {option && (
        <OptionModal item={itemAddress} setoption={setoption} order={order} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width,
    height: width,
  },
});
