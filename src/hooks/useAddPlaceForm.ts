import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeSchema, PlaceFormData } from "../schema/place";

export const useAddPlaceForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<PlaceFormData>({
    resolver: zodResolver(placeSchema),
    defaultValues: {
      name: "",
      images: [],
      location: null,
      category: "",
      description: "",
      note: "",
    },
  });

  const onSubmit = (data: PlaceFormData) => {
    console.log("Yeni mekan:", data);
    // Burada API çağrısı yapılabilir
  };

  return {
    control,
    errors,
    setValue,
    watch,
    handleSubmit,
    onSubmit,
  };
}; 