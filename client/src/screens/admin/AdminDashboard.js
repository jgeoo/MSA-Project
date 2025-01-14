import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  Button,
  Alert,
} from "react-native";
import axios from "axios";

export default function CenterScreen() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8080/api/users");
      setUsers(response.data); // Assume response.data contains the list of users
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Failed to fetch users.");
    }
  };

  // Handle switch toggle
  const toggleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // Handle delete action
  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedUsers.map((userId) =>
          axios.delete(`http://10.0.2.2:8080/api/users/${userId}`)
        )
      );
      Alert.alert("Success", "Selected users deleted successfully!");
      fetchUsers(); // Refresh the user list
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error deleting users:", error);
      Alert.alert("Error", "Failed to delete selected users.");
    }
  };

  // Handle update action (example only shows alert)
  const handleUpdate = () => {
    Alert.alert("Update", "Update functionality not implemented yet.");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.userId.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Switch
              value={selectedUsers.includes(item.userId)}
              onValueChange={() => toggleSelectUser(item.userId)}
              trackColor={{ false: "#ccc", true: "#608BC1" }}
              thumbColor={selectedUsers.includes(item.userId) ? "#4a6eac" : "#fff"}
            />
            <Text style={styles.userText}>{item.name}</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Update" onPress={handleUpdate} color="#4a6eac" />
        <Button title="Delete" onPress={handleDelete} color="#ff4c4c" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F3F3E0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#CBDCEB",
    borderRadius: 5,
  },
  userText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
