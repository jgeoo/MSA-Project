import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet,Alert } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleRegister = async () => {
        if (!email || !password || !name || !rePassword || !phoneNumber) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            if(password !== rePassword){
                Alert.alert('Error', "Password doesnt match");
                return;
            }
            const response = await axios.post("http://localhost:8080/api/users/register", {
                name: name,
                email: email,
                passwordHash: password,
                phoneNumber: phoneNumber,
            });

            if (response.data) {
                Alert.alert(
                    'Registration Successful',
                    'You can now log in with your credentials',
                    [{ text: 'OK', onPress: () => navigation.replace('Login') }]
                );
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert(
                'Registration Error',
                error.response?.data?.message || 'Registration failed'
            );
        } finally {
            setIsLoading(false);
        }
    };
    const handleBack = () => {
        navigation.replace('Login')
    }
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                keyboardType="default"
                onChangeText={setName}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Re-Enter Password"
                onChangeText={setRePassword}
                value={rePassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="phoneNumber"
                onChangeText={setPhoneNumber}
                keyboardType='phone-pad'
                value={phoneNumber}
            />
            <View style={styles.buttonContainer}>
            <Button style={styles.loginButton} title="Back" onPress={handleBack} color="#608BC1" />
            <Button title="Register" onPress={handleRegister} color="#133E87" />
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
    title: {
        fontSize: 24,
        marginBottom: 24,
    },
    input: {
        width: '80%',
        padding: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#608BC1',
        borderRadius: 4,
        backgroundColor: '#CBDCEB'
    },
    buttonContainer: {
        flexDirection: 'row',            
        justifyContent: 'space-between', 
        width: '60%',                    
        marginTop: 20,
    },

});
