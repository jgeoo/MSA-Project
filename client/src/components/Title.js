import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Title(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 100,
    alignItems: "flex-start",
    width: "100%",
    left: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#133E87",
  },
});
