import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { fonts } from "../theme/fonts";
import { colors } from "../theme/colors";
import { categories } from "../constants/categories";
import { Label, ErrorText } from "./common";

interface CategoryPickerProps {
  selectedCategory: string | undefined;
  onCategorySelect: (category: string) => void;
  error?: string;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedCategory,
  onCategorySelect,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Label>Kategori</Label>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.title}
            style={[
              styles.categoryButton,
              selectedCategory === cat.title && styles.categoryButtonSelected,
            ]}
            onPress={() => {
              onCategorySelect(cat.title);
            }}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat.title && styles.categoryTextSelected,
              ]}
            >
              {cat.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {error && <ErrorText>{error}</ErrorText>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: colors.background.secondary,
  },
  categoryButtonSelected: {
    backgroundColor: colors.secondary,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.text.secondary,
  },
  categoryTextSelected: {
    color: colors.text.primary,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
});
