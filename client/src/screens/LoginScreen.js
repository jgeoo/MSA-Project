import React from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
    const handleLogin = () => {
        navigation.replace('Home');
    };

    return (
        <View style={styles.container}>
            {/* Add the image here */}
            <Image source={require('../../assets/logo.png')} style={styles.logo} />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
            <Button title="Register" onPress={() => {}} color="#608BC1" />
            <Button style={styles.loginButton} title="Login" onPress={handleLogin} color="#133E87" />
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
