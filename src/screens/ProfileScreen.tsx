import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { categories } from "../constants/categories";
import { AntDesign } from "@expo/vector-icons";
import CategoryItem from "../components/CategoryItem";
import AddCategoryModal from "../components/AddCategoryModal";

const ProfileScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      // TODO: Kategori ekleme işlemi burada yapılacak
      setNewCategoryName("");
      setIsModalVisible(false);
    }
  };

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
        <View style={styles.categoriesHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={styles.addButton}
          >
            <AntDesign name="plus" size={20} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
        {categories.map((category) => (
          <CategoryItem key={category.title} {...category} onPress={() => {}} />
        ))}
      </View>

      <AddCategoryModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddCategory}
        categoryName={newCategoryName}
        onChangeCategoryName={setNewCategoryName}
      />
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
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
