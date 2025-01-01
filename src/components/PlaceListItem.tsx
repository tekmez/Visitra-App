import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { fonts } from "../theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../hooks/useAppTheme";

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
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.titleText}>
              <Text style={[styles.name, { color: colors.text.primary }]}>
                {name}
              </Text>
              <Text style={[styles.location, { color: colors.text.primary }]}>
                , {location}
              </Text>
            </Text>
            <Text style={[styles.category, { color: colors.text.secondary }]}>
              {category}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.exploreButton,
              { backgroundColor: colors.background.secondary },
            ]}
            onPress={onExplore}
          >
            <Text style={[styles.exploreText, { color: colors.text.primary }]}>
              Explore
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              { backgroundColor: "rgba(0, 0, 0, 0.3)" },
            ]}
            onPress={onFavoritePress}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? colors.status.error : "white"}
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
  },
  location: {
    fontSize: 20,
    fontFamily: fonts.regular,
  },
  category: {
    fontSize: 16,
    fontFamily: fonts.regular,
    marginBottom: 12,
  },
  exploreButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  exploreText: {
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
    borderRadius: 20,
    padding: 6,
  },
});
