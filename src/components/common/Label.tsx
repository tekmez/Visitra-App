import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { fonts } from "../../theme/fonts";
import { colors } from "../../theme/colors";

export const Label: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[styles.label, style]} {...props} />;
};

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.medium,
    marginBottom: 8,
    color: colors.text.secondary,
  },
});
