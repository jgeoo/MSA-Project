import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/utils/AuthContext';

export default function App() {
    return (
      <AuthProvider>
        <View style={styles.container}>
            <AppNavigator />
        </View>
      </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3E0',
    },
});
