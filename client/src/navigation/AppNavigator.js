import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PostScreen from '../screens/PostScreen';
import CenterScreen from '../screens/CenterScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Leaderboard') {
                        iconName = 'trophy-outline';
                    } else if (route.name === 'Settings') {
                        iconName = 'settings-outline';
                    } else if (route.name === 'NOG Centers'){
                        iconName = 'business-outline'
                    } else if (route.name === 'Posts'){
                        iconName = 'chatbox-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#133E87',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#CBDCEB', 
                    borderTopWidth: 0,
                    height: 80,
                },
            })}
        >
            <Tab.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
            <Tab.Screen options={{ headerShown: false }} name="Posts" component={PostScreen} />
            <Tab.Screen options={{ headerShown: false }} name="NOG Centers" component={CenterScreen} />
            <Tab.Screen options={{ headerShown: false }} name="Leaderboard" component={LeaderboardScreen} />
            <Tab.Screen options={{ headerShown: false }} name="Settings" component={SettingsScreen} />

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
                    options={{headerShown: false}}
                    />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
