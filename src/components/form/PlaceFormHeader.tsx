import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { fonts } from "../../theme/fonts";
import { colors } from "../../theme/colors";

interface PlaceFormHeaderProps {
  onSave: () => void;
  title: string;
}

export const PlaceFormHeader: React.FC<PlaceFormHeaderProps> = ({
  onSave,
  title,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity style={styles.headerSaveButton} onPress={onSave}>
        <Text style={styles.headerSaveButtonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
