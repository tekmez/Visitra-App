import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { ImagePreviewModal } from "../components/ImagePreviewModal";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

type PlaceDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PlaceDetail"
>;

type PlaceDetailScreenRouteProp = RouteProp<RootStackParamList, "PlaceDetail">;

interface PlaceDetailScreenProps {
  route: PlaceDetailScreenRouteProp;
  navigation: PlaceDetailScreenNavigationProp;
}

const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { place } = route.params;
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [notes, setNotes] = useState(place.notes || "");
  const [isVisited, setIsVisited] = useState(place.isVisited);

  const handleImagePress = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>{place.name}</Text>
        </View>

        {/* Image Gallery */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fotoğraflar</Text>
          <View style={styles.imageGrid}>
            {place.images.slice(0, 4).map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(index)}
                style={styles.gridImageContainer}
              >
                <Image source={{ uri: image }} style={styles.gridImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Açıklama</Text>
          <Text style={styles.description}>{place.description}</Text>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notlarım</Text>
          <TextInput
            style={styles.notesInput}
            multiline
            value={notes}
            onChangeText={setNotes}
            placeholder="Notlarınızı buraya ekleyin..."
          />
        </View>

        {/* Map */}
        <View style={styles.mapContainer}>
          <Text style={styles.sectionTitle}>Konum</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: place.coordinates.latitude,
              longitude: place.coordinates.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: place.coordinates.latitude,
                longitude: place.coordinates.longitude,
              }}
            />
          </MapView>
        </View>

        {/* Visit Status Button */}
        <TouchableOpacity
          style={[styles.visitButton, isVisited && styles.visitedButton]}
          onPress={() => setIsVisited(!isVisited)}
        >
          <Text style={styles.visitButtonText}>
            {isVisited ? "Gidildi ✓" : "Gidildi Olarak İşaretle"}
          </Text>
        </TouchableOpacity>

        <ImagePreviewModal
          visible={isImageModalVisible}
          imageUri={place.images[currentImageIndex]}
          images={place.images}
          currentIndex={currentImageIndex}
          onIndexChange={setCurrentImageIndex}
          onClose={() => setIsImageModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: Platform.OS === "android" ? 16 : 0,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageGallery: {
    height: 250,
    padding: 16,
  },
  imageContainer: {
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 16,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
  },
  mapContainer: {
    padding: 16,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  visitButton: {
    margin: 16,
    padding: 16,
    backgroundColor: "#FFB800",
    borderRadius: 8,
    alignItems: "center",
  },
  visitedButton: {
    backgroundColor: "#4CAF50",
  },
  visitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  gridImageContainer: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
});

export default PlaceDetailScreen;
