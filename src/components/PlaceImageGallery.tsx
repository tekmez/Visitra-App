import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

interface PlaceImageGalleryProps {
  images: string[];
  onImagePress: (index: number) => void;
}

export const PlaceImageGallery: React.FC<PlaceImageGalleryProps> = ({
  images,
  onImagePress,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Fotoğraflar</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageGallery}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onImagePress(index)}
            style={styles.imageContainer}
          >
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  imageGallery: {
    marginTop: 12,
  },
  imageContainer: {
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F8F8F8",
  },
  image: {
    width: 180,
    height: 140,
    borderRadius: 16,
  },
});
