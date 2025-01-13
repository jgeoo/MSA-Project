import React from "react";
import { View, StyleSheet } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/utils/AuthContext";
import { ThemeProvider } from "./src/utils/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3E0",
  },
});
