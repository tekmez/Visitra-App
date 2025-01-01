import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../hooks/useAppTheme";

interface AddNoteModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  initialNote?: string;
}

export const AddNoteModal: React.FC<AddNoteModalProps> = ({
  visible,
  onClose,
  onSave,
  initialNote = "",
}) => {
  const { colors } = useAppTheme();
  const [note, setNote] = useState(initialNote);

  const handleSave = () => {
    onSave(note);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View
          style={[styles.content, { backgroundColor: colors.background.modal }]}
        >
          <View
            style={[
              styles.header,
              { borderBottomColor: colors.border.primary },
            ]}
          >
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text.primary }]}>
              Not Ekle
            </Text>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text
                style={[styles.saveButtonText, { color: colors.secondary }]}
              >
                Kaydet
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={[
              styles.input,
              {
                color: colors.text.primary,
                backgroundColor: colors.background.primary,
              },
            ]}
            placeholderTextColor={colors.text.tertiary}
            multiline
            placeholder="Notunuzu buraya yazın..."
            value={note}
            onChangeText={setNote}
            autoFocus
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 80,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingTop: Platform.OS === "ios" ? 16 : 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  closeButton: {
    padding: 8,
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  saveButton: {
    padding: 8,
    position: "absolute",
    right: 16,
    zIndex: 1,
  },
  saveButtonText: {
    color: "#FFB800",
    fontSize: 17,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    padding: 20,
    paddingTop: 24,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: "top",
  },
});
