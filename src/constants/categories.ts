export type Category = {
  title: string;
  image: { uri: string };
  count?: number;
};

export const categories: Category[] = [
  {
    title: "Explore",
    image: { uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
  },
  {
    title: "Adventure",
    image: { uri: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800" },
  },
  {
    title: "Relax",
    image: { uri: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800" },
  },
]; 