import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
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
  const { colors } = useAppTheme();

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
            Yeni Kategori Ekle
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border.primary,
                color: colors.text.primary,
                backgroundColor: colors.background.primary,
              },
            ]}
            placeholder="Kategori adı"
            placeholderTextColor={colors.text.tertiary}
            value={categoryName}
            onChangeText={onChangeCategoryName}
            autoFocus
          />

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
                styles.addButton,
                { backgroundColor: colors.secondary },
              ]}
              onPress={onAdd}
            >
              <Text
                style={[styles.addButtonText, { color: colors.text.primary }]}
              >
                Ekle
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
    fontSize: 20,
    fontFamily: fonts.semiBold,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
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
  },
  addButton: {
    marginLeft: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});

export default AddCategoryModal;
