import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { fonts } from "../../theme/fonts";
import { useAppTheme } from "../../hooks/useAppTheme";

interface InputProps extends TextInputProps {
  hasError?: boolean;
}

export const Input: React.FC<InputProps> = ({ hasError, style, ...props }) => {
  const { colors } = useAppTheme();

  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor: hasError ? colors.text.error : colors.border.primary,
          color: colors.text.primary,
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
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontFamily: fonts.regular,
  },
});
