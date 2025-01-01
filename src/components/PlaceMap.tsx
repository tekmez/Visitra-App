import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
import { fonts } from "../theme/fonts";
import MapView, { Marker } from "react-native-maps";

interface PlaceMapProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const PlaceMap: React.FC<PlaceMapProps> = ({ coordinates }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.mapContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Konum
      </Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={coordinates} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    marginBottom: 12,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginTop: 4,
  },
});
