import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { fonts } from "../theme/fonts";

type PlaceListItemProps = {
  image: { uri: string };
  name: string;
  location: string;
  category: string;
  onExplore?: () => void;
};

export const PlaceListItem = ({
  image,
  name,
  location,
  category,
  onExplore,
}: PlaceListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.location}>, {location}</Text>
          </Text>
          <Text style={styles.category}>{category}</Text>
          <TouchableOpacity style={styles.exploreButton} onPress={onExplore}>
            <Text style={styles.exploreText}>Explore</Text>
          </TouchableOpacity>
        </View>
        <Image source={image} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  titleText: {
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: "#000",
  },
  location: {
    fontSize: 20,
    fontFamily: fonts.regular,
    color: "#000",
  },
  category: {
    fontSize: 16,
    color: "#666",
    fontFamily: fonts.regular,
    marginBottom: 12,
  },
  exploreButton: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  exploreText: {
    color: "#000",
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
