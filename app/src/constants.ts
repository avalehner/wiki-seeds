import { Plant, PlantColor } from "./interfaces";

export const MAX_DISTANCE_METERS_TO_SAVE = 500;

export const GREEN_THEME: PlantColor = {
  backgroundColor: "#6AA46A",
  foregroundColor: "#F5F5F5",
  softBackgroundColor: "#9ED79E",
};

export const BLUE_THEME: PlantColor = {
  backgroundColor: "#455E8B",
  foregroundColor: "#F5F5F5",
  softBackgroundColor: "#A7B7D2",
};

export const PEACH_THEME: PlantColor = {
  backgroundColor: "#E7A188",
  foregroundColor: "#4D654F",
  softBackgroundColor: "#FCBFA9",
};

export const PLANTS: Plant[] = [
  {
    plantBaseName: "0",
    color: GREEN_THEME,
  },
  {
    plantBaseName: "1",
    color: BLUE_THEME,
  },
  {
    plantBaseName: "2",
    color: PEACH_THEME,
  },
];
