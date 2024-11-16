import React from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';

export default function RegisterScreen({ navigation }) {
    const handleRegister = () => {
        navigation.replace('Login')
    }
    const handleBack = () => {
        navigation.replace('Login')
    }
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />

            <TextInput
                style={styles.input}
                placeholder="Name"
                keyboardType="default"
                autoCapitalize="none"
            />
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
            <TextInput
                style={styles.input}
                placeholder="Re-Enter Password"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="phoneNumber"
                keyboardType='phone-pad'
                secureTextEntry
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
