import { categories } from "../schema/place";

export type Place = {
  id: string;
  image: { uri: string };
  name: string;
  location: string;
  category: string;
  description: string;
  images: string[];
  status: "toVisit" | "visited";
  isFavorite: boolean;
  notes?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export const places: Place[] = [
  {
    id: "1",
    image: { uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
    ],
    name: "Cannon Beach",
    location: "Oregon",
    category: "Beach house",
    description: "Muhteşem manzaralı plaj evi",
    status: "toVisit",
    isFavorite: false,
    notes: "",
    coordinates: {
      latitude: 45.891690,
      longitude: -123.961426
    }
  },
  {
    id: "2",
    image: { uri: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800" },
    images: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"
    ],
    name: "Lake Tahoe",
    location: "California",
    category: "Cabin",
    description: "Göl kenarında huzurlu bir kabin",
    status: "visited",
    isFavorite: false,
    notes: "Geçen yaz gittiğimizde harika bir deneyimdi. Göl kenarında sabah kahvesi içmek paha biçilemezdi. Kış için tekrar rezervasyon yapmalıyım.",
    coordinates: {
      latitude: 39.096848,
      longitude: -120.032349
    }
  },
  {
    id: "3",
    image: { uri: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800" },
    images: [
      "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800",
      "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800"
    ],
    name: "Big Sur",
    location: "California",
    category: "Cabin",
    description: "Okyanus manzaralı dağ evi",
    status: "toVisit",
    isFavorite: true,
    notes: "Pacific Coast Highway üzerinde muhteşem bir lokasyon. Bixby Bridge'e çok yakın. Sonbaharda gitmek için ideal olabilir.",
    coordinates: {
      latitude: 36.270421,
      longitude: -121.807728
    }
  },
  {
    id: "4",
    image: { uri: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" },
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
    ],
    name: "Aspen",
    location: "Colorado",
    category: "Ski Lodge",
    description: "Kayak merkezine yakın lüks konaklama",
    status: "toVisit",
    isFavorite: false,
    coordinates: {
      latitude: 39.191097,
      longitude: -106.817535
    }
  },
  {
    id: "5",
    image: { uri: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800" },
    images: [
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800"
    ],
    name: "Santorini Villa",
    location: "Greece",
    category: "Villa",
    description: "Ege'nin incisi Santorini'de muhteşem villa",
    status: "toVisit",
    isFavorite: false,
    notes: "Caldera manzaralı, Oia'da yer alan villa. Günbatımı için en iyi noktalardan biri. Haziran ayında müsait.",
    coordinates: {
      latitude: 36.393154,
      longitude: 25.461510
    }
  },
  {
    id: "6",
    image: { uri: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800" },
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800"
    ],
    name: "Maldives Resort",
    location: "Maldives",
    category: "Beach Resort",
    description: "Kristal berraklığında suların ortasında lüks resort",
    status: "toVisit",
    isFavorite: true,
    coordinates: {
      latitude: 3.202778,
      longitude: 73.220680
    }
  },
  {
    id: "7",
    image: { uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800" },
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"
    ],
    name: "Swiss Alps Chalet",
    location: "Switzerland",
    category: "Mountain Chalet",
    description: "Alp Dağları'nın eteklerinde geleneksel chalet",
    status: "visited",
    isFavorite: true,
    notes: "Zermatt'a 15 dakika mesafede. Kış sporları için ideal. Şömineli ve jakuzili. Aralık ayında tekrar gidebiliriz.",
    coordinates: {
      latitude: 46.619261,
      longitude: 8.045952
    }
  }
]; 