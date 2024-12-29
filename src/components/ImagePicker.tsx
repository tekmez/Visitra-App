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
import { colors } from "../theme/colors";
import { ErrorText } from "./common";
import { ImagePreviewModal } from "./ImagePreviewModal";

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
        Alert.alert("Limit Aşıldı", "En fazla 4 fotoğraf ekleyebilirsiniz.");
        return;
      }

      const { status } =
        await ImagePickerExpo.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "İzin Gerekli",
          "Fotoğraf seçmek için galeri erişim izni gerekiyor."
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
      Alert.alert("Hata", "Fotoğraf seçilirken bir hata oluştu");
      console.error("Fotoğraf seçme hatası:", error);
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
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Text style={styles.removeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
        {selectedImages.length < MAX_IMAGES && (
          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <Text style={styles.addButtonText}>+</Text>
            <Text style={styles.addButtonLabel}>
              Fotoğraf Ekle ({selectedImages.length}/{MAX_IMAGES})
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
    backgroundColor: colors.background.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  removeButtonText: {
    color: colors.text.error,
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 32,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  addButtonLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: fonts.regular,
  },
});
