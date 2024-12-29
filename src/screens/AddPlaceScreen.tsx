import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { PlaceFormHeader } from "../components/form";
import { PlaceFormFields } from "../components/form/PlaceFormFields";
import { useAddPlaceForm } from "../hooks/useAddPlaceForm";

const AddPlaceScreen: React.FC = () => {
  const { control, errors, setValue, watch, handleSubmit, onSubmit } =
    useAddPlaceForm();

  return (
    <SafeAreaView style={styles.safeArea}>
      <PlaceFormHeader
        title="Yeni Mekan Ekle"
        onSave={handleSubmit(onSubmit)}
      />
      <PlaceFormFields
        control={control}
        errors={errors}
        setValue={setValue}
        watch={watch}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});

export default AddPlaceScreen;
