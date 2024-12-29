import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import { fonts } from "../theme/fonts";
import { colors } from "../theme/colors";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeSchema, PlaceFormData } from "../schema/place";
import { LocationPicker } from "../components/LocationPicker";
import { ImagePicker } from "../components/ImagePicker";
import { CategoryPicker } from "../components/CategoryPicker";
import { Input, Label, ErrorText } from "../components/common";

const AddPlaceScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<PlaceFormData>({
    resolver: zodResolver(placeSchema),
    defaultValues: {
      name: "",
      images: [],
      location: null,
      category: undefined,
      note: "",
    },
  });

  const scrollViewRef = useRef<ScrollView>(null);

  const onSubmit = (data: PlaceFormData) => {
    console.log("Yeni mekan:", data);
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Yeni Mekan Ekle</Text>
        <TouchableOpacity
          style={styles.headerSaveButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.headerSaveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <ImagePicker
          selectedImages={watch("images")}
          onImagesSelect={(images) => setValue("images", images)}
          error={errors.images?.message}
        />

        <View style={styles.inputContainer}>
          <Label>Mekan Adı</Label>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                hasError={!!errors.name}
                value={value}
                onChangeText={onChange}
                placeholder="Mekan adını giriniz"
              />
            )}
          />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
        </View>

        <LocationPicker
          selectedLocation={watch("location")}
          onLocationSelect={(location) => setValue("location", location)}
        />

        <CategoryPicker
          selectedCategory={watch("category")}
          onCategorySelect={(category) => setValue("category", category)}
          error={errors.category?.message}
        />

        <View style={styles.inputContainer}>
          <Label>Not</Label>
          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, value } }) => (
              <Input
                hasError={!!errors.note}
                value={value}
                onChangeText={onChange}
                placeholder="Notunuzu giriniz"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                returnKeyType="default"
                blurOnSubmit={false}
                onFocus={scrollToBottom}
                style={styles.noteInput}
              />
            )}
          />
          {errors.note && <ErrorText>{errors.note.message}</ErrorText>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    height: 56,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: colors.text.primary,
  },
  headerSaveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 36,
  },
  headerSaveButtonText: {
    color: colors.text.primary,
    fontFamily: fonts.medium,
    fontSize: 14,
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  noteInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
    minHeight: 100,
  },
});

export default AddPlaceScreen;
