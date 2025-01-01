import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { fonts } from "../../theme/fonts";
import { useAppTheme } from "../../hooks/useAppTheme";

export const Label: React.FC<TextProps> = ({ style, ...props }) => {
  const { colors } = useAppTheme();

  return (
    <Text
      style={[styles.label, { color: colors.text.secondary }, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.medium,
    marginBottom: 8,
  },
});
