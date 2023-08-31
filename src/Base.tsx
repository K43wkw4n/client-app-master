// import { loadStripe } from "@stripe/stripe-js";

export const BaseUrl = "http://10.103.0.17/cs64/s18/HachiShop";

// export const stripePromise = loadStripe(
//   "pk_test_51NUld0KSrvVHttpn8vApNURuK9gzvXJ2V3zzZdscLNKZ1gaOGfsaFq1EumFVmtajr9izwmnLUJYXTWG3Zsli4HnI00BC4mhQ2d"
// );

export const config = {
  HUB_ADMIN_ORDER: BaseUrl + "/admin-order",
  HUB_USER_ORDER: BaseUrl + "/user-order",
  HUB_Review: BaseUrl + "/user-review",
};
