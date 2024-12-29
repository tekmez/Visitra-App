import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { ImagePreviewModal } from "../components/ImagePreviewModal";
import { AddNoteModal } from "../components/AddNoteModal";
import { PlaceDetailHeader } from "../components/PlaceDetailHeader";
import { PlaceImageGallery } from "../components/PlaceImageGallery";
import { PlaceNotes } from "../components/PlaceNotes";
import { PlaceMap } from "../components/PlaceMap";

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
        <PlaceDetailHeader
          title={place.name}
          onBack={() => navigation.goBack()}
        />

        <PlaceImageGallery
          images={place.images}
          onImagePress={handleImagePress}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Açıklama</Text>
          <Text style={styles.description}>{place.description}</Text>
        </View>

        <PlaceNotes notes={notes} onAddNote={handleAddNote} />

        <PlaceMap coordinates={place.coordinates} />

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
  section: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  visitButton: {
    margin: 16,
    marginTop: 8,
    padding: 16,
    backgroundColor: "#FFB800",
    borderRadius: 12,
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
});

export default PlaceDetailScreen;
