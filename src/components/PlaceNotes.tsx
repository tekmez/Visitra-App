import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PlaceNotesProps {
  notes: string;
  onAddNote: () => void;
}

export const PlaceNotes: React.FC<PlaceNotesProps> = ({ notes, onAddNote }) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Notlarım</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddNote}>
          <Ionicons
            name={notes ? "create" : "add-circle"}
            size={24}
            color="#FFB800"
          />
        </TouchableOpacity>
      </View>
      {notes ? (
        <View style={styles.noteContent}>
          <ScrollView
            style={styles.noteScroll}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.description}>{notes}</Text>
          </ScrollView>
        </View>
      ) : (
        <Text style={styles.emptyNotes}>Henüz not eklenmemiş</Text>
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
    fontWeight: "bold",
    color: "#333",
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
    color: "#444",
  },
  emptyNotes: {
    color: "#999",
    fontSize: 15,
    fontStyle: "italic",
  },
});
