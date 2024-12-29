import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { PlaceCard } from "../components/PlaceCard";
import { PlaceListItem } from "../components/PlaceListItem";
import { TabBar } from "../components/TabBar";
import { fonts, fontConfig } from "../theme/fonts";
import { places as initialPlaces, Place } from "../constants/places";
import { categories } from "../constants/categories";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

type TabType = "places" | "favorites" | "toVisit" | "visited";
type NavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>("places");
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();

  let [fontsLoaded] = useFonts(fontConfig);

  if (!fontsLoaded) {
    return null;
  }

  const filteredPlaces = places.filter((place) => {
    // Önce tab filtrelemesi
    const tabFilter =
      activeTab === "places"
        ? true
        : activeTab === "favorites"
        ? place.isFavorite
        : place.status === activeTab;

    // Sonra kategori filtrelemesi
    const categoryFilter = selectedCategory
      ? place.category === selectedCategory
      : true;

    // İki filtreyi de uygula
    return tabFilter && categoryFilter;
  });

  const handleExplore = (place: Place) => {
    navigation.navigate("PlaceDetail", { place });
  };

  const handleFavoritePress = (placeId: string) => {
    setPlaces(
      places.map((place) => {
        if (place.id === placeId) {
          return {
            ...place,
            isFavorite: !place.isFavorite,
          };
        }
        return place;
      })
    );
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Visitra</Text>
      </View>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <PlaceCard
              key={category.title}
              image={category.image}
              name={category.title}
              isSelected={selectedCategory === category.title}
              onPress={() => handleCategoryPress(category.title)}
            />
          ))}
        </ScrollView>

        <View style={styles.listContainer}>
          {filteredPlaces.map((place) => (
            <PlaceListItem
              key={`list-${place.id}`}
              image={place.image}
              name={place.name}
              location={place.location}
              category={place.category}
              onExplore={() => handleExplore(place)}
              isFavorite={place.isFavorite}
              onFavoritePress={() => handleFavoritePress(place.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginTop: 20,
    marginHorizontal: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  listContainer: {
    marginTop: 30,
  },
});

export default HomeScreen;
