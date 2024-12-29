import { categories } from "../schema/place";

export type Place = {
  id: string;
  image: { uri: string };
  name: string;
  location: string;
  category: string;
  status: "date" | "favorites" | "toVisit" | "visited";
};

export const places: Place[] = [
  {
    id: "1",
    image: { uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
    name: "Cannon Beach",
    location: "Oregon",
    category: "Beach house",
    status: "toVisit",
  },
  {
    id: "2",
    image: { uri: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800" },
    name: "Lake Tahoe",
    location: "California",
    category: "Cabin",
    status: "visited",
  },
  {
    id: "3",
    image: { uri: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800" },
    name: "Big Sur",
    location: "California",
    category: "Cabin",
    status: "favorites",
  },
  {
    id: "4",
    image: { uri: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" },
    name: "Aspen",
    location: "Colorado",
    category: "Ski Lodge",
    status: "date",
  },
  {
    id: "5",
    image: { uri: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800" },
    name: "Santorini Villa",
    location: "Greece",
    category: "Villa",
    status: "toVisit",
  },
  {
    id: "6",
    image: { uri: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800" },
    name: "Maldives Resort",
    location: "Maldives",
    category: "Beach Resort",
    status: "favorites",
  },
  {
    id: "7",
    image: { uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800" },
    name: "Swiss Alps Chalet",
    location: "Switzerland",
    category: "Mountain Chalet",
    status: "visited",
  }
]; 