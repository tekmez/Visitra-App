import React from "react";
import { Text, StyleSheet } from "react-native";
import { fonts } from "../../theme/fonts";
import { colors } from "../../theme/colors";

interface FormLabelProps {
  children: React.ReactNode;
}

export const FormLabel: React.FC<FormLabelProps> = ({ children }) => {
  return <Text style={styles.label}>{children}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.text.primary,
    marginBottom: 8,
  },
});
