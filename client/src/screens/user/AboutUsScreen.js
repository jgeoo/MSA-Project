import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../utils/ThemeContext";
import Title from "../../components/Title";
import { Ionicons } from "@expo/vector-icons";

export default function AboutUsScreen({ navigation }) {
  const { themeStyles } = useTheme();

  const renderItem = (iconName, boldText, normalText) => (
    <View style={styles.itemContainer}>
      <Ionicons name={iconName} size={20} color="#4A6EAC" />
      <Text style={[styles.itemText, { color: themeStyles.textColor }]}>
        <Text style={{ fontWeight: "bold", color: "#4A6EAC" }}>{boldText}</Text>
        {normalText}
      </Text>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <Title text="About Us" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Main", { screen: "Settings" })}
      >
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color={themeStyles.textColor}
        />
      </TouchableOpacity>

      <Image source={require("../../../assets/logo.png")} style={styles.logo} />
      <Text style={[styles.paragraph, { color: themeStyles.textColor }]}>
        Welcome to our donation app! We aim to make giving back easier and more
        rewarding for everyone.
      </Text>
      <Text style={[styles.paragraph, { color: themeStyles.textColor }]}>
        Here’s how it works:
      </Text>

      {renderItem(
        "heart-outline",
        "Donate: ",
        "Contribute to causes that matter to you. Every donation makes a difference!"
      )}
      {renderItem(
        "star-outline",
        "Earn Points: ",
        "For every donation, you earn points based on the amount contributed."
      )}
      {renderItem(
        "ribbon-outline",
        "Unlock Badges: ",
        "Show off your generosity with unique badges that reflect your impact."
      )}
      {renderItem(
        "podium-outline",
        "Leaderboard: ",
        "Compete with other donors and see who’s making the biggest impact."
      )}

      <Text style={[styles.paragraph, { color: themeStyles.textColor }]}>
        Together, we can support important causes and make the world a better
        place. Every point, badge, and donation counts towards creating a
        positive change.
      </Text>
      <Text style={[styles.paragraph, { color: themeStyles.textColor }]}>
        Thank you for joining us on this journey of generosity. Let’s make a
        difference together!
      </Text>
      <Text style={[styles.contact, { color: themeStyles.textColor }]}>
        Questions? Contact us at{" "}
        <Text style={{ fontWeight: "bold" }}>support@donationapp.com</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 120,
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 22,
  },
  image: {
    width: "90%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 15,
    marginVertical: 20,
  },
  contact: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    width: "90%",
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
    lineHeight: 22,
  },
  backButton: {
    position: "absolute",
    top: 107,
    right: 30,
  },
});
