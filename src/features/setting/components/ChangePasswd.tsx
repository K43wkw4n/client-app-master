import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import agent from "../../../store/context/api/agent";
import { ChangePasswdScreen } from "../screens/ChangePasswd.screen";
import { MaterialIcons } from "@expo/vector-icons";

export const ChangePasswd = () => {
  const [ChangePasswd, setChangePasswd] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => [setChangePasswd(true)]}
        style={{
          padding: 20,
          flexDirection: "row",
        }}
      >
        <View style={{ marginTop: 3, marginRight: 10 }}>
          <MaterialIcons
            name="published-with-changes"
            size={24}
            color="black"
          />
        </View>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Change Password
        </Text>
      </TouchableOpacity>
      {ChangePasswd && <ChangePasswdScreen setChangePasswd={setChangePasswd} />}
    </>
  );
};
