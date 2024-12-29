import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { fonts } from "../../theme/fonts";
import { colors } from "../../theme/colors";

export const ErrorText: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[styles.error, style]} {...props} />;
};

const styles = StyleSheet.create({
  error: {
    color: colors.text.error,
    fontSize: 12,
    marginTop: 4,
    fontFamily: fonts.regular,
  },
});
