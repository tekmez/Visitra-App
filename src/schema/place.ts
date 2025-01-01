import { z } from "zod";

export const placeSchema = z.object({
  name: z.string().min(1, "Place name is required"),
  images: z.array(z.string()).min(1, "At least one image must be added"),
  location: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .nullable(),
  category: z.string().min(1, "Category selection is required"),
  description: z
    .string()
    .max(150, "Description must be at most 150 characters")
    .optional()
    .or(z.literal("")),
  note: z.string().optional(),
});

export type PlaceFormData = z.infer<typeof placeSchema>; 