import React from "react";
import { Text, StyleSheet } from "react-native";
import { fonts } from "../../theme/fonts";
import { colors } from "../../theme/colors";

interface FormErrorProps {
  children: React.ReactNode;
}

export const FormError: React.FC<FormErrorProps> = ({ children }) => {
  if (!children) return null;
  return <Text style={styles.error}>{children}</Text>;
};

const styles = StyleSheet.create({
  error: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text.error,
    marginTop: 4,
  },
});
