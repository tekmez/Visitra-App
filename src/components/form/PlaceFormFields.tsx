import React, { useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 20}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ImagePicker
          selectedImages={watch("images")}
          onImagesSelect={(images) => setValue("images", images)}
          error={errors.images?.message}
        />

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <FormLabel>Mekan Adı</FormLabel>
            <Text style={styles.characterCount}>
              {watch("name")?.length || 0}/25
            </Text>
          </View>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <FormInput
                hasError={!!errors.name}
                value={value}
                onChangeText={onChange}
                placeholder="Mekan adını giriniz"
                maxLength={25}
              />
            )}
          />
          {errors.name && <FormError>{errors.name.message}</FormError>}
          {watch("name")?.length > 25 && (
            <FormError>Mekan adı en fazla 25 karakter olmalıdır.</FormError>
          )}
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
          <View style={styles.labelContainer}>
            <FormLabel>Açıklama</FormLabel>
            <Text style={styles.characterCount}>
              {watch("description")?.length || 0}/150
            </Text>
          </View>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <FormInput
                hasError={!!errors.description}
                value={value}
                onChangeText={onChange}
                placeholder="Mekan hakkında açıklama giriniz"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                returnKeyType="default"
                onFocus={scrollToBottom}
                style={styles.noteInput}
                maxLength={150}
              />
            )}
          />
          {errors.description && (
            <FormError>{errors.description.message}</FormError>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 50 : 60,
  },
  inputContainer: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  characterCount: {
    fontSize: 12,
    color: "#666",
  },
  noteInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
    minHeight: 100,
  },
});
