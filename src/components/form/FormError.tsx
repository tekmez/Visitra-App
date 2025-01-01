import React from "react";
import { Text, StyleSheet } from "react-native";
import { fonts } from "../../theme/fonts";
import { useAppTheme } from "../../hooks/useAppTheme";

interface FormErrorProps {
  children: React.ReactNode;
}

export const FormError: React.FC<FormErrorProps> = ({ children }) => {
  const { colors } = useAppTheme();
  if (!children) return null;
  return (
    <Text style={[styles.error, { color: colors.text.error }]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 14,
    fontFamily: fonts.regular,
    marginTop: 4,
  },
});
