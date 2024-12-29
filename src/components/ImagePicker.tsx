import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePickerExpo from "expo-image-picker";
import { fonts } from "../theme/fonts";

interface ImagePickerProps {
  onImageSelect: (uri: string) => void;
  selectedImage: string | null;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageSelect,
  selectedImage,
}) => {
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePickerExpo.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "İzin Gerekli",
          "Fotoğraf seçmek için galeri erişim izni gerekiyor."
        );
        return;
      }

      const result = await ImagePickerExpo.launchImageLibraryAsync({
        mediaTypes: ImagePickerExpo.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        onImageSelect(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Hata", "Fotoğraf seçilirken bir hata oluştu");
      console.error("Fotoğraf seçme hatası:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Fotoğraf Ekle</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    marginTop: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontFamily: fonts.regular,
    color: "#666",
  },
});
