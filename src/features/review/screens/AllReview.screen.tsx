import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { Card, Text as TextPaper } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { BaseUrl } from "../../../Base";
import { useStore } from "../../../store-plus/store-plus";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { TabBar, TabView } from "react-native-tab-view";
import TabReviewScreen from "./TabReview.screen";
import { observer } from "mobx-react-lite";

const AllReviewScreen = () => {
  const { Reviews } = useStore().reviewStore;
  const navigation = useNavigation();

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "1", title: "☆" },
    { key: "2", title: "☆☆" },
    { key: "3", title: "☆☆☆" },
    { key: "4", title: "☆☆☆☆" },
    { key: "5", title: "☆☆☆☆☆" },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }} // สีของเส้นแสดงตำแหน่งปัจจุบัน
      style={{ backgroundColor: "#000" }} // สีพื้นหลังของ TabBar
      labelStyle={{ fontWeight: "bold" }} // สไตล์ของตัวอักษรใน Tab
      scrollEnabled
    />
  );

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "1":
        return (
          <TabReviewScreen
            Reviews={Reviews?.filter((x) => x.rate === 1)}
            title="1"
          />
        );
      case "2":
        return (
          <TabReviewScreen
            Reviews={Reviews?.filter((x) => x.rate === 2)}
            title="2"
          />
        );
      case "3":
        return (
          <TabReviewScreen
            Reviews={Reviews?.filter((x) => x.rate === 3)}
            title="3"
          />
        );
      case "4":
        return (
          <TabReviewScreen
            Reviews={Reviews?.filter((x) => x.rate === 4)}
            title="4"
          />
        );
      case "5":
        return (
          <TabReviewScreen
            Reviews={Reviews?.filter((x) => x.rate === 5)}
            title="5"
          />
        );
    }
  };

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
          <Text style={{ fontSize: 20, paddingBottom: 10 }}>All Reviews</Text>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar} // เรียกใช้งาน TabBar ที่คุณปรับแต่ง
        />
      </SafeAreaView>
    </>
  );
};

export default observer(AllReviewScreen);
