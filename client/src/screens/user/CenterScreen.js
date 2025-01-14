import React, { useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { View, Text, StyleSheet, FlatList } from "react-native";
import Center from "../../components/Center";
import Title from "../../components/Title";
import { useTheme } from "../../utils/ThemeContext";
import * as ExpoLocation from "expo-location";

export default function CenterScreen() {
  const { themeStyles } = useTheme();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });

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

  const centersData = [
    {
      id: "1",
      name: "Asociația Casa Faenza",
      address: "Strada Gării nr. 4, Timișoara",
      latitude: 45.748871,
      longitude: 21.208679,
    },
    {
      id: "2",
      name: "Fundația de Abilitare Speranța",
      address: "Strada Gheorghe Doja nr. 14, Timișoara",
      latitude: 45.747215,
      longitude: 21.223142,
    },
    {
      id: "3",
      name: "Asociația Ceva de Spus",
      address: "Strada Vasile Alecsandri nr. 1, Timișoara",
      latitude: 45.756647,
      longitude: 21.229962,
    },
  ];

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

    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

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
        keyExtractor={(center) => center.id}
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
