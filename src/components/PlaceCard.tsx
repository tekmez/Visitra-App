import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { fonts } from "../theme/fonts";
import { useAppTheme } from "../hooks/useAppTheme";

type PlaceCardProps = {
  image: { uri: string };
  name: string;
  location?: string;
  category?: string;
  isSelected?: boolean;
  onPress?: () => void;
};

export const PlaceCard = ({
  image,
  name,
  location,
  category,
  isSelected,
  onPress,
}: PlaceCardProps) => {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.background.card },
        isSelected && { borderColor: colors.secondary },
      ]}
      onPress={onPress}
    >
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text.primary }]}>
          {name}
        </Text>
        {location && (
          <>
            <Text style={styles.location}>{location}</Text>
            <Text style={[styles.category, { color: colors.text.secondary }]}>
              {category}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.5,
    marginRight: 15,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#FFB800",
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 16,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
  location: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: fonts.regular,
  },
  category: {
    fontSize: 14,
    color: "#666",
    fontFamily: fonts.regular,
  },
});
