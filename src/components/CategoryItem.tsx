import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { Category } from "../constants/categories";

interface CategoryItemProps extends Category {
  onPress: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  title,
  placeCount,
  image,
  onPress,
}) => (
  <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
    <Image source={image} style={styles.categoryImage} />
    <View style={styles.categoryInfo}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categoryCount}>{placeCount} places</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 15,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
  },
  categoryCount: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    marginTop: 4,
  },
});

export default CategoryItem;
