# Visitra - Seyahat Planlama ve Takip Uygulaması

## Proje Hakkında
Visitra, kullanıcıların seyahat planlarını yönetmelerine ve deneyimlerini kaydetmelerine olanak sağlayan bir mobil uygulamadır. Kullanıcılar:
- Seyahat etmek istedikleri yerleri kaydedebilir
- Lokasyonları kategorilere ayırabilir
- Notlar ekleyebilir
- Ziyaret ettikleri yerleri işaretleyebilir
- Çeşitli filtreleme seçenekleriyle yerlerini yönetebilir

## Teknolojik Altyapı

### Temel Teknolojiler
- React Native
- Expo SDK 52
- TypeScript

### Veritabanı ve Depolama
- Firebase (Authentication, Firestore, Storage)
- AsyncStorage (Yerel depolama)

### Harita ve Konum Servisleri
- React Native Maps
- Expo Location

### UI Kütüphaneleri
- React Native Paper (Material Design)
- React Native Vector Icons
- React Native Reanimated

### Navigasyon
- React Navigation v7

### State Yönetimi
- Redux Toolkit

### Diğer Önemli Paketler
- expo-image-picker
- expo-notifications
- react-native-gesture-handler
- @react-native-community/netinfo

## Kurulum

1. Gerekli bağımlılıkları yükleyin:
```bash
yarn install
```

2. Expo CLI'yi yükleyin:
```bash
yarn global add expo-cli
```

3. Uygulamayı başlatın:
```bash
yarn expo start
```

## Proje Yapısı

```
src/
├── assets/         # Resimler, fontlar ve diğer statik dosyalar
├── components/     # Yeniden kullanılabilir UI bileşenleri
├── screens/        # Uygulama ekranları
├── navigation/     # Navigasyon yapılandırması
├── services/       # API ve Firebase servisleri
├── store/         # Redux store ve slice'lar
├── hooks/         # Özel React hooks'ları
├── utils/         # Yardımcı fonksiyonlar
└── types/         # TypeScript tip tanımlamaları
```

## Lisans
Bu proje MIT lisansı altında lisanslanmıştır. 