import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { fonts } from "../theme/fonts";

type TabType = "date" | "favorites" | "toVisit" | "visited";

type TabBarProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  const renderTab = (title: string, type: TabType) => (
    <TouchableOpacity
      style={[styles.tab, activeTab === type && styles.activeTab]}
      onPress={() => onTabChange(type)}
    >
      <Text
        style={[styles.tabText, activeTab === type && styles.activeTabText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {renderTab("Date added", "date")}
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
