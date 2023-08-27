import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { signInUser } from "../../../store/context/accountSlice";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context"; 

var width = Dimensions.get("window").width;

export const Loginscreen = ({ navigation }: any) => {
  const { token, accountScreen } = useAppSelector((state) => state.account);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (userName !== "" && password !== "") {
      await dispatch(signInUser({ userName, password })).catch((error) => {
        console.log("Login error:", error);
      });
    } else {
      Alert.alert("some Input", "Please enter some information.", [
        { text: "OK" },
      ]);
    }
  };
  // const storeRemoveToken = async () => {
  //   try {
  //     await AsyncStorage.removeItem("@Token");
  //   } catch (exception) {
  //     console.log(exception);
  //   }
  // };

  console.log("token", !!token);
  console.log("account", accountScreen);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              style={{ padding: 20 }}
              name="back"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <View
            style={{
              margin: 70,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Comfortaa_500Medium",
                  fontSize: 50,
                  marginBottom: 55,
                }}
              >
                Log in
              </Text>
            </View>
            <View style={styles.width}>
              <TextInput
                style={[styles.input]}
                onChangeText={(e) => setUserName(e)}
                value={userName}
                placeholder="UserName"
              />
            </View>
            <View style={styles.width}>
              <TextInput
                secureTextEntry={true}
                style={[styles.input]}
                onChangeText={(e) => setPassword(e)}
                value={password}
                placeholder="Password"
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text>Register Now</Text>
            </TouchableOpacity>
            <View style={{ padding: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#000",
                  width: width - 25,
                  padding: 20,
                  borderRadius: 6,
                  alignItems: "center",
                }}
                onPress={() => handleLogin()}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  LOG IN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
