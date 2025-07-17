// services/authService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import api from "./axiosInstance";

const TOKEN_KEY = "token";

export async function login(email: string, password: string) {
  try {
    const res = await api.post("/Auth/login", { email, password });
    const { token } = res.data;

    if (!token) throw new Error("Không nhận được token");

    await AsyncStorage.setItem(TOKEN_KEY, token);
    return res.data;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Đăng nhập thất bại!";
    Alert.alert("Lỗi", message);
    return null;
  }
}

export async function getToken(): Promise<string | null> {
  return await AsyncStorage.getItem(TOKEN_KEY);
}

export async function logout() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}
