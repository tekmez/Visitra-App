import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
import { PlaceFormHeader } from "../components/form";
import { PlaceFormFields } from "../components/form/PlaceFormFields";
import { useAddPlaceForm } from "../hooks/useAddPlaceForm";

const AddPlaceScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const { control, errors, setValue, watch, handleSubmit, onSubmit } =
    useAddPlaceForm();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background.primary }]}
    >
      <PlaceFormHeader title="Add New Place" onSave={handleSubmit(onSubmit)} />
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
  },
});

export default AddPlaceScreen;
