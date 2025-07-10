import { useState } from "react";
import { Alert, InteractionManager } from "react-native";
import { login, oauthLogin } from "../services/authService";
import { useRouter } from "expo-router";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Đăng nhập truyền thống
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

  // Đăng nhập OAuth
  const handleOAuthLogin = async (
    provider: "google" | "facebook",
    accessToken: string
  ) => {
    try {
      setIsLoading(true);
      const data = await oauthLogin(provider, accessToken);
      if (data) {
        InteractionManager.runAfterInteractions(() => {
          router.replace("/(tabs)/home");
        });
      }
    } catch (err: any) {
      const message = err?.message || "Đăng nhập OAuth thất bại!";
      setError(message);
      Alert.alert("Lỗi", message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    handleOAuthLogin,
    isLoading,
    error,
  };
}
