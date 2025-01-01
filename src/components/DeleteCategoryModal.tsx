import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
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
  const { colors } = useAppTheme();

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
        <View
          style={[
            styles.modalContent,
            { backgroundColor: colors.background.modal },
          ]}
        >
          <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
            Silmek İstediğinize Emin Misiniz
          </Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.cancelButton,
                { backgroundColor: colors.background.secondary },
              ]}
              onPress={onClose}
            >
              <Text
                style={[
                  styles.cancelButtonText,
                  { color: colors.text.primary },
                ]}
              >
                İptal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.deleteButton,
                { backgroundColor: colors.status.error },
              ]}
              onPress={() => onDelete(categoryTitle)}
            >
              <Text
                style={[
                  styles.deleteButtonText,
                  { color: colors.text.primary },
                ]}
              >
                Sil
              </Text>
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
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteButtonText: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});

export default DeleteCategoryModal;
