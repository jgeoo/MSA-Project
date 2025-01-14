import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import Title from "../../components/Title";
import { useAuth } from "../../utils/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "../../utils/ThemeContext";

const Leaderboard = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { themeStyles, isDarkTheme } = useTheme();

  let decoded = null;
  if (token && typeof token === "string") {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      decoded = null;
    }
  } else {
    console.warn("Token is not valid or missing.");
  }

  const fetchingCurrentUser = async () => {
    try {
      console.log("Aici Fetch current user");
      const response = await axios.get(
        `http://10.0.2.2:8080/api/users/email/${decoded.sub}`
      );
      return response.data;
    } catch (error) {

      console.error("Error fetching current user data:", error);
      setError(error);
    }

  };

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8080/api/leaderboard");
      const sortedData = response.data.sort(
        (a, b) => b.totalPoints - a.totalPoints
      );
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        const user = await fetchingCurrentUser();
        setCurrentUser(user);
        await fetchLeaderboard();
      };
      fetchData();
    }, [])
  );

  const getRowStyle = (rank, userId) => {
    let style = [styles.tableRow];

    if (currentUser && userId === currentUser.userId) {
      style.push(styles.currentUserRow);
    }

    switch (rank) {
      case 1:
        style.push(styles.firstPlace);
        break;
      case 2:
        style.push(styles.secondPlace);
        break;
      case 3:
        style.push(styles.thirdPlace);
        break;
      default:
        style.push(styles.neutralPlace);
    }

    return style;
  };

  const getTrophyIcon = (rank) => {
    switch (rank) {
      case 1:
        return require("../../../assets/first.png");
      case 2:
        return require("../../../assets/second.png");
      case 3:
        return require("../../../assets/third.png");
      default:
        return null;
    }
  };

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
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <Title text="Leaderboard" />
      <View style={styles.table}>
        <View
          style={[
            styles.tableHeader,
            { borderBottomColor: themeStyles.textColor },
          ]}
        >
          <Text
            style={[styles.tableHeaderText, { color: themeStyles.textColor }]}
          >
            Rank
          </Text>
          <Text
            style={[styles.tableHeaderText, { color: themeStyles.textColor }]}
          >
            Name
          </Text>
          <Text
            style={[styles.tableHeaderText, { color: themeStyles.textColor }]}
          >
            Total Points
          </Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.leaderboardId.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.tableRow,
                  getRowStyle(item.rank, item.user.userId),
                ]}
              >
                {currentUser && item.user.userId === currentUser.userId && (
                  <Ionicons
                    name="ellipse"
                    size={15}
                    color="#20bf55"
                    style={styles.dot}
                  />
                )}
                <View style={styles.rankContainer}>
                  {getTrophyIcon(item.rank) && (
                    <Image
                      source={getTrophyIcon(item.rank)}
                      style={styles.trophyIcon}
                    />
                  )}
                  <Text style={styles.tableCell}>{item.rank}</Text>
                </View>
                <Text style={styles.tableCell}>{item.user.name}</Text>
                <Text style={styles.tableCell}>{item.totalPoints}</Text>
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F3F3E0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    top: 150,
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
  },
  rankContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  trophyIcon: {
    width: 35,
    height: 35,
    position: "absolute",
    left: 0,
  },

  dot: {
    position: "absolute",
    right: 20,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },
  firstPlace: {
    backgroundColor: "#F7C548",
  },
  secondPlace: {
    backgroundColor: "#acacac",
  },
  thirdPlace: {
    backgroundColor: "#a48347",
  },
  neutralPlace: {
    backgroundColor: "#d5d7db",
  },
  listContainer: {
    height: "100%",
  },
  listContent: {
    paddingBottom: 20,
  },
  currentUserRow: {
    shadowOffset: { width: 0, height: 3 }, // Direcționăm shadow-ul mai mult în jos
    shadowOpacity: 0.75,
  },
});

export default Leaderboard;
