import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { fonts } from "../theme/fonts";
import { useAppTheme } from "../hooks/useAppTheme";
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
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Label>Category</Label>
      <ScrollView horizontal>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.title}
            style={[
              styles.categoryButton,
              { backgroundColor: colors.background.secondary },
              selectedCategory === cat.title && {
                backgroundColor: colors.secondary,
              },
            ]}
            onPress={() => {
              onCategorySelect(cat.title);
            }}
          >
            <Text
              style={[
                styles.categoryText,
                { color: colors.text.secondary },
                selectedCategory === cat.title && {
                  color: colors.text.primary,
                },
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
  },
  categoryText: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
});
