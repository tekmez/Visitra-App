import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { fonts } from "../../theme/fonts";
import { useAppTheme } from "../../hooks/useAppTheme";

export const ErrorText: React.FC<TextProps> = ({ style, ...props }) => {
  const { colors } = useAppTheme();

  return (
    <Text
      style={[styles.error, { color: colors.text.error }, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: fonts.regular,
  },
});
