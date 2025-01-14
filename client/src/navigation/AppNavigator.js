import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/user/HomeScreen";
import LeaderboardScreen from "../screens/user/LeaderboardScreen";
import SettingsScreen from "../screens/user/SettingsScreen";
import PostScreen from "../screens/user/PostScreen";
import CenterScreen from "../screens/user/CenterScreen";
import RegisterScreen from "../screens/user/RegisterScreen";
import AboutUsScreen from "../screens/user/AboutUsScreen";
import AdminDashboard from "../screens/admin/AdminDashboard";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Leaderboard") {
            iconName = "trophy-outline";
          } else if (route.name === "Settings") {
            iconName = "settings-outline";
          } else if (route.name === "NOG Centers") {
            iconName = "business-outline";
          } else if (route.name === "Posts") {
            iconName = "chatbox-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4a6eac",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#CBDCEB",
          borderTopWidth: 0,
          height: 80,
          display: route.name === "Home" ? "none" : "flex", // Ascunde bara de tab-uri pe Home
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Posts"
        component={PostScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="NOG Centers"
        component={CenterScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Leaderboard"
        component={LeaderboardScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

// Create Stack Navigator
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Hides the header for login screen
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }} // Hides the header for tabs
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={{ headerShown: false }} // Hides the header for login screen
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ headerShown: false }} // Hides the header for login screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
