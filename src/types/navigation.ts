import { Place } from "../constants/places";

export type RootStackParamList = {
  TabNavigator: undefined;
  PlaceDetail: {
    place: Place;
  };
};

export type RootTabParamList = {
  Home: undefined;
  Add: undefined;
  Settings: undefined;
};
