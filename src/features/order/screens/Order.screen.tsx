import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { TabView, TabBar } from "react-native-tab-view";
import { useStore } from "../../../store-plus/store-plus";
import { useAppSelector } from "../../../store/store";
import { observer } from "mobx-react-lite";
import { Badge } from "react-native-paper";
import TabOrderScreen from "../tabView/TabOrder.screen";
import TabReviewScreen from "../../../features/review/screens/TabReview.screen";

const OrderScreen = ({ navigation }: any) => {
  const { token } = useAppSelector((state) => state.account);
  const {
    orders,
    createConnection,
    badgeOrder,
    badgeCancel,
    readedaApprove,
    reload,
    readedCancel,
  } = useStore().userOrderStore;
  const { reloadR, getMyReviews, Reviews } = useStore().reviewStore;

  // const testOrder = async (userName: any) => {
  //   try {
  //     const connection = new HubConnectionBuilder()
  //       .withUrl(BaseUrl + `/api/Order/PushOrder?userName=${userName}`)
  //       .configureLogging(LogLevel.Information)
  //       .build();

  //     // console.log("connection", connection);
  //   } catch (e) {
  //     console.log("e", e);
  //   }
  // };

  useEffect(() => {
    createConnection(token?.userDto.userId);
  }, [reload, reloadR]);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "ToPay", title: "To Pay" },
    { key: "Pending", title: "Pending" },
    { key: "Canceled", title: "Canceled" },
    { key: "ToShip", title: "To Ship" },
    { key: "ToReceive", title: "To Received" },
    { key: "MyReviews", title: "MyReviews" },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }} // สีของเส้นแสดงตำแหน่งปัจจุบัน
      style={{ backgroundColor: "#000" }} // สีพื้นหลังของ TabBar
      labelStyle={{ fontWeight: "bold" }} // สไตล์ของตัวอักษรใน Tab
      scrollEnabled
      onTabPress={(e) => [
        e.route.key === "ToShip" && readedaApprove(token?.userDto.userId),
        e.route.key === "Canceled" && readedCancel(token?.userDto.userId),
        e.route.key === "MyReviews" && getMyReviews(token?.userDto.userId),
      ]}
      renderBadge={(e) => [
        e.route.key === "ToShip"
          ? badgeOrder && (
              <Badge
                style={{
                  fontSize: 20,
                  top: 13,
                  left: -20,
                  backgroundColor: "red",
                  padding: 2,
                }}
              ></Badge>
            )
          : null,
        e.route.key === "Canceled"
          ? badgeCancel && (
              <Badge
                style={{
                  fontSize: 20,
                  top: 13,
                  left: -20,
                  backgroundColor: "red",
                  padding: 2,
                }}
              ></Badge>
            )
          : null,
        e.route.key === "ToPay"
          ? orders?.filter(
              (x) => x.orderStatus === 0 && x.paymentImage === "unpaid"
            ).length !== 0 && (
              <Badge
                style={{
                  fontSize: 20,
                  top: 13,
                  left: -20,
                  backgroundColor: "red",
                  padding: 2,
                }}
              ></Badge>
            )
          : null,
      ]}
    />
  );

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "ToPay":
        return (
          <TabOrderScreen
            order={orders?.filter(
              (x) => x.orderStatus === 0 && x.paymentImage === "unpaid"
            )}
            title="ToPay"
            navigation={navigation}
          />
        );
      case "Pending":
        return (
          <TabOrderScreen
            order={orders?.filter(
              (x) =>
                x.orderStatus === 0 && x.paymentImage === "CreditCardPayment"
            )}
            title="Pending"
          />
        );
      case "Canceled":
        return (
          <TabOrderScreen
            order={orders?.filter(
              (x) => x.orderStatus === 2 && x.paymentImage !== "unpaid"
            )}
            title="Canceled"
          />
        );
      case "ToShip":
        return (
          <TabOrderScreen
            order={orders?.filter(
              (x) =>
                x.orderStatus === 1 &&
                x.statusConfirm === 0 &&
                x.paymentImage !== "unpaid"
            )}
            title="ToShip"
          />
        );
      case "ToReceive":
        return (
          <TabOrderScreen
            order={orders?.filter(
              (x) =>
                x.orderStatus === 1 &&
                x.statusConfirm === 1 &&
                x.paymentImage !== "unpaid"
            )}
            title="ToReceive"
          />
        );
      case "MyReviews":
        return (
          <TabReviewScreen
            Reviews={Reviews}
            title="MyReviews"
            navigation={navigation}
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
          <Text style={{ fontSize: 20, paddingBottom: 10 }}>All Order</Text>
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
    // <TabView
    //       navigationState={{ index, routes }}
    //       renderScene={renderScene}
    //       onIndexChange={setIndex}
    //       initialLayout={{ width: layout.width }}
    //     />
    // <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
    //   <ScrollView>

    //     <TouchableOpacity onPress={() => navigation.goBack()}>
    //       <AntDesign
    //         style={{ paddingTop: 20, paddingLeft: 20 }}
    //         name="back"
    //         size={24}
    //         color="black"
    //       />
    //     </TouchableOpacity>
    //     <View style={{ alignItems: "center" }}>
    //       <Text style={{ fontSize: 20, paddingBottom: 10 }}>All Order</Text>
    //     </View>
    //     <View>
    //       {order.length === 0 ? (
    //         <>
    //           <View style={Styles.container}>
    //             <ActivityIndicator size="large" color="black" />
    //           </View>
    //           {/* <LottieView
    //             source={"../../../lotties/IGoof.json"}
    //             autoPlay
    //             loop
    //             style={{ width: 100, height: 100 }}
    //           /> */}
    //         </>
    //       ) : (
    //         <>
    //           {order.map((item: any) => (
    //             <>
    //               <View
    //                 style={{
    //                   padding: 20,
    //                   flexDirection: "row",
    //                   justifyContent: "space-around",
    //                   borderBottomWidth: 0.7,
    //                 }}
    //               >
    //                 <Text>{item.address.user.userName}</Text>
    //                 {/* <Image
    //                 style={{ width: 200, height: 350 }}
    //                 source={{
    //                 uri: BaseUrl + "/orderImage/" + item.paymentImage,
    //                 }}
    //                 />  */}
    //                 <Text>{item.totalPrice}</Text>
    //                 <Text>{moment(item.orderDate).format("DD/MM/YY")}</Text>
    //                 <Text>
    //                   {item.orderStatus === 0 ? "pending" : "ไปแก้โค้ด"}
    //                 </Text>
    //               </View>
    //             </>
    //           ))}
    //         </>
    //       )}
    //     </View>
    //   </ScrollView>
    //   {/* {order.length === 0 && <Loading />} */}
    // </SafeAreaView>
  );
};

export default observer(OrderScreen);
