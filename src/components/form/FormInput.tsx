import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fonts } from "../../theme/fonts";

interface FormInputProps extends TextInputProps {
  hasError?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  hasError,
  style,
  ...props
}) => {
  return (
    <TextInput
      style={[styles.input, hasError && styles.inputError, style]}
      placeholderTextColor={colors.text.tertiary}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  inputError: {
    borderColor: colors.text.error,
  },
});
