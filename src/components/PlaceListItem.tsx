import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { fonts } from "../theme/fonts";
import { Ionicons } from "@expo/vector-icons";

type PlaceListItemProps = {
  image: { uri: string };
  name: string;
  location: string;
  category: string;
  onExplore?: () => void;
  isFavorite: boolean;
  onFavoritePress: () => void;
};

export const PlaceListItem = ({
  image,
  name,
  location,
  category,
  onExplore,
  isFavorite,
  onFavoritePress,
}: PlaceListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.titleText}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.location}>, {location}</Text>
            </Text>
            <Text style={styles.category}>{category}</Text>
          </View>
          <TouchableOpacity style={styles.exploreButton} onPress={onExplore}>
            <Text style={styles.exploreText}>Explore</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onFavoritePress}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#FF4B4B" : "#FFF"}
            />
          </TouchableOpacity>
        </View>
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
    justifyContent: "space-between",
    height: 120,
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
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    padding: 8,
  },
});
