import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import agent from "../../../store/context/api/agent";
import { setAddress } from "../../../store/context/accountSlice";
import mockAddress from "./new_data.json";
import { Select } from "antd";
import SelectDropdown from "react-native-select-dropdown";

var width = Dimensions.get("window").width;

export const EditAddressScreen = ({ route, navigation }: any) => {
  const { item, setoption } = route.params;
  const { token } = useAppSelector((state) => state.account);
  const [data, setData]: any = useState([]);
  const [dataSelect, setdataSelect]: any = useState([]);

  const [houseNumber, setHouseNumber] = useState(item.houseNumber);
  const [fullName, setFullName] = useState(item.fullName);
  const [phoneNumber, setPhoneNumber] = useState(item.phoneNumber);
  const [postCode, setPostCode] = useState(item.postCode);
  const [subDistrict, setSubDistrict] = useState(item.subDistrict);
  const [district, setDistrict] = useState(item.district);
  const [province, setProvince] = useState(item.province);

  const dispatch = useAppDispatch();

  const GetAddress = async () => {
    const Address = await agent.Account.GetAddress({
      userId: token.userDto.userId,
    });
    dispatch(setAddress(Address));
  };

  const handleChangeAddress = async () => {
    await agent.Account.CreateUpdateAddress({
      id: item.id,
      fullName: fullName,
      phoneNumber: "123456",
      houseNumber: houseNumber,
      postCode: postCode,
      subDistrict: dataSelect.subDistrict
        ? dataSelect.subDistrict
        : subDistrict,
      district: dataSelect.district ? dataSelect.district : district,
      province: dataSelect.province ? dataSelect.province : province,
      userId: token.userDto.userId,
    }).then((e) => console.log("e", e));

    // const Address = await agent.Account.GetAddress({
    //   userId: token.userDto.userId,
    // }).then((e) => {
    //   dispatch(setAddress(Address));

    // });
    [
      navigation.navigate("myAddress", { order: false }),
      GetAddress(),
      setoption(false),
    ];
  };

  function searchByZipCode(zipCode: any) {
    const results = [];
    for (const [province, districts] of mockAddress) {
      for (const [district, subDistricts] of districts) {
        for (const [subDistrict, codes] of subDistricts) {
          for (const code of codes) {
            if (code === zipCode) {
              results.push({ zipCode, province, district, subDistrict });
            }
          }
        }
      }
    }

    setData(results);
  }

  useEffect(() => {
    searchByZipCode(Number(postCode));
  }, [postCode]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 15, left: 0 }}
      >
        <AntDesign
          style={{ paddingTop: 20, paddingLeft: 20 }}
          name="back"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <ScrollView style={{ top: 30 }}>
        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, padding: 10 }}>Edit Your Address</Text>
          </View>
          <View style={styles.width}>
            <TextInput
              style={[styles.input]}
              onChangeText={(e) => setFullName(e)}
              value={fullName}
              placeholder="fullName"
            />
          </View>
          <View style={styles.width}>
            <TextInput
              style={[styles.input]}
              onChangeText={(e) => setPhoneNumber(e)}
              value={phoneNumber}
              placeholder="phoneNumber"
              maxLength={10}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.width}>
            <TextInput
              style={[styles.input]}
              onChangeText={(e) => setHouseNumber(e)}
              value={houseNumber}
              placeholder="houseNumber"
            />
          </View>
          <View style={[styles.width, { flexDirection: "row" }]}>
            <TextInput
              style={[styles.input, { width: 280 }]}
              onChangeText={(e) => setPostCode(e)}
              value={postCode}
              placeholder="postCode"
            />
            <View style={{ padding: 15, width: 100 }}>
              <SelectDropdown
                data={data}
                disabled={data?.length === 0 && true}
                onSelect={(selectedItem, i) => {
                  console.log(selectedItem, i);
                  setdataSelect(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.subDistrict;
                }}
                rowTextForSelection={(item, index) => {
                  return item.subDistrict;
                }}
                buttonStyle={{
                  width: 100,
                  backgroundColor: "#fff",
                  left: -25,
                }}
                defaultButtonText="select"
              />
            </View>
          </View>
          <View style={styles.width}>
            <TextInput
              style={[styles.input]}
              onChangeText={(e) => setSubDistrict(e)}
              value={
                dataSelect?.length === 0 ? subDistrict : dataSelect.subDistrict
              }
              placeholder="subDistrict"
            />
          </View>
          <View style={styles.width}>
            <TextInput
              style={[styles.input]}
              onChangeText={(e) => setDistrict(e)}
              value={dataSelect?.length === 0 ? district : dataSelect.district}
              placeholder="district"
            />
          </View>
          <View style={styles.width}>
            <TextInput
              style={[styles.input]}
              onChangeText={(e) => setProvince(e)}
              value={dataSelect?.length === 0 ? province : dataSelect.province}
              placeholder="province"
            />
          </View>
          <View style={{ padding: 10, marginBottom: 40 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                width: width - 25,
                padding: 20,
                borderRadius: 6,
                alignItems: "center",
              }}
              onPress={() => handleChangeAddress()}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                C H A N G E
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 3,
    padding: 10,
    paddingLeft: 20,
  },
  width: {
    width: width,
  },
});
