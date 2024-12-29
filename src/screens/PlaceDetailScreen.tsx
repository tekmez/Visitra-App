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
import { AddNoteModal } from "../components/AddNoteModal";

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
  const [isAddNoteModalVisible, setIsAddNoteModalVisible] = useState(false);

  const handleImagePress = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalVisible(true);
  };

  const handleAddNote = () => {
    setIsAddNoteModalVisible(true);
  };

  const handleSaveNote = (note: string) => {
    setNotes(note);
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageGallery}
          >
            {place.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(index)}
                style={styles.imageContainer}
              >
                <Image source={{ uri: image }} style={styles.image} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Açıklama</Text>
          <Text style={styles.description}>{place.description}</Text>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Notlarım</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
              <Ionicons
                name={notes ? "create" : "add-circle"}
                size={24}
                color="#FFB800"
              />
            </TouchableOpacity>
          </View>
          {notes ? (
            <View style={styles.noteContent}>
              <ScrollView
                style={styles.noteScroll}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.description}>{notes}</Text>
              </ScrollView>
            </View>
          ) : (
            <Text style={styles.emptyNotes}>Henüz not eklenmemiş</Text>
          )}
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

        <AddNoteModal
          visible={isAddNoteModalVisible}
          onClose={() => setIsAddNoteModalVisible(false)}
          onSave={handleSaveNote}
          initialNote={notes}
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
    marginTop: 8,
  },
  imageContainer: {
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 12,
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  addButton: {
    padding: 4,
  },
  emptyNotes: {
    color: "#999",
    fontSize: 14,
    fontStyle: "italic",
  },
  noteContent: {
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 8,
  },
  noteScroll: {
    maxHeight: 150,
  },
});

export default PlaceDetailScreen;
