import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePickerExpo from "expo-image-picker";
import { fonts } from "../theme/fonts";
import { ErrorText } from "./common";
import { ImagePreviewModal } from "./ImagePreviewModal";
import { useAppTheme } from "../hooks/useAppTheme";

const MAX_IMAGES = 4;

interface ImagePickerProps {
  onImagesSelect: (uris: string[]) => void;
  selectedImages: string[];
  error?: string;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  onImagesSelect,
  selectedImages,
  error,
}) => {
  const { colors } = useAppTheme();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openPreview = (index: number) => {
    setCurrentImageIndex(index);
    setPreviewImage(selectedImages[index]);
  };

  const handleIndexChange = (index: number) => {
    setCurrentImageIndex(index);
    setPreviewImage(selectedImages[index]);
  };

  const closePreview = () => {
    setPreviewImage(null);
    setCurrentImageIndex(0);
  };

  const pickImage = async () => {
    try {
      if (selectedImages.length >= MAX_IMAGES) {
        Alert.alert("Limit Exceeded", "You can only add up to 4 images.");
        return;
      }

      const { status } =
        await ImagePickerExpo.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Gallery access permission is required to select images."
        );
        return;
      }

      const remainingSlots = MAX_IMAGES - selectedImages.length;

      const result = await ImagePickerExpo.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: remainingSlots,
      });

      if (!result.canceled && result.assets) {
        const newUris = result.assets.map((asset) => asset.uri);
        onImagesSelect([...selectedImages, ...newUris]);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while selecting images");
      console.error("Image selection error:", error);
    }
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    onImagesSelect(newImages);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {selectedImages.map((uri, index) => (
          <View key={uri} style={styles.imageWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => openPreview(index)}
            >
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.removeButton,
                { backgroundColor: colors.background.primary },
              ]}
              onPress={() => removeImage(index)}
            >
              <Text
                style={[styles.removeButtonText, { color: colors.text.error }]}
              >
                ✕
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        {selectedImages.length < MAX_IMAGES && (
          <TouchableOpacity
            style={[
              styles.addButton,
              { backgroundColor: colors.background.secondary },
            ]}
            onPress={pickImage}
          >
            <Text
              style={[styles.addButtonText, { color: colors.text.secondary }]}
            >
              +
            </Text>
            <Text
              style={[styles.addButtonLabel, { color: colors.text.secondary }]}
            >
              Add Image ({selectedImages.length}/{MAX_IMAGES})
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      {error && <ErrorText>{error}</ErrorText>}
      {previewImage && (
        <ImagePreviewModal
          visible={!!previewImage}
          imageUri={previewImage || ""}
          images={selectedImages}
          currentIndex={currentImageIndex}
          onIndexChange={handleIndexChange}
          onClose={closePreview}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    gap: 8,
    paddingVertical: 4,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  removeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    width: 120,
    height: 120,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 32,
    marginBottom: 4,
  },
  addButtonLabel: {
    fontSize: 12,
    fontFamily: fonts.regular,
  },
});
