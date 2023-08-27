import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import { BaseUrl } from "../../../Base";
import { EXPO_PUBLIC_REACT_APP_API_URL } from "@env";

// BaseUrl + "/api/"

axios.defaults.baseURL = BaseUrl + "/api/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, params: {}) => axios.post(url, params).then(responseBody),
  onlyPost: (url: string) => axios.post(url).then(responseBody),
  put: (url: string, params: {}) => axios.put(url, params).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
};

const createFormData = (item: any) => {
  let formData = new FormData();
  for (const key in item) {
    if (item[key] !== null) {
      formData.append(key, item[key]);
    }
  }
  return formData;
};

const Account = {
  login: (values: any) => requests.post("Auth/Login", values),
  register: (values: any) => requests.post("Auth/Register", values),
  checkToken: (token: string) => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const requestOptions: any = {
      method: "GET",
      headers: headers,
    };

    return requests.get("Auth/GetDecodeToken", requestOptions);
  },
  getCurrentUser: (values: any) =>
    requests.get(`Auth/GetUserById?userId=${values}`),
  changePassword: (values: any) => requests.post("Auth/Repassword", values),
  GetAddress: (values: any) => requests.get("Auth/GetAddressById", values),
  setDefaultAddress: (values: any) =>
    requests.post("Auth/SetAdressDefualt", values),
  CreateUpdateAddress: (values: any) =>
    requests.post("Auth/CreateUpdateAddress", values),
  deleteAddress: (values: any) =>
    requests.delete(`Auth/RemoveAddress?id=${values}`),
};

const Coupons = {
  couponList: () => requests.get("Coupon/GetCoupon"),
};

const Products = {
  productList: () => requests.get("Product/GetProduct"),
  fillterProductList: (values: any) =>
    requests.get(
      `Product/FillterProduct?search=${values}`
      // `Product/FillterProduct?search=a`
    ),
};

const ShopCart = {
  getShopCart: (values: any) => requests.get("ShopCart/GetInCartById", values),
  addToCart: (values: any) => requests.post("ShopCart/AddToCart", values),
  removeFromCart: (values: any) =>
    requests.post("ShopCart/RemoveItemToCart", values),
};

const Orders = {
  getOrderList: (values: any) => requests.get("Order/GetOrderById", values),
  createOrder: (values: any) =>
    requests.postForm("Order/CreateOrder", createFormData(values)),
  confirmOrder: (values: any) =>
    requests.onlyPost(`Order/ConfirmOrder?orderId=${values}`),
  UpdatePayment: (values: any) =>
    requests.onlyPost(`Order/UpdatePayment?orderId=${values}`),
};

const Reviews = {
  getReviews: (values: any) =>
    requests.get(`Review/GetReviewsById?userId=${values}`),
  createReview: (values: any, imageReviews: any) => {
    const data = createFormData(values);

    for (var formfile of imageReviews) {
      data.append("formfiles", formfile);
    }

    return requests.postForm("Review/CreateReview", values);
  },
  updateReview: (values: any, imageReviews: any) => {
    const data = createFormData(values);

    for (var formfile of imageReviews) {
      data.append("formfiles", formfile);
    }

    return requests.postForm("Review/UpdateReview", values);
  },
  deleteReview: (values: any) =>
    requests.delete(`Review/DeleteReview?reviewId=${values}`),
};

const agent = {
  Account,
  Coupons,
  Products,
  ShopCart,
  Orders,
  Reviews,
};

export default agent;
