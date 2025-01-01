import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { useFonts } from "expo-font";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { PlaceCard } from "../components/PlaceCard";
import { PlaceListItem } from "../components/PlaceListItem";
import { TabBar } from "../components/TabBar";
import { fonts, fontConfig } from "../theme/fonts";
import { places as initialPlaces, Place } from "../constants/places";
import { categories } from "../constants/categories";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { useAppTheme } from "../hooks/useAppTheme";

type TabType = "places" | "favorites" | "toVisit" | "visited";
type NavigationProp = StackNavigationProp<RootStackParamList>;

const SPRING_CONFIG = {
  damping: 15,
  mass: 0.8,
  stiffness: 120,
};

const TIMING_CONFIG = {
  duration: 400,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

const HomeScreen = () => {
  const { colors } = useAppTheme();
  const [activeTab, setActiveTab] = useState<TabType>("places");
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const translateX = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const screenWidth = Dimensions.get("window").width;
  const mainScrollRef = useRef(null);

  let [fontsLoaded] = useFonts(fontConfig);

  const tabs: TabType[] = ["places", "favorites", "toVisit", "visited"];

  const panGesture = Gesture.Pan()
    .minDistance(10)
    .onStart(() => {
      isScrolling.value = false;
    })
    .onUpdate((event) => {
      if (isScrolling.value) return;

      const currentTabIndex = tabs.indexOf(activeTab);
      const isFirstTab = currentTabIndex === 0;
      const isLastTab = currentTabIndex === tabs.length - 1;

      let newTranslateX = event.translationX;

      if (
        (isFirstTab && newTranslateX > 0) ||
        (isLastTab && newTranslateX < 0)
      ) {
        newTranslateX = newTranslateX * 0.2;
      }

      translateX.value = newTranslateX;
    })
    .onEnd((event) => {
      if (isScrolling.value) return;

      const currentTabIndex = tabs.indexOf(activeTab);
      const velocity = event.velocityX;
      const translation = event.translationX;

      const shouldSwitch = Math.abs(translation) > screenWidth * 0.2;

      if (shouldSwitch) {
        if (translation > 0 && currentTabIndex > 0) {
          translateX.value = withTiming(screenWidth, TIMING_CONFIG, () => {
            runOnJS(setActiveTab)(tabs[currentTabIndex - 1]);
            translateX.value = withTiming(0, { duration: 0 });
          });
        } else if (translation < 0 && currentTabIndex < tabs.length - 1) {
          translateX.value = withTiming(-screenWidth, TIMING_CONFIG, () => {
            runOnJS(setActiveTab)(tabs[currentTabIndex + 1]);
            translateX.value = withTiming(0, { duration: 0 });
          });
        } else {
          translateX.value = withSpring(0, SPRING_CONFIG);
        }
      } else {
        translateX.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

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

  const renderItem = useCallback(
    ({ item: place }: { item: Place }) => (
      <PlaceListItem
        image={place.image}
        name={place.name}
        location={place.location}
        category={place.category}
        onExplore={() => handleExplore(place)}
        isFavorite={place.isFavorite}
        onFavoritePress={() => handleFavoritePress(place.id)}
      />
    ),
    [handleExplore, handleFavoritePress]
  );

  const ListEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
          {selectedCategory
            ? `${selectedCategory} kategorisinde henüz bir yer yok`
            : activeTab === "favorites"
            ? "Henüz favori yeriniz yok"
            : activeTab === "visited"
            ? "Henüz ziyaret ettiğiniz bir yer yok"
            : activeTab === "toVisit"
            ? "Ziyaret etmek istediğiniz bir yer eklemediniz"
            : "Henüz bir yer eklenmemiş"}
        </Text>
      </View>
    ),
    [selectedCategory, activeTab, colors.text.secondary]
  );

  const ListHeader = useCallback(
    () => (
      <>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Categories
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          onScrollBeginDrag={() => {
            isScrolling.value = true;
          }}
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
      </>
    ),
    [selectedCategory, colors.text.primary, handleCategoryPress]
  );

  const renderContent = () => (
    <FlatList
      data={filteredPlaces}
      renderItem={renderItem}
      keyExtractor={(item) => `list-${item.id}`}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmptyComponent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      onScrollBeginDrag={() => {
        isScrolling.value = true;
      }}
      initialNumToRender={8}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );

  return (
    <GestureHandlerRootView
      style={[styles.container, { backgroundColor: colors.background.primary }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          Visitra
        </Text>
      </View>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.content, animatedStyle]}>
          {renderContent()}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
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
    marginTop: 8,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: "#666",
    textAlign: "center",
  },
});

export default HomeScreen;
