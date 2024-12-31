import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";

interface DeleteCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  categoryTitle: string;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  visible,
  onClose,
  categoryTitle,
}) => {
  const onDelete = (categoryTitle: string) => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Silmek İstediğinize Emin Misiniz
          </Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>İptal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.deleteButton]}
              onPress={() => onDelete(categoryTitle)}
            >
              <Text style={styles.deleteButtonText}>Sil</Text>
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
    fontSize: 18,
    fontFamily: fonts.semiBold,
    marginBottom: 20,
    textAlign: "center",
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
  cancelButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  deleteButton: {
    backgroundColor: colors.status.error,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});

export default DeleteCategoryModal;
