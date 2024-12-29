import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";

interface LocationPickerProps {
  onLocationSelect: (location: { latitude: number; longitude: number }) => void;
  selectedLocation: { latitude: number; longitude: number } | null;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  selectedLocation,
}) => {
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 41.0082,
    longitude: 28.9784,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "İzin Gerekli",
          "Konumunuzu göstermek için konum izni gerekiyor."
        );
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const { latitude, longitude } = location.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setMapRegion(newRegion);
      } catch (error) {
        console.error("Konum alınamadı:", error);
      }
    })();
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={mapRegion}
        showsUserLocation
        showsMyLocationButton
        onRegionChangeComplete={(region) => setMapRegion(region)}
        onPress={(e) => {
          const coordinate = e.nativeEvent.coordinate;
          onLocationSelect(coordinate);
        }}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
});
