import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
import { fonts } from "../theme/fonts";

interface ImagePreviewModalProps {
  visible: boolean;
  imageUri: string;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const { width, height } = Dimensions.get("window");

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  visible,
  imageUri,
  onClose,
  images,
  currentIndex,
  onIndexChange,
}) => {
  const { colors } = useAppTheme();
  const flatListRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    if (visible && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: false,
      });
    }
  }, [visible, currentIndex]);

  const renderImage = ({ item: uri }: { item: string }) => (
    <View style={styles.slideContainer}>
      <Image source={{ uri }} style={styles.image} resizeMode="contain" />
    </View>
  );

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    if (roundIndex !== currentIndex) {
      onIndexChange(roundIndex);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text
              style={[
                styles.pageIndicator,
                { color: colors.background.primary },
              ]}
            >
              {currentIndex + 1} / {images.length}
            </Text>
            <TouchableOpacity
              style={[
                styles.closeButton,
                { backgroundColor: colors.background.secondary },
              ]}
              onPress={onClose}
            >
              <Text
                style={[
                  styles.closeButtonText,
                  { color: colors.text.secondary },
                ]}
              >
                ✕
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <FlatList
              ref={flatListRef}
              data={images}
              renderItem={renderImage}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onScroll}
              initialScrollIndex={currentIndex}
              getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              decelerationRate="fast"
              snapToInterval={width}
              snapToAlignment="center"
            />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  container: {
    flex: 1,
  },
  header: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  pageIndicator: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  slideContainer: {
    width,
    height: height - 44,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 44,
  },
  image: {
    width: width,
    height: height * 0.8,
  },
});
