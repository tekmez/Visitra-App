import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { fonts } from "../theme/fonts";
import { useAppTheme } from "../hooks/useAppTheme";

type TabType = "places" | "favorites" | "toVisit" | "visited";

type TabBarProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  const { colors } = useAppTheme();

  const renderTab = (title: string, type: TabType) => (
    <TouchableOpacity
      style={[styles.tab, activeTab === type && styles.activeTab]}
      onPress={() => onTabChange(type)}
    >
      <Text
        style={[
          styles.tabText,
          { color: colors.text.tertiary },
          activeTab === type && { color: colors.text.primary },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.wrapper, { borderBottomColor: colors.border.primary }]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {renderTab("Places", "places")}
        {renderTab("Favorites", "favorites")}
        {renderTab("To visit", "toVisit")}
        {renderTab("Visited", "visited")}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
    minWidth: "100%",
  },
  tab: {
    paddingVertical: 15,
    marginHorizontal: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFB800",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
    fontFamily: fonts.regular,
  },
  activeTabText: {
    color: "#000",
    fontFamily: fonts.medium,
  },
});
