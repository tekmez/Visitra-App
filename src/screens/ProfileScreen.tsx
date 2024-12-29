import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { Category, categories } from "../constants/categories";

interface CategoryItemProps extends Category {
  onPress: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  title,
  count,
  image,
  onPress,
}) => (
  <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
    <Image source={image} style={styles.categoryImage} />
    <View style={styles.categoryInfo}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categoryCount}>{count || 0} places</Text>
    </View>
    <View style={styles.chevronContainer}>
      <Text style={styles.chevron}>›</Text>
    </View>
  </TouchableOpacity>
);

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
      </View>

      <View style={styles.themeSection}>
        <Text style={styles.themeText}>Theme</Text>
        <TouchableOpacity style={styles.systemButton}>
          <Text style={styles.systemButtonText}>System</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        {categories.map((category) => (
          <CategoryItem
            key={category.title}
            {...category}
            count={7}
            onPress={() => {}}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
  },
  themeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  themeText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.text.primary,
  },
  systemButton: {
    flex: 0,
  },
  systemButtonText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
  },
  categoriesSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginBottom: 20,
  },
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
  chevronContainer: {
    paddingHorizontal: 10,
  },
  chevron: {
    fontSize: 24,
    color: colors.text.secondary,
  },
});

export default ProfileScreen;
