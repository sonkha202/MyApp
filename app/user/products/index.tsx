import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { logout } from '../../../services/authService';

export default function UserProducts() {
  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>User Products Page</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
