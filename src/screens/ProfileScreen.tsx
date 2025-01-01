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
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import DeleteCategoryModal from "@/components/DeleteCategoryModal";

const ProfileScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoriesList, setCategoriesList] = useState(categories);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      // TODO: Kategori ekleme işlemi burada yapılacak
      setNewCategoryName("");
      setIsModalVisible(false);
    }
  };

  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 50 }],
        justifyContent: "center",
        alignItems: "center",
      };
    });

    const handleDeletePress = () => {
      setIsDeleteModalVisible(true);
      drag.value = 0;
    };

    return (
      <Reanimated.View style={styleAnimation}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeletePress}
        >
          <AntDesign name="delete" size={24} color={"red"} />
        </TouchableOpacity>
      </Reanimated.View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
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
              <AntDesign name="plus" size={20} color={"white"} />
            </TouchableOpacity>
          </View>
          {categoriesList.map((category) => (
            <ReanimatedSwipeable
              key={category.title}
              renderRightActions={RightAction}
              friction={2}
              enableTrackpadTwoFingerGesture
            >
              <CategoryItem {...category} onPress={() => {}} />
            </ReanimatedSwipeable>
          ))}
        </View>

        <AddCategoryModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onAdd={handleAddCategory}
          categoryName={newCategoryName}
          onChangeCategoryName={setNewCategoryName}
        />
        <DeleteCategoryModal
          visible={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
          categoryTitle={"test"}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingBottom: 20,
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
  deleteButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
});

export default ProfileScreen;
