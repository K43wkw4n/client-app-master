import { useFonts, Comfortaa_500Medium } from "@expo-google-fonts/comfortaa";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import IndexNavigator from "./src/navigation/IndexNavigator";
import { StripeProvider } from "@stripe/stripe-react-native";
//http://127.0.0.1:5030/api/Coupon/GetCoupon

import { LogBox } from "react-native";
import { StoreContext, store as stores } from "./src/store-plus/store-plus";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const STRIPE_KEY =
  "pk_test_51Lq9trE8AQKqEHqvWZ6liOQFIVy4sPEcDLnUTJzsr1DjfYvobGuHzyGgEPEvThhqsAnA2Azl919xlC1SGOqOPDZV00eYsnkeD8";

export default function App() {
  let [fontsLoaded] = useFonts({
    Comfortaa_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Provider store={store}>
        <StoreContext.Provider value={stores}>
          <StripeProvider
            publishableKey={STRIPE_KEY}
            // merchantIdentifier="merchant.client-app-master"
            merchantIdentifier="merchant.identifier"
            // urlScheme="your-url-scheme"
          >
            <IndexNavigator />
          </StripeProvider>
        </StoreContext.Provider>
      </Provider>
    </>
  );
}
