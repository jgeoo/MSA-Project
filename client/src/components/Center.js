import React, { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import MapView, { Marker, Callout } from "react-native-maps";
import { useTheme } from "../utils/ThemeContext";

const Center = ({ center, distance, currentLocation }) => {
  const { isDarkTheme } = useTheme();
  const [selectedCenter, setSelectedCenter] = useState("");

  const icon = () => {
    return (
      <Svg height={20} width={20}>
        <Ellipse
          cx="10"
          cy="10"
          rx="10"
          ry="10"
          fill="blue"
          stroke="#fff"
          strokeWidth="2"
        />
      </Svg>
    );
  };
  return (
    <View style={styles.card}>
      <View>
        <TouchableOpacity
          style={[
            styles.centerCard,
            {
              backgroundColor: isDarkTheme ? "#252525" : "#B3B3A1",
            },
            center.id === selectedCenter ? styles.selected : null,
          ]}
          onPress={() => {
            if (selectedCenter === center.id) {
              setSelectedCenter("");
            } else {
              setSelectedCenter(center.id);
            }
          }}
        >
          <View style={styles.centerData}>
            <View style={styles.firstSectionData}>
              <Text>
                <Text
                  style={[
                    { fontWeight: "bold", color: "#4A6EAC", fontSize: 20 },
                    center.id === selectedCenter ? styles.selectedText : null,
                  ]}
                >
                  {center.name}
                </Text>
              </Text>
              <Text style={styles.centerField}>
                <Text style={{ fontWeight: "bold" }}>Address {"\n"}</Text>
                {center.address}
              </Text>
            </View>
            <View style={styles.secondSectionData}>
              <Text style={styles.centerField}>
                <Text style={{ fontWeight: "bold" }}>{distance} km</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {selectedCenter && selectedCenter === center.id && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: center.latitude,
                longitude: center.longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }}
            >
              <Marker
                coordinate={{
                  latitude: center.latitude,
                  longitude: center.longitude,
                }}
              >
                <Callout style={styles.calloutContainer}>
                  <Text>{center.address}</Text>
                </Callout>
              </Marker>

              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
              >
                <View>{icon()}</View>
                <Callout style={styles.calloutContainer}>
                  <Text>You are here</Text>
                </Callout>
              </Marker>
            </MapView>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  centerCard: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    height: 120,
    width: 350,
    padding: 5,
    justifyContent: "center",
  },
  centerField: {
    fontSize: 15,
  },
  centerData: {
    height: 120,
    width: 320,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selected: {
    backgroundColor: "#4A6EAC",
  },
  selectedText: {
    color: "black",
  },
  firstSectionData: {
    height: 120,
    width: 250,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    width: 350,
    height: 300,
    marginVertical: 10,
  },
});

export default Center;
