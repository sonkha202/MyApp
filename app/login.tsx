import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLogin } from "../hooks/useLogin";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, handleOAuthLogin, isLoading } = useLogin();

  // ✅ Redirect URI hardcoded để tránh lỗi với Google
  const redirectUri = "https://auth.expo.io/@sonkha202/myapp";
  console.log("🔁 Redirect URI:", redirectUri);

  const [googleRequest, googleResponse, promptGoogle] = Google.useAuthRequest({
    clientId:
      "399474687804-c94ehap70kelq8ht5ribvlcncqmg5140.apps.googleusercontent.com",
    redirectUri,
    scopes: ["profile", "email"],
  });

  const [fbRequest, fbResponse, promptFacebook] = Facebook.useAuthRequest({
    clientId: "YOUR_FACEBOOK_APP_ID", // ← Thay bằng ID thật
    redirectUri,
  });

  useEffect(() => {
    console.log("📦 Google Response:", JSON.stringify(googleResponse, null, 2));
    if (googleResponse?.type === "success") {
      const token = googleResponse.authentication?.accessToken;
      if (token) {
        handleOAuthLogin("google", token);
      }
    }
  }, [googleResponse]);

  useEffect(() => {
    if (fbResponse?.type === "success") {
      const token = fbResponse.authentication?.accessToken;
      if (token) {
        handleOAuthLogin("facebook", token);
      }
    }
  }, [fbResponse]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title={isLoading ? "Đang đăng nhập..." : "🔐 Đăng nhập"}
        onPress={() => handleLogin(email, password)}
        disabled={isLoading}
      />

      <Text style={styles.orText}>Hoặc đăng nhập bằng:</Text>

      <Button
        title="🔴 Google"
        onPress={() => promptGoogle()}
        disabled={!googleRequest || isLoading}
        color="#DB4437"
      />

      <View style={{ height: 10 }} />

      <Button
        title="🔵 Facebook"
        onPress={() => promptFacebook()}
        disabled={!fbRequest || isLoading}
        color="#3b5998"
      />

      {isLoading && (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 100,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  orText: {
    marginVertical: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
