import api from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, InteractionManager } from "react-native";

const TOKEN_KEY = "token";

// Đăng nhập truyền thống
export async function login(email: string, password: string) {
  try {
    const res = await api.post("/Auth/login", { email, password });

    const { token } = res.data;
    if (!token) {
      throw new Error(res.data?.message || "Không nhận được token");
    }

    await AsyncStorage.setItem(TOKEN_KEY, token);
    return res.data;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Đăng nhập thất bại!";
    Alert.alert("Lỗi", message);
    return null;
  }
}

// Đăng nhập OAuth (Google hoặc Facebook)
export async function oauthLogin(
  provider: "google" | "facebook",
  accessToken: string
) {
  try {
    const res = await api.post("/Auth/oauth-login", { provider, accessToken });

    const { token } = res.data;
    if (!token) {
      throw new Error(res.data?.message || "Không nhận được token");
    }

    await AsyncStorage.setItem(TOKEN_KEY, token);
    return res.data;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Đăng nhập thất bại!";
    Alert.alert("Lỗi", message);
    return null;
  }
}

// Lấy token đã lưu
export async function getToken(): Promise<string | null> {
  return await AsyncStorage.getItem(TOKEN_KEY);
}

// Đăng xuất
export async function logout() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}
