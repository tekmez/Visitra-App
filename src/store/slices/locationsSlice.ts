import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  id: string;
  name: string;
  category: string;
  notes: string;
  visited: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface LocationsState {
  locations: Location[];
  loading: boolean;
  error: string | null;
}

const initialState: LocationsState = {
  locations: [],
  loading: false,
  error: null,
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations.push(action.payload);
    },
    toggleVisited: (state, action: PayloadAction<string>) => {
      const location = state.locations.find(loc => loc.id === action.payload);
      if (location) {
        location.visited = !location.visited;
      }
    },
    updateLocation: (state, action: PayloadAction<Location>) => {
      const index = state.locations.findIndex(loc => loc.id === action.payload.id);
      if (index !== -1) {
        state.locations[index] = action.payload;
      }
    },
    deleteLocation: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(loc => loc.id !== action.payload);
    },
  },
});

export const { addLocation, toggleVisited, updateLocation, deleteLocation } = locationsSlice.actions;
export default locationsSlice.reducer; 