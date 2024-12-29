import { z } from "zod";

export const categories = ["Restoran", "Kafe", "Park", "Müze", "Alışveriş"] as const;

export const placeSchema = z.object({
  name: z.string().min(1, "Mekan adı zorunludur"),
  images: z.array(z.string()).min(1, "En az bir fotoğraf eklenmelidir"),
  location: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .nullable(),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Kategori seçimi zorunludur" }),
  }),
  description: z.string()
    .max(150, "Açıklama en fazla 150 karakter olabilir")
    .optional()
    .or(z.literal("")),
  note: z.string().optional(),
});

export type PlaceFormData = z.infer<typeof placeSchema>; 