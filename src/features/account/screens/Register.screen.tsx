import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert,
  ToastAndroid,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import agent from "../../../store/context/api/agent";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInUser } from "../../../store/context/accountSlice";

var width = Dimensions.get("window").width;

export const RegisterScreen = ({ navigation }: any) => {
  const { token } = useAppSelector((state) => state.account);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cfPassword, setCfPassword] = React.useState("");

  const showToast = () => {
    ToastAndroid.showWithGravity(
      "Register sucess",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const dispatch = useAppDispatch();

  const handleRegister = async () => {
    if (userName !== "" && password !== "" && email !== "") {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email)) {
        if (password === cfPassword) {
          try {
            await agent.Account.register({ userName, password, email });
            dispatch(signInUser({ userName, password }));
            showToast();
          } catch (error) {
            console.log("Register error:", error);
          }
        } else {
          Alert.alert(
            "Password mismatch",
            "Your password does not match the confirm password.",
            [{ text: "OK" }]
          );
        }
      } else {
        Alert.alert("Invalid email", "Please provide a valid email format.", [
          { text: "OK" },
        ]);
      }
    } else {
      Alert.alert("error", "Please enter some input", [{ text: "OK" }]);
    }
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity
            style={{ padding: 20 }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>
          <View
            style={{
              marginTop: 50,
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
                Register
              </Text>
            </View>
            <View style={styles.width}>
              <TextInput
                style={styles.input}
                onChangeText={(e) => setUserName(e)}
                value={userName}
                placeholder="UserName"
              />
            </View>
            <View style={styles.width}>
              <TextInput
                style={styles.input}
                onChangeText={(e) => setEmail(e)}
                value={email}
                placeholder="Email"
              />
            </View>
            <View style={styles.width}>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(e) => setPassword(e)}
                value={password}
                placeholder="Password"
              />
            </View>
            <View style={styles.width}>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(e) => setCfPassword(e)}
                value={cfPassword}
                placeholder="Confirm Password"
              />
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#000",
                  width: width - 25,
                  padding: 20,
                  borderRadius: 6,
                  alignItems: "center",
                }}
                onPress={() => handleRegister()}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  N E X T
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
