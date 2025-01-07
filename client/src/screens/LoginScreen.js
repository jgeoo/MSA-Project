import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/api/users/login", {
                email: email,
                passwordHash: password
            });

            if (response.data) {
                login(response.data);
                navigation.replace('Main');
            } else {
                Alert.alert('Login Failed', 'Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert(
                'Login Failed',
                error.response?.data?.message || 'An error occurred during login'
            );
        } finally {
            setIsLoading(false);
        }
    };
    const handleRegister = () => {
        navigation.replace('Register')
    }
   

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!isLoading}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!isLoading}
            />
            <View style={styles.buttonContainer}>
                <Button 
                    title="Register" 
                    onPress={handleRegister} 
                    color="#608BC1"
                    disabled={isLoading}
                />
                <Button 
                    title="Login" 
                    onPress={handleLogin} 
                    color="#133E87"
                    disabled={isLoading}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F3F3E0',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#608BC1',
        borderRadius: 4,
        backgroundColor: '#CBDCEB',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 20,
    },
});