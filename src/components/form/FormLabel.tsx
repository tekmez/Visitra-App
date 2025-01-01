import React from "react";
import { Text, StyleSheet } from "react-native";
import { fonts } from "../../theme/fonts";
import { useAppTheme } from "../../hooks/useAppTheme";

interface FormLabelProps {
  children: React.ReactNode;
}

export const FormLabel: React.FC<FormLabelProps> = ({ children }) => {
  const { colors } = useAppTheme();
  return (
    <Text style={[styles.label, { color: colors.text.primary }]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: fonts.medium,
    marginBottom: 8,
  },
});
