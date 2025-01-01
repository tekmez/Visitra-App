import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
import { fonts } from "../theme/fonts";

interface PlaceImageGalleryProps {
  images: string[];
  onImagePress: (index: number) => void;
}

export const PlaceImageGallery: React.FC<PlaceImageGalleryProps> = ({
  images,
  onImagePress,
}) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.section, { borderBottomColor: colors.border.primary }]}
    >
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Fotoğraflar
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageGallery}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onImagePress(index)}
            style={[
              styles.imageContainer,
              { backgroundColor: colors.background.secondary },
            ]}
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
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    marginBottom: 12,
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
