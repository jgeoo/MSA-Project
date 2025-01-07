import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useAuth } from '../utils/AuthContext';
import {jwtDecode} from "jwt-decode";
import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';

export default function HomeScreen() {
    const { token, logout } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Decode the token
    const decoded = jwtDecode(token);

    // Fetch current user details
    const fetchingCurrentUser = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/users/email/${decoded.sub}`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching current user data:', error);
            setError(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const userData = await fetchingCurrentUser();
            setCurrentUser(userData);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    // Render loading spinner if data is not ready
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#133E87" />
            </View>
        );
    }

    // Handle errors
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Error fetching user data.</Text>
                <Text>{error.message}</Text>
                <Button title="Retry" onPress={() => window.location.reload()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {currentUser && (
                <>
                    <Text style={styles.textTitle}>Welcome, {currentUser.name}!</Text>
                    <Text style={styles.text}><Ionicons name="mail"></Ionicons> :{currentUser.email}</Text>
                    <Text style={styles.text}>Role: {currentUser.role}</Text>
                    
                    <Text style={styles.text}>Company: {currentUser.company}</Text>
                    <Button style={styles.logout} title="Logout" onPress={logout} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F3E0',
        padding: 16,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    logout: {
        marginTop: 30
    },
});
