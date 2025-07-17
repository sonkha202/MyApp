// hooks/useLogin.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Alert, InteractionManager } from "react-native";
import { login } from "../services/authService";

WebBrowser.maybeCompleteAuthSession();

const REDIRECT_URI = "myapp://logged-in";
const BACKEND_GOOGLE_URL = "https://jwtauthapi.onrender.com/api/oauth/google";
const BACKEND_FACEBOOK_URL = "https://jwtauthapi.onrender.com/api/oauth/facebook";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    try {
      setIsLoading(true);
      const data = await login(email, password);
      if (data) {
        InteractionManager.runAfterInteractions(() => {
          router.replace("/(tabs)/home");
        });
      }
    } catch (err: any) {
      const message = err?.message || "Đăng nhập thất bại!";
      setError(message);
      Alert.alert("Lỗi", message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthRedirectLogin = async (provider: "google" | "facebook") => {
    const loginUrl = provider === "google" ? BACKEND_GOOGLE_URL : BACKEND_FACEBOOK_URL;

    try {
      setIsLoading(true);
      const result = await WebBrowser.openAuthSessionAsync(loginUrl, REDIRECT_URI);

      if (result.type === "success" && result.url) {
        const parsed = Linking.parse(result.url);
        const token = parsed.queryParams?.token as string;

        if (token) {
          await AsyncStorage.setItem("token", token);
          Alert.alert("Đăng nhập thành công", "Chào mừng!");
          router.replace("/(tabs)/home");
        } else {
          Alert.alert("Lỗi", "Không nhận được token từ backend.");
        }
      } else {
        Alert.alert("Huỷ hoặc lỗi", "Người dùng không hoàn tất đăng nhập.");
      }
    } catch (err: any) {
      console.error("OAuth login error:", err);
      Alert.alert("Lỗi", "Đăng nhập thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    handleOAuthRedirectLogin,
    isLoading,
    error,
  };
}
