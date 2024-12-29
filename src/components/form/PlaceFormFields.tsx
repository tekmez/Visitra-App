import React, { useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Control, FieldErrors, Controller } from "react-hook-form";
import { PlaceFormData } from "../../schema/place";
import { FormInput, FormLabel, FormError } from "./";
import { ImagePicker } from "../ImagePicker";
import { LocationPicker } from "../LocationPicker";
import { CategoryPicker } from "../CategoryPicker";

interface PlaceFormFieldsProps {
  control: Control<PlaceFormData>;
  errors: FieldErrors<PlaceFormData>;
  watch: any;
  setValue: any;
}

export const PlaceFormFields: React.FC<PlaceFormFieldsProps> = ({
  control,
  errors,
  watch,
  setValue,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
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
        <FormLabel>Mekan Adı</FormLabel>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <FormInput
              hasError={!!errors.name}
              value={value}
              onChangeText={onChange}
              placeholder="Mekan adını giriniz"
            />
          )}
        />
        {errors.name && <FormError>{errors.name.message}</FormError>}
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
        <FormLabel>Not</FormLabel>
        <Controller
          control={control}
          name="note"
          render={({ field: { onChange, value } }) => (
            <FormInput
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
        {errors.note && <FormError>{errors.note.message}</FormError>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
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
