import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "../../utils/AuthContext";

export default function SettingsScreen({ navigation }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    navigation.replace("Login");
    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Manage your app settings here!</Text>
      <Button style={styles.logout} title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F3E0",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
