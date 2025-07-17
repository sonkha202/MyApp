// screens/LoginScreen.tsx
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLogin } from "../hooks/useLogin";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, handleOAuthRedirectLogin, isLoading } = useLogin();

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
        onPress={() => handleOAuthRedirectLogin("google")}
        disabled={isLoading}
        color="#DB4437"
      />

      <View style={{ height: 10 }} />

      <Button
        title="🔵 Facebook"
        onPress={() => handleOAuthRedirectLogin("facebook")}
        disabled={isLoading}
        color="#3b5998"
      />

      {isLoading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
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
