import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Lottie from "lottie-react-native";
import { useAppSelector } from "../../store/store";
import { CouponScreen } from "../coupon/screens/Coupon.screen";
import { width } from "../feature";

export const OptionCoupon = ({ optionCoupon, setCoupon }: any) => {
  const { coupon }: any = useAppSelector((state) => state.coupon);
  const Coupons = coupon.filter((x: any) => x.quantity > 0);
  const currentDate = new Date();

  const [countShow, setCountShow] = useState(0);

  return (
    <Modal animationType="slide" transparent={true}>
      <TouchableOpacity
        style={{ flex: 0.2, backgroundColor: "#000", opacity: 0.5 }}
        onPress={() => optionCoupon(false)}
      ></TouchableOpacity>
      <View style={{ flex: 0.8, backgroundColor: "#fff" }}>
        <ScrollView>
          <>
            {countShow === 0 ? (
              <>
                <View style={styles.lottie}>
                  <Lottie
                    source={require("../../../assets/images/couponEmpty.json")}
                    autoPlay
                    loop
                  />
                </View>
              </>
            ) : (
              <>
                {Coupons?.map((item: any) => {
                  const date = item.expire;
                  const Expire = new Date(date);

                  if (currentDate < Expire) {
                    setCountShow(countShow + 1);
                  }

                  return (
                    currentDate < Expire && (
                      <>
                        {item.quantity > 0 && (
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#000",
                              margin: 10,
                              borderRadius: 10,
                              flexDirection: "row",
                              position: "relative",
                            }}
                            onPress={() => [
                              setCoupon(item),
                              optionCoupon(false),
                            ]}
                          >
                            <CouponScreen item={item} />
                          </TouchableOpacity>
                          // <TouchableOpacity
                          //   style={{
                          //     margin: 10,
                          //     padding: 20,
                          //     borderWidth: 0.7,
                          //   }}
                          //   onPress={() => [setCoupon(item), optionCoupon(false)]}
                          // >
                          //   <Text style={{ fontSize: 15 }}>{item.name}</Text>
                          //   <Text style={{ fontSize: 15 }}>
                          //     หมดอายุ : {moment(item.expire).format("DD/MM/YY")}
                          //   </Text>
                          //   <Text style={{ fontSize: 15 }}>
                          //     จำนวน : {item.quantity}
                          //   </Text>
                          // </TouchableOpacity>
                        )}
                      </>
                    )
                  );
                })}
              </>
            )}
          </>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: width,
    height: width,
  },
});
