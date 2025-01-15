import React, { useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { View, Text, StyleSheet, FlatList } from "react-native";
import Center from "../../components/Center";
import Title from "../../components/Title";
import { useTheme } from "../../utils/ThemeContext";
import * as ExpoLocation from "expo-location";
import axios from "axios";

export default function CenterScreen() {
  const { themeStyles } = useTheme();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [centersData, setCentersData] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (angle) => (Math.PI / 180) * angle;
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(1);
  };
  const fetchCenters = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/ngos");
      console.log(response.data)
      setCentersData(response.data);
    } catch (error) {
      console.error("Error fetching centers data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        await fetchCenters();
      };
      fetchData();
    }, [])
  );
  const sortedData = centersData.sort(
    (a, b) =>
      calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        a.latitude,
        a.longitude
      ) -
      calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        b.latitude,
        b.longitude
      )
  );

  const getCurrentLocationAsync = useCallback(async () => {
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    console.log("----")
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    const {test} = await ExpoLocation.getCurrentLocationAsync({});

    console.log("location: ", test)
    const location = await ExpoLocation.getCurrentPositionAsync({});
    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  });

  useEffect(() => {
    getCurrentLocationAsync();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getCurrentLocationAsync();
    }, [])
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <Title text="NOG Centers" />
      <FlatList
        style={styles.centersList}
        data={sortedData}
        keyExtractor={(center) => center.ngoId}
        renderItem={({ item }) => (
          <Center
            center={item}
            distance={calculateDistance(
              currentLocation.latitude,
              currentLocation.longitude,
              item.latitude,
              item.longitude
            )}
            currentLocation={currentLocation}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centersList: {
    marginTop: 150,
  },
});
