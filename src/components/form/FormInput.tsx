import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";
import { fonts } from "../../theme/fonts";

interface FormInputProps extends TextInputProps {
  hasError?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  hasError,
  style,
  ...props
}) => {
  const { colors } = useAppTheme();

  return (
    <TextInput
      style={[
        styles.input,
        hasError && { borderColor: colors.text.error },
        {
          backgroundColor: colors.background.secondary,
          color: colors.text.primary,
          borderColor: colors.border.primary,
        },
        style,
      ]}
      placeholderTextColor={colors.text.tertiary}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: fonts.regular,
    borderWidth: 1,
  },
});
