import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../models/User"; 
import agent from "./api/agent";
import { HttpStatusCode } from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Address } from "../../models/Address";
import { FieldValues } from "react-hook-form";

interface account {
  token: any;
  address: Address[];
  user: User[];
  accountScreen: false;
  favourites: any;
}

const initialState: account = {
  token: null,
  address: [],
  user: [],
  accountScreen: false,
  favourites: [],
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/LoginUser",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login({
        userName: data.userName,
        password: data.password,
      });
      const { ...user } = userDto;
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const getCurrentUser = createAsyncThunk<User, FieldValues>(
  "account/getUser",
  async (data, thunkAPI) => {
    try {
      const user = await agent.Account.getCurrentUser(data);
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

const storeSaveToken = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@Token", jsonValue);
  } catch (e) {
    // saving error
  }
};

const saveFavourites = async (value: any, uid: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
  } catch (e) {
    console.log("error storing", e);
  }
};

// const storeRemoveToken = async () => {
//   try {
//     await AsyncStorage.clear();
//   } catch (exception) {
//     console.log(exception);
//   }
// };

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@Token");
  } catch (e) {
    console.log("error storing", e);
  }
};

const removeFavourites = async (uid: any) => {
  try {
    await AsyncStorage.removeItem(`@favourites-${uid}`);
  } catch (e) {
    console.log("error storing", e);
  }
};

export const AccountSlice = createSlice({
  name: "AccountSlice",
  initialState: initialState,
  reducers: {
    Logout: (state: any) => {
      state.token = null;
      removeToken();
      state.accountScreen = true;
      state.favourites = [];
    },
    AlreadyLogin: (state, action) => {
      state.token = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setAccount: (state, action) => {
      state.accountScreen = action.payload;
    },
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },
    addFavourite: (state, action) => {
      removeFavourites(state.token.userDto.userId);
      const fave = (state.favourites = [...state.favourites, action.payload]);
      saveFavourites(fave, state.token.userDto.userId);
    },
    removeFavourite: (state, action) => {
      removeFavourites(state.token.userDto.userId);
      const fave = (state.favourites = state.favourites?.filter(
        (item: any) => item.id !== action.payload.id
      ));
      saveFavourites(fave, state.token.userDto.userId);
      // removeFavourites(state.token.userDto.userId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(signInUser.fulfilled), (state, action: any) => {
        console.log("getUser", action.payload);
        if (action.payload.statusCode.statusCode == HttpStatusCode.Ok) {
          state.token = action.payload;
          state.accountScreen = false;
          //console.log("getTokenUser", action.payload.userDto.token);
          storeSaveToken(action.payload);
        } else if (state.token.statusCode == HttpStatusCode.NotFound) {
          Alert.alert("NotFound", "Please check the information you entered.", [
            { text: "OK" },
          ]);
        } else {
          Alert.alert("Input not null", "Please enter some information.", [
            { text: "OK" },
          ]);
        }
      })
      .addMatcher(isAnyOf(signInUser.rejected), (state) => {
        state.token = "";
        console.log("signInUser is rejected");
      })
      .addMatcher(isAnyOf(getCurrentUser.fulfilled), (state, action: any) => {
        state.user = action.payload;
      });
  },
});

export const {
  Logout,
  AlreadyLogin,
  setAddress,
  setAccount,
  addFavourite,
  removeFavourite,
  setFavourites,
} = AccountSlice.actions;
