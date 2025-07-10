import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../services/authService';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login'); // quay lại login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎉 Chào mừng bạn đến Home!</Text>

      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
