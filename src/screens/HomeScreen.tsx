import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { PlaceCard } from "../components/PlaceCard";
import { PlaceListItem } from "../components/PlaceListItem";
import { TabBar } from "../components/TabBar";
import { fonts, fontConfig } from "../theme/fonts";
import { places } from "../constants/places";

type TabType = "date" | "favorites" | "toVisit" | "visited";

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>("date");

  let [fontsLoaded] = useFonts(fontConfig);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Places</Text>
      </View>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>On the map</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.placesContainer}
        >
          {places.map((place) => (
            <PlaceCard
              key={`card-${place.id}`}
              image={place.image}
              name={place.name}
              location={place.location}
              type={place.type}
            />
          ))}
        </ScrollView>

        <View style={styles.listContainer}>
          {places.map((place) => (
            <PlaceListItem
              key={`list-${place.id}`}
              image={place.image}
              name={place.name}
              location={place.location}
              type={place.type}
              onExplore={() => {}}
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
    paddingBottom: 20,
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
  placesContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  listContainer: {
    marginTop: 30,
  },
});

export default HomeScreen;
