import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
  categoryName: string;
  onChangeCategoryName: (text: string) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  visible,
  onClose,
  onAdd,
  categoryName,
  onChangeCategoryName,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Yeni Kategori Ekle</Text>

          <TextInput
            style={styles.input}
            placeholder="Kategori adı"
            value={categoryName}
            onChangeText={onChangeCategoryName}
            autoFocus
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>İptal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.addButton]}
              onPress={onAdd}
            >
              <Text style={styles.addButtonText}>Ekle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    marginRight: 10,
    backgroundColor: colors.background.secondary,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: colors.secondary,
  },
  cancelButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  addButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});

export default AddCategoryModal;
