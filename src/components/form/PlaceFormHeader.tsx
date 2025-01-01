import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { fonts } from "../../theme/fonts";
import { useAppTheme } from "../../hooks/useAppTheme";

interface PlaceFormHeaderProps {
  onSave: () => void;
  title: string;
}

export const PlaceFormHeader: React.FC<PlaceFormHeaderProps> = ({
  onSave,
  title,
}) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background.primary,
          borderBottomColor: colors.border.primary,
        },
      ]}
    >
      <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
        {title}
      </Text>
      <TouchableOpacity
        style={[styles.headerSaveButton, { backgroundColor: colors.secondary }]}
        onPress={onSave}
      >
        <Text
          style={[styles.headerSaveButtonText, { color: colors.text.primary }]}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.medium,
  },
  headerSaveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 36,
  },
  headerSaveButtonText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
