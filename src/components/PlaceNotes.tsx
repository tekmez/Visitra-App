import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../hooks/useAppTheme";
import { fonts } from "../theme/fonts";

interface PlaceNotesProps {
  notes: string;
  onAddNote: () => void;
}

export const PlaceNotes: React.FC<PlaceNotesProps> = ({ notes, onAddNote }) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.section, { borderBottomColor: colors.border.primary }]}
    >
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Notlarım
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddNote}>
          <Ionicons
            name={notes ? "create" : "add-circle"}
            size={24}
            color={colors.secondary}
          />
        </TouchableOpacity>
      </View>
      {notes ? (
        <View
          style={[
            styles.noteContent,
            { backgroundColor: colors.background.secondary },
          ]}
        >
          <ScrollView style={styles.noteScroll}>
            <Text
              style={[styles.description, { color: colors.text.secondary }]}
            >
              {notes}
            </Text>
          </ScrollView>
        </View>
      ) : (
        <Text style={[styles.emptyNotes, { color: colors.text.tertiary }]}>
          Henüz not eklenmemiş
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  addButton: {
    padding: 4,
  },
  noteContent: {
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 12,
  },
  noteScroll: {
    maxHeight: 150,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  emptyNotes: {
    fontSize: 15,
    fontStyle: "italic",
  },
});
