import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useAuth } from "../../utils/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "../../utils/ThemeContext";

import axios from "axios";
import Title from "../../components/Title";

export default function HomeScreen({ navigation }) {
  const { token } = useAuth();
  const { themeStyles, isDarkTheme } = useTheme();
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Decode the token
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

  // Fetch current user details
  const fetchingCurrentUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/email/${decoded.sub}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching current user data:", error);
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

  const renderContainer = (image, label, color, colorCircle) => {
    let imagePath;
    switch (image) {
      case "posts.png":
        imagePath = require("../../../assets/posts.png");
        break;
      case "centers.png":
        imagePath = require("../../../assets/centers.png");
        break;
      case "leaderboard.png":
        imagePath = require("../../../assets/leaderboard.png");
        break;
      case "settings.png":
        imagePath = require("../../../assets/settings.png");
        break;
      default:
        console.error(`Image not recognized: ${image}`);
      // imagePath = require("../../assets/LogoDark.png");
    }
    return (
      <TouchableOpacity
        style={[styles.selectionContainer, { backgroundColor: color }]}
        onPress={() => {
          navigation.navigate(`${label}`);
        }}
      >
        <View style={[styles.circle, { backgroundColor: colorCircle }]}>
          <Image style={styles.logo} source={imagePath}></Image>
        </View>
        <Text style={styles.logoText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  // Render loading spinner if data is not ready
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4a6eac" />
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
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      {currentUser && (
        <>
          <Title text={"Welcome, " + currentUser.name + "!"} />
          <View style={styles.menuContainer}>
            {renderContainer("posts.png", "Posts", "#4a051c", "#ffee88")}
            {renderContainer(
              "centers.png",
              "NOG Centers",
              "#4a051c",
              "#ffee88"
            )}
            {renderContainer(
              "leaderboard.png",
              "Leaderboard",
              "#4a051c",
              "#ffee88"
            )}
            {renderContainer("settings.png", "Settings", "#4a051c", "#ffee88")}
          </View>
        </>
      )}

      {/* Donation Post Section */}
      <View
        style={[
          styles.postContainer,
          {
            backgroundColor: isDarkTheme ? "#252525" : "#B3B3A1",
          },
        ]}
      >
        <Text style={[styles.postTitle, { color: themeStyles.textColor }]}>
          Support a Higher Level through Donations!
        </Text>

        <Image
          source={require("../../../assets/donation_image.jpg")}
          style={styles.postImage}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.donateButton}
            onPress={() => console.log("Donație efectuată")}
          >
            <Text style={styles.buttonText}>Donate now</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.disclaimer, { color: themeStyles.textColor }]}>
          Donations help enhance user experience and support app development.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F3F3E0",
    padding: 16,
  },
  menuContainer: {
    top: 160,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  selectionContainer: {
    width: 165,
    height: 165,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logo: {
    resizeMode: "stretch",
    width: 50,
    height: 50,
  },
  logoText: {
    fontSize: 15,
    color: "#cbdceb",
    fontWeight: "bold",
  },
  circle: {
    borderRadius: 50,
    height: 75,
    width: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  postContainer: {
    top: 175,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    alignSelf: "center",
    height: 270,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4a051c",
    textAlign: "center",
    marginBottom: 12,
  },
  postText: {
    fontSize: 13,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  postImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "center",
  },
  donateButton: {
    backgroundColor: "#4a051c",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disclaimer: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 10,
  },
});
