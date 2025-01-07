import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, FlatList } from 'react-native';

const Leaderboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/leaderboard');
            setData(response.data); // Set the leaderboard data
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchLeaderboard();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Rank</Text>
                    <Text style={styles.tableHeaderText}>Name</Text>
                    <Text style={styles.tableHeaderText}>Email</Text>
                    <Text style={styles.tableHeaderText}>Total Points</Text>
                </View>

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.leaderboardId.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.rank}</Text>
                            <Text style={styles.tableCell}>{item.user.name}</Text>
                            <Text style={styles.tableCell}>{item.user.email}</Text>
                            <Text style={styles.tableCell}>{item.totalPoints}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    table: {
        width: '100%',
    },
    tableHeader: {
        flexDirection: 'row',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 5,
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingHorizontal: 5,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
    },
});

export default Leaderboard;
