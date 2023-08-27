import {
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import agent from "../../../store/context/api/agent";
import { useAppSelector } from "../../../store/store";
import axios from "axios";

var width = Dimensions.get("window").width;

export const ChangePasswdScreen = ({ setChangePasswd }: any) => {
  const { token } = useAppSelector((state) => state.account);
  const [oldPasswd, setOldPasswd] = useState("");
  const [newPasswd, setNewPasswd] = useState("");

  const handleChangePasswords = async () => {
    Alert.alert("change password", "are you sure", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "yes",
        onPress: async () => {
          if (oldPasswd !== newPasswd) {
            const change = await agent.Account.changePassword({
              userId: token.userDto.userId,
              oldPassword: oldPasswd,
              newPassword: newPasswd,
            });
            console.log("change : ", change);
            if (change.statusCode === 400) {
              Alert.alert(
                "some your input is wrong",
                "please check your password",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
              );
            }
            if (change.statusCode === 201) {
              setChangePasswd(false);
            }
          } else {
            Alert.alert("same", "you password is same", [
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
          }
        },
      },
    ]);
  };

  return (
    <Modal animationType="fade">
      <TouchableOpacity onPress={() => setChangePasswd(false)}>
        <AntDesign
          style={{ padding: 20 }}
          name="back"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Comfortaa_500Medium",
              fontSize: 25,
              marginBottom: 100,
            }}
          >
            Change Password
          </Text>
        </View>
        <View style={{ backgroundColor: "#fff", width: width }}>
          <View style={styles.width}>
            <TextInput
              style={[styles.input]}
              onChangeText={(e) => setOldPasswd(e)}
              value={oldPasswd}
              placeholder="oldPassword"
            />
          </View>
          <View style={styles.width}>
            <TextInput
              style={[styles.input]}
              onChangeText={(e) => setNewPasswd(e)}
              value={newPasswd}
              placeholder="newPassword"
            />
          </View>
          <View style={{ padding: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                width: width - 25,
                padding: 20,
                borderRadius: 6,
                alignItems: "center",
              }}
              onPress={() => handleChangePasswords()}
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
      </View>
    </Modal>
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
