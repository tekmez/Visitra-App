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
import { categories } from "../schema/place";
import { Label, ErrorText } from "./common";

type Category = (typeof categories)[number];

interface CategoryPickerProps {
  selectedCategory: Category | undefined;
  onCategorySelect: (category: Category) => void;
  error?: string;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedCategory,
  onCategorySelect,
  error,
}) => {
  return (
    <View style={styles.categoriesContainer}>
      <Label>Kategori</Label>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.selectedCategory,
            ]}
            onPress={() => onCategorySelect(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.selectedCategoryText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {error && <ErrorText>{error}</ErrorText>}
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontFamily: fonts.regular,
    color: colors.text.secondary,
  },
  selectedCategoryText: {
    color: colors.background.primary,
  },
});
