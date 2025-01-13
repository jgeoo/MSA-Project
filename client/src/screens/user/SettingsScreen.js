import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Switch,
  Text,
} from "react-native";
import { useAuth } from "../../utils/AuthContext";
import Title from "../../components/Title";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../utils/ThemeContext";

export default function SettingsScreen({ navigation }) {
  const { logout } = useAuth();
  const { isDarkTheme, toggleTheme, themeStyles } = useTheme();

  const handleLogout = () => {
    navigation.replace("Login");
    logout();
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <Title text="Manage app settings here" />
      <Ionicons
        name="person-circle-outline"
        size={200}
        color={themeStyles.textColor}
        style={styles.avatar}
      />

      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={themeStyles.textColor}
        />
        <Text style={[styles.optionText, { color: themeStyles.textColor }]}>
          About Us
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons
          name="language-outline"
          size={24}
          color={themeStyles.textColor}
        />
        <Text style={[styles.optionText, { color: themeStyles.textColor }]}>
          Change Language
        </Text>
      </TouchableOpacity>

      <View style={styles.themeToggleContainer}>
        <Text style={[styles.optionText, { color: themeStyles.textColor }]}>
          Change Theme
        </Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#4a6eac" }}
        />
      </View>

      <TouchableOpacity style={styles.optionContainer} onPress={handleLogout}>
        <Ionicons
          name="log-out-outline"
          size={24}
          color={themeStyles.textColor}
        />
        <Text style={[styles.optionText, { color: themeStyles.textColor }]}>
          Logout
        </Text>
      </TouchableOpacity>
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
  avatar: {
    marginBottom: 20,
    marginTop: 120,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
  themeToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  switch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    marginRight: 20,
  },
});
