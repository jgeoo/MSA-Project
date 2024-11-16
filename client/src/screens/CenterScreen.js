import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CenterScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Center Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#F3F3E0'

    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
