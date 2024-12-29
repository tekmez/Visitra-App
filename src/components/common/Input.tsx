import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { fonts } from "../../theme/fonts";
import { colors } from "../../theme/colors";

interface InputProps extends TextInputProps {
  hasError?: boolean;
}

export const Input: React.FC<InputProps> = ({ hasError, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, hasError && styles.inputError, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: 8,
    padding: 12,
    fontFamily: fonts.regular,
  },
  inputError: {
    borderColor: colors.border.error,
  },
});
